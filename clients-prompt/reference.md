# Spoki AI Agents -- Internal Reference

## Agent Types

### Sales Agent
- E-commerce focused, requires Shopify or PrestaShop integration
- Has an internal system prompt (created by Spoki devs, not visible to users) that steers behavior toward sales use cases
- Requires less setup from the user; suited for inexperienced users

### Customer Agent
- Support-oriented; responds only when documentation is available
- Extracts the most pertinent information from the knowledge base
- Has an internal system prompt (created by Spoki devs, not visible to users)
- Requires less setup from the user; suited for inexperienced users

### Custom Agent
- Full control over behavior, knowledge, and tools
- No hidden internal prompt beyond the base layer
- Suited for experienced users with specific or advanced use cases

### Key distinction
Sales and Customer agents are essentially Custom agents with special generic system prompts that users cannot access. Custom agents are the most customizable and can fit any role with the right tools and prompts.

---

## System Prompt: What It Is

A system prompt is a set of instructions the agent follows. The agent is like an actor who needs to know:

- Who they are (role)
- What they do (tasks)
- Who they work for (company context)
- What their limitations are (things they must not do or say)
- What their capabilities are (things they can do with appropriate tools)

The prompt answers: "What should I do when the user asks me [question/request]?"

What an agent does is different from what an agent knows. Mixing instructions with knowledge in the system prompt confuses the model.

---

## System Prompt: Best Practices

### Structure
- The agent reads one line at a time, one instruction at a time, in order
- Use bullet points and numbered lists for complex multi-step tasks
- Use markdown headers (`#`, `##`) to divide sections and subsections
- Aggregate related information in dedicated sections; never scatter it
- Position of information matters -- it changes agent behavior
- Use scenario-based structuring for conditional behavior:

```
### If Scenario A occurs:
Perform action 1
Perform action 2

### If Scenario B occurs:
Perform action 1
Perform action 2
```

### Language
- Prefer English for instructions (LLMs default language)
- The agent must reply in the same language as the user's input

### Writing rules
- Avoid ALWAYS and NEVER -- they rarely produce the expected results
- Steer toward desired behavior rather than listing what not to do (positive steering > negative guardrails)
- Avoid emojis unless they are part of a quoted expression the agent should use with the end user
- Don't be overly specific with prohibitions

### Architecture
- One agent, one specialization -- avoid overlapping agents
- Overlapping agents confuse the supervising system that routes user messages
- Consider: "Do I already have an agent that performs this task?"
- More tools = less accuracy; keep agents focused
- An ignorant agent is preferable to a lying one: instruct the agent to say "I don't have that information" rather than risk fabricated answers

### What NOT to put in the prompt
- Knowledge/information belongs in the KB, not in the prompt
- The prompt should not try to be an encyclopedia

---

## Knowledge Base: What It Is

KBs are the agent's extended memory -- the "what do I know?" library.

- KBs should NOT contain instructions on what the agent should do
- KBs are NOT tools; they are automatically consulted by the agent when answering
- The agent only consults relevant sections (like an encyclopedia)
- KBs can be as large as necessary, but must not contain contradictory or false information
- Duplicate items with conflicting data cause the agent to retrieve contradictory information without being able to assess which is correct

### KB input methods
- Website scraping (URLs)
- Manual input (text)
- File upload (PDF, images with OCR, CSV)

### KB examples
- Price tables
- Product catalogues
- Technical notes
- Policy documents

### Assignment
KBs are NOT auto-assigned to agents. Each KB document must be manually linked to the agents that need it.

---

## Prompt vs Knowledge Base

- System prompts tell the agent what to do and how to behave
- Knowledge bases tell the agent what information it knows and can reference
- Some models prioritize the prompt, others prioritize the KB -- this is outside our control
- The bigger prompts and KBs get, the easier it is to make small mistakes; constant review is needed

---

## Temperature

Controls how "creative" the model is when generating responses.

