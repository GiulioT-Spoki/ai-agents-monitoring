#!/usr/bin/env python3
"""Assisted playground loop: next paste from YAML, write score. No Spoki API."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pyyaml", "-q"])
    import yaml

NATIVE_TOOLS = {
    "search_knowledge_base",
    "get_current_datetime",
    "transfer_to_human",
    "search_spoki_manual",
    "tag",
    "create_event",
    "calendar_create",
    "get_availability",
    "check_availability",
}

CLIENT_TOOL_RE = re.compile(
    r"webhook|https?|custom|tuotempo|ghl|gohighlevel|hubspot|n8n|zapier|"
    r"salesforce|calendly|stripe|make\.com|crm_",
    re.I,
)

PRIORITY_ORDER = {"p0": 0, "p1": 1, "p2": 2}
OPEN_SCORES = {None, "", "pending"}
SCORE_TO_OUTCOME = {
    "Pass": "verificato",
    "Pass*": "verificato",
    "Fail": "da_correggere",
    "Skip": "non_eseguibile",
}


def load_suite(path: Path) -> dict:
    data = yaml.safe_load(path.read_text())
    if not isinstance(data, dict) or "scenarios" not in data:
        raise SystemExit(f"Not a suite YAML: {path}")
    return data


def dump_suite(path: Path, data: dict) -> None:
    path.write_text(
        yaml.safe_dump(data, allow_unicode=True, sort_keys=False, default_flow_style=False)
    )


def parse_tools(raw: str | None) -> set[str] | None:
    if raw is None:
        return None
    return {t.strip() for t in raw.split(",") if t.strip()}


def is_open(scenario: dict) -> bool:
    return scenario.get("score") in OPEN_SCORES


def skip_reason(
    scenario: dict,
    agent: dict,
    present_tools: set[str] | None,
    kb_linked: bool,
) -> str | None:
    required = list(scenario.get("tools_required") or [])
    side = scenario.get("side_effects") or "none"
    test_copy = bool(agent.get("test_copy"))

    if side == "calendar_create" and not test_copy:
        return "calendar_create requires a test copy (agent.test_copy)"

    if scenario.get("requires_contact_fields") and scenario.get("environment") == "voice_playground":
        return (
            "needs %%FIELDS%% from a contact, but the voice playground has none — "
            "move to twin_text (textual twin) or voice_outbound (Spoki Voice automation)"
        )

    if scenario.get("environment") == "twin_text" and not agent.get("twin_text_link"):
        return "twin_text scenario but agent.twin_text_link is not set — create the textual twin first"

    if scenario.get("kb_required") and not kb_linked:
        return "kb_required and knowledge base not linked (--no-kb)"

    for name in required:
        if CLIENT_TOOL_RE.search(name) and (present_tools is None or name not in present_tools):
            return f"client/webhook tool `{name}` — Skip, do not request API keys"
        if present_tools is not None and name not in present_tools:
            return f"tool `{name}` not on this agent"
        if present_tools is None and name not in NATIVE_TOOLS:
            return f"unknown tool `{name}` (not native Spoki) — treat as client-owned"

    return None


def ordered_open(data: dict, p0_only: bool) -> list[dict]:
    scenarios = list(data.get("scenarios") or [])
    ranked = sorted(
        enumerate(scenarios),
        key=lambda item: (PRIORITY_ORDER.get(item[1].get("priority") or "p2", 9), item[0]),
    )
    out = []
    for _, s in ranked:
        if not is_open(s):
            continue
        if p0_only and (s.get("priority") or "p0") != "p0":
            continue
        out.append(s)
    return out


def auto_skip_open(
    data: dict,
    present_tools: set[str] | None,
    kb_linked: bool,
    p0_only: bool,
) -> list[tuple[str, str]]:
    agent = data.get("agent") or {}
    skipped = []
    for s in ordered_open(data, p0_only=False if not p0_only else True):
        reason = skip_reason(s, agent, present_tools, kb_linked)
        if not reason:
            continue
        s["score"] = "Skip"
        s["client_outcome"] = "non_eseguibile"
        note = f"[auto-skip] {reason}"
        prev = (s.get("notes") or "").strip()
        s["notes"] = f"{prev}\n{note}".strip() if prev else note
        skipped.append((s["id"], reason))
    return skipped


def pbcopy(text: str) -> bool:
    try:
        subprocess.run(["pbcopy"], input=text.encode(), check=True)
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        return False


def is_voice_agent(data: dict) -> bool:
    return (data.get("agent") or {}).get("tipo") == "Vocale"


ENV_INSTRUCTIONS = {
    "twin_text": (
        "incolla nel playground TESTUALE del gemello, con il contatto di test "
        "(i %%CAMPI%% sono valorizzati; nessuna telefonata)"
    ),
    "voice_playground": (
        "chiamata dal playground vocale (Start Call) — i %%CAMPI%% sono VUOTI: "
        "solo scenari che non dipendono dai dati del contatto"
    ),
    "voice_outbound": (
        "chiamata reale via automazione Spoki Voice verso il contatto di test "
        "(unico percorso vocale con i %%CAMPI%% valorizzati)"
    ),
    "live_ok": "chat / voce reale (non playground)",
    "playground": "paste in playground",
}


def turn_prompt(data: dict, scenario: dict, turn: dict) -> str:
    env = scenario.get("environment")
    if env in ENV_INSTRUCTIONS:
        return ENV_INSTRUCTIONS[env]
    channel = (turn or {}).get("channel")
    if channel == "spoken" or (channel is None and is_voice_agent(data)):
        return "dì / simula ASR (clipboard = testo da pronunciare)"
    return "paste in playground"


def is_spoken_turn(data: dict, scenario: dict, turn: dict) -> bool:
    if scenario.get("environment") in ("voice_playground", "voice_outbound"):
        return True
    if scenario.get("environment") in ("twin_text", "playground"):
        return False
    return (turn or {}).get("channel") == "spoken" or is_voice_agent(data)


def cmd_status(data: dict) -> None:
    counts: dict[str, int] = {}
    for s in data.get("scenarios") or []:
        key = s.get("score") or "pending"
        counts[key] = counts.get(key, 0) + 1
    agent = data.get("agent") or {}
    print(
        f"{agent.get('account_id')} {agent.get('name')}  "
        f"tipo={agent.get('tipo')}  test_copy={agent.get('test_copy')}"
    )
    print(" ".join(f"{k}={v}" for k, v in sorted(counts.items())))

    calls_left = sum(
        1
        for s in data.get("scenarios") or []
        if is_open(s) and s.get("environment") in ("voice_playground", "voice_outbound")
    )
    twin_left = sum(
        1 for s in data.get("scenarios") or [] if is_open(s) and s.get("environment") == "twin_text"
    )
    if calls_left or twin_left:
        print(f"da fare: {twin_left} sul gemello testuale, {calls_left} in chiamata")

    for s in data.get("scenarios") or []:
        env = s.get("environment") or ""
        print(
            f"  {s.get('priority')} {s.get('id')}: {s.get('score') or 'pending'}"
            f"  [{env}]  {s.get('title') or ''}"
        )


def cmd_next(
    path: Path,
    data: dict,
    present_tools: set[str] | None,
    kb_linked: bool,
    p0_only: bool,
    turn_index: int,
    clipboard: bool,
) -> None:
    skipped = auto_skip_open(data, present_tools, kb_linked, p0_only)
    if skipped:
        dump_suite(path, data)
        for sid, reason in skipped:
            print(f"auto-skip {sid}: {reason}")
        print()

    open_sc = ordered_open(data, p0_only)
    if not open_sc:
        print("No open scenarios" + (" in P0" if p0_only else "") + ".")
        cmd_status(data)
        return

    s = open_sc[0]
    script = s.get("script") or []
    if turn_index < 0 or turn_index >= len(script):
        raise SystemExit(f"Turn {turn_index} out of range (script has {len(script)} turns)")
    text = script[turn_index].get("text") or ""
    expect = s.get("expect") or {}
    print(f"id: {s.get('id')}")
    print(f"priority: {s.get('priority')}  pack: {s.get('pack')}  title: {s.get('title')}")
    print(f"expect.rule: {expect.get('rule')}")
    print(f"client_label: {expect.get('client_label')}")
    print(f"side_effects: {s.get('side_effects')}  tools: {s.get('tools_required')}")
    print(f"environment: {s.get('environment')}  requires_contact_fields: {bool(s.get('requires_contact_fields'))}")
    if s.get("environment") == "twin_text":
        twin = (data.get("agent") or {}).get("twin_text_link")
        if twin:
            print(f"gemello testuale: {twin}")
    print(f"turn {turn_index + 1}/{len(script)} — {turn_prompt(data, s, script[turn_index])}:\n")
    print(text)
    if clipboard:
        if pbcopy(text):
            print("\n(copied to clipboard)")
        else:
            print("\n(clipboard unavailable)")
    if is_spoken_turn(data, s, script[turn_index]):
        print(
            "\nScore with: spoken transcript + Langfuse voice-agent span "
            "(tool name, args, observation) + no leak ([call tool, JWT, JSON)."
        )
    print(
        f"\nAfter the reply:  {Path(__file__).name} score {path} "
        f"--id {s.get('id')} --score Pass|Fail|Pass*|Skip"
    )


def find_scenario(data: dict, sid: str) -> dict:
    for s in data.get("scenarios") or []:
        if s.get("id") == sid:
            return s
    raise SystemExit(f"Unknown scenario id: {sid}")


def cmd_score(path: Path, data: dict, sid: str, score: str, notes: str | None, langfuse: str | None) -> None:
    s = find_scenario(data, sid)
    s["score"] = score
    s["client_outcome"] = SCORE_TO_OUTCOME[score]
    extra = []
    if notes:
        extra.append(notes)
    if langfuse:
        extra.append(f"langfuse:{langfuse}")
    if extra:
        prev = (s.get("notes") or "").strip()
        add = " ".join(extra)
        s["notes"] = f"{prev}\n{add}".strip() if prev else add
    dump_suite(path, data)
    print(f"{sid}: {score} -> {s['client_outcome']}")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest="cmd", required=True)

    def add_suite(sp: argparse.ArgumentParser) -> None:
        sp.add_argument("suite", type=Path)

    sp = sub.add_parser("status", help="List scores")
    add_suite(sp)

    np = sub.add_parser("next", help="Auto-skip blocked tools, print next paste")
    add_suite(np)
    np.add_argument("--tools", help="Comma-separated tool names present on the agent")
    np.add_argument("--no-kb", action="store_true", help="KB not linked (skip kb_required)")
    np.add_argument("--all-priorities", action="store_true", help="Include P1/P2 (default: P0 only)")
    np.add_argument("--turn", type=int, default=0, help="0-based script turn (default 0)")
    np.add_argument("--no-clipboard", action="store_true")

    sc = sub.add_parser("score", help="Write score + client_outcome on one scenario")
    add_suite(sc)
    sc.add_argument("--id", required=True)
    sc.add_argument("--score", required=True, choices=["Pass", "Pass*", "Fail", "Skip"])
    sc.add_argument("--notes")
    sc.add_argument("--langfuse", help="Observation or trace id")

    args = p.parse_args()
    path = args.suite.expanduser().resolve()
    if not path.is_file():
        raise SystemExit(f"Missing suite: {path}")
    data = load_suite(path)

    if args.cmd == "status":
        cmd_status(data)
    elif args.cmd == "next":
        cmd_next(
            path,
            data,
            parse_tools(args.tools),
            kb_linked=not args.no_kb,
            p0_only=not args.all_priorities,
            turn_index=args.turn,
            clipboard=not args.no_clipboard,
        )
    elif args.cmd == "score":
        cmd_score(path, data, args.id, args.score, args.notes, args.langfuse)


if __name__ == "__main__":
    main()
