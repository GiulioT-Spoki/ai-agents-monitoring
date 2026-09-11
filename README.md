# Spoki AI agents

Workspace per prompt ops Spoki: system prompt, KB, suite di test e tool di playground.

## Uso

Apri questa cartella come root in Cursor e usa `/spoki-prompt-test`.

| Artefatto | Path |
| --- | --- |
| Prompt | `clients-prompt/{accountId}-{slug}.md` |
| Suite (markdown) | `clients-prompt/{accountId}-{slug}-test-suite.md` |
| Suite (YAML) | `clients-prompt/{accountId}-{slug}-suite.yaml` |
| KB | `clients-kb/{accountId}-*.md` |
| Export PDF | `clients-prompt/_exports/` |
| Libreria tool/prompt | `Libreria-prompt/` |
| Tool locali | `tools/` (`suite-run`, `spoki-playground-copy`) |

## Relazione con AI-churn-analysis

L’analisi churn, i report rinnovi e le pipeline KB Pinecone restano in `~/Desktop/AI-churn-analysis`. Questo repo contiene solo gli artefatti operativi degli agenti.