- Low temperature = high predictability, less human-sounding, less likely to invent
- High temperature = low predictability, more human-sounding, more likely to invent
- Temperature zero is NOT recommended
- Test at lower temperatures first, then increase to find the sweet spot

### Use case guidance
- Customer support: low temperature (stick to procedures, avoid wrong information)
- Sales/engagement: higher temperature (sound natural and engaging)

---

## Tools

Agents need two elements to use a tool:
1. The tool configuration in the "Agent's tools" section
2. A description in the system prompt of how and when to use that tool

More tools = less accuracy. Prefer specialized agents with dedicated tools.

Verify that external sources tools connect to are not blocking automated requests (firewalls, etc.).

### Base tools (always available)
1. `search_knowledge_base` -- search the KB for solutions, troubleshooting guides, and company information
2. `get_current_datetime` -- get current date and time; accepts optional timezone parameter (e.g., 'Europe/Rome')
3. `transfer_to_human` -- transfer conversation to a human operator when the user requests it or the agent cannot help

---

## Dynamic Fields (Variables)

- Syntax in prompt: `%%FIELD_CODE%%`
- Pre-resolved before the prompt is sent to the agent, so the agent reads actual values
- Must NOT be used in agent replies (they will not resolve there)
- Should be listed in a "User info" section at the top of the prompt

---

## Agent Routing and Operators

- When "Operators: AI" is toggled on, the supervising system automatically decides which active agent answers based on the user's message
- It is NOT currently possible to select which agent answers as a step of an automation
- Best practice: deactivate non-crucial agents and clearly differentiate active ones
- The supervising system reads the full conversation and selects the best agent based on the latest message

---

## Default Reply

A toggleable fallback message for when the agent has problems following its pipeline (can't follow instructions, can't retrieve tool data, etc.).

- It is recommended to always set a default reply
- Without it, the agent may simply not respond when it encounters problems
- Best practice: include instructions on how to contact a human operator

---

## Testing (Playground)

Two separate playground sections:
1. **Agent-specific playground** -- tests a single agent in isolation
2. **Multi-agent playground** -- tests how multiple agents interact (this is what end users experience)

### Iteration process
1. Write a prompt
2. Test with 10-15 "killer questions" designed to break it
3. Note when, how, and why the agent gave wrong answers
4. Write a new version addressing those failures
5. Repeat until satisfied

If an agent works in its dedicated playground but not in the multi-agent playground, it's either inactive or has interaction/selection issues with other agents.

---

## Prompt Builder (Generate with AI)

The same builder is used for all agent types. It takes as input:
- Company name
- Agent description
- Business area
- Available dynamic fields

The builder generates prompts WITHOUT markdown formatting for tools. Adding markdown headers manually after generation is a recommended workaround.

The builder instructs the generated prompt to:
- Reference base tools and when to use them
- Include a "User info" section with dynamic fields at the top
- Reply in the same language as the user's input
- Use `%%FIELD_CODE%%` syntax for dynamic fields (not in replies)

---

## Common Issues

### Agent delivers false/contradictory information from an integration
Check that external applications (e.g., PrestaShop) are not blocking automated requests (firewalls, scripts). May require developer/IT escalation.

### Agent does not escalate to a human
Check the prompt for escalation instructions and verify a dedicated tool exists. The AI operator must still be manually deactivated in Spoki chat. A built-in "transfer to human" tool is in development.

### Agent does not respect its knowledge base
Likely caused by duplicate items with different/contradictory information in the KB. The agent retrieves conflicting data and cannot determine which is correct.

### Prompt character limit
Front-end is limited to 16,000 characters. Longer prompts increase the risk of scattered information.

---

## Sources

- Public docs: https://support.spoki.com/docs/uncategorized/come-costruire-il-tuo-agente-ai/
- Shopify integration: https://support.spoki.com/docs/integrazioni/connect-shopify-to-spoki-ai-sales-agent/
- Internal training sessions (December 2025, Giacomo)
- Spoki prompt builder source
