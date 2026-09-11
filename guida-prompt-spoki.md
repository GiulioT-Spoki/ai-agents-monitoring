## Understanding Spoki AI Agents: A Comprehensive Guide

Hello everyone, this is a general recap of the training sessions with Giacomo in December. This document is intended mostly for internal use as a general guide to understand some of the inner workings of Spoki agents and AIs in general. Feedback is appreciated and kindly requested.

## 1.  Defining a System Prompt: what is it?

A system prompt is like a script (a series of **instructions**) that the agent knows it needs to follow. Imagine that the agent is an actor, so they need to know:

- who they are (sales agent, customer support agent, etc.)
- what they do
- who they are working for
- what are their limitations (things they must not do or say)
- what are their capabilities (things they might do with the appropriate tool)

System prompts govern the actions that an agent is supposed to take in order to have an interaction with a user. What an agent does is different from what an agent knows, and mixing instructions with different elements in system prompts ends up confusing the model, leaving clients confused and/or angry at us.

Ultimately the system prompt allows an agent to answer the question "What should I do when the user asks me [question/request]?"

When creating a system prompt for an agent, users should consider: "Do I already have an agent that performs this task? Is this agent overlapping with other active agents?"; overlapping agents (an agent is a system composed of prompt, tools, knowledgebase) might confuse the supervising system that decides which agent must answer a given user's message.

### Creating a System Prompt

System prompts can be created either by:

- writing manually in the creation wizard in the agent configuration
- using the 'Generate with AI' functionality

A system prompt might contain variables (like Spoki's dynamic fields, they are pieces of information that become populated within a text from outside it) and tools (more on that in the dedicated section).

Prompts must be frequently tested and iterated, in that either users might write suboptimal prompts themselves or the 'Generate with AI' functionality might not give the expected results. The sad truth is that the only way to properly test a prompt is to test it manually and it takes time and effort.

Since Spoki allows the creation of multiple agents that are automatically selected based on the users' queries, a good practice is to have specialised prompts for specialised agents.

### Structure of a System Prompt

Imagine that when reading instructions, the agent will read one line at the time, one instruction at the time. If your system prompt has a series of steps to follow in order to perform a task (e.g. qualifying a lead), the agent will try its best to follow the instructions it has been given in the same order in which they are presented.

So, bullet points and numbered lists are your friend when instructing an agent on how to perform complex tasks.

### Language

It might not be a deciding factor but LLMs have English as their default language. They can speak and 'understand' instructions in other languages it supports of course, but it is a good practice to use English.

### Writing a System Prompt

When not using the Generate with AI function to write a system prompt for an agent, there are some good practices that we (and our clients) should follow that help LLMs adhere to our instructions:

- Aggregate relevant information in specific sections (ie. put all the information related to the role of the agent in the same section, all the information related to what tools can be used and how in a dedicated section, and so on)
- Avoid expressions such as ALWAYS and NEVER, external AIs (such as OpenAI, Claude, and so on) often put this type of reinforcement to prompt in order to make agents more obedient. In my experience, though, it rarely leads to the expected results.
- Don't be too specific with the don't (guardrails/things the agents should not do). Models tend to behave in a more predictable way when steered in the desired direction rather than steered far from the undesired one.
- Avoid emojis. They add no relevance to the instructions, unless you are explicitly writing a quoted expression that the agent should use when interacting with the user. Otherwise, they can and should be omitted.
- (Optional) use markdown headers and subheaders to divide both the prompt sections and the knowledge base sections. Whereas theoretically LLMs have an easier time parsing information formatted in markdown, the 'generate with AI' function in Spoki does not generate prompts in markdown format, so our proprietary agents might not need this specific text formatting in order to function properly. It is recommended to manually add headers to the AI-generated prompt as it does not generate them by default as a workaround to some unintended behaviour.

Example markdown formatting:

```

# Header (use this for main sections)

## Subheader (use this for secondary sections nested in the main ones)

```

### Aggregating Information

The model reads the prompt line by line: relevant information should be placed in dedicated sections and not scattered around the prompt. The position of information in the prompt changes the agent's behaviour. Here is an example of how instructions telling the agent how to behave in scenarios:

```

### If Scenario A occurs:

Perform action 1

Perform action 2

Perform action 3

### If Scenario B occurs:

Perform action 1

Perform action 2

Perform action 3

### If Scenario C occurs:

Perform action 1

Perform action 2

Perform action 3

```

## 2. Defining a Knowledge Base: what is it?

AI knowledge bases (KBs) basically function as an extended memory of an agent. If prompts are brains and tools are instruments, knowledge bases are like a library containing the 'what do I know?' of the agent. Knowledge bases should not contain instructions on what the agent should do.

Despite being something not necessarily contained within the system prompt, KBs are not tools and are automatically consulted by the agent when answering users queries.

A KB is like an encyclopedia: when trying to retrieve information, the agent only consults relevant sections of it. Therefore KBs can be as big as necessary, provided that they do not contain contradictory or false information.

### Knowledge Base Examples

- Price tables
- Product catalogues
- Technical notes
- Policy documents

## 3. System Prompt vs Knowledge Base

Behind the scene, models might give different priorities to system prompts and knowledgebases when deciding how to answer a question: that is to say that some models will prioritise following the script in the system prompt and some others will instead prioritise finding relevant information in their knowledgebase: in the latter case, things will be outside of our control.

Other than generating possible discomfort and/or frustration in the clients, non-obedient agents might often be the result of something wrong with either the system prompt or the knowledgebase (as a general rule, the bigger prompts and knowledgebases get, the easier it is for people creating and managing it to make small mistakes), so constant fixing is needed.

To summarize the key difference: system prompts tell the agent what to do and how to behave, while knowledge bases tell the agent what information it knows and can reference.

## 4. What is ‘Temperature’?

Temperature is basically how 'creative' a model can get when it decides what to say upon user's input. LLMs receive a text from users (ie. words, parts of words, etc.) and they 'know' that this text can be followed by a given number of words (it's like knowing how likely it is for a given word to be followed by another given word).

All words have a given chance to be picked: the lower the temperature (or creativity) of a model, the more likely it is that the agent will decide to 'think' of an answer that is made of a series of words that are very likely to be combined together. Lower temperatures make it so that LLM sticks to the instructions it is given in the system prompt.

### Low Temperature

- *Low temperature = high predictability = less human-sounding = less likely to invent**
- *Low temperature use case:**

Customer support agent: we are building an agent that must stick to our procedures and must give our (possibly) angry customers answers that are aligned with our policy. We want an agent that is predictable and deterministic as much as possible, since we'd rather our clients not receive wrong information, even more in these situations (even for avoiding us to put double the effort into correcting mistakes).

### High Temperature

Conversely, higher temperatures will make the agent feel free to try different routes rather than what is explicitly stated in the prompt. It is the equivalent of telling someone "You know that this is the right answer to my question, but you are free to choose another answer if you prefer". This makes it so that models sound more natural and entertaining.

- *High temperature = low predictability = more human-sounding = more likely to invent**
- *High temperature use case:**

Sales agent: we are building an agent that will engage our clients with our products and sound more human-like.

### Finding the Right Temperature

Ultimately, temperature is a gradient that allows us (and our customers) to establish how creative and controllable an agent is.

Different agents require different temperatures and although a temperature equal to zero is not recommended, testing should be carried out first at lower temperatures and then progressively increasing it in order to find the sweet spot for the specific agent.

## 5. What is a ‘Tool’?

Agents can access external resources to perform specific tasks (i.e. sending an email, creating an appointment on Google Calendar, setting off an automation) and they need two elements in order to do so:

- a tool that physically contains the necessary information in the 'Agent's tools' section (necessary information to provide here might vary according to the type of tool we are creating)
- a description of how and when to use the tool(s) in the system prompt

The logic here is that an agent needs to have both an instrument to perform an action and instructions on how to use that tool. As with the system prompt, the more tools an agent has to handle by itself, the less accurate it might become so it would be more efficient to have specialised agents handling dedicated tools.

Not only is it important to make it so that the agent 'knows' how to use the tool, but it is also important to verify that external sources tools are trying to connect with are properly set up (i.e. no firewalls preventing external calls, etc.).

Tools are structured in form-like sections that allow configuration of the specific integration or action the agent needs to perform.

## 6. Agents and Operators

AI agents are connected to the user's proprietary Spoki account. Therefore (at this specific time, December 18th 2025) it is not possible to create agents that are connected to a specific user who has access to that account (ie. chat operator, chat manager, etc.).

The main goal of an AI agent is to provide users with answers, so they must be given tools to perform such actions and they must be instructed on how to react when they don't get the answer they are looking for. Here is a sample scenario:

A customer asks an AI agent to provide tracking information for an article they have bought. The AI gives the standard "Ok let me check it for you… it seems your package has been already delivered".

Why does the AI answer like that? Because an AI's 'instinct' (I'm using the term very loosely here) is to provide an answer no matter what, therefore if it is not instructed on how and where to find information, it will deliver made-up information. A general recommendation would be to explicitly state in the agent instructions to say "I have no access to that information / I cannot retrieve that information": an 'ignorant' agent is preferable to a lying one in that it means that it is following the instructions they are being given.

### Choosing Which Active Agent Will Answer

Whenever the Operators: AI option is toggled on and an end customer is writing in the chat with it, the underlying supervising system automatically decides which active agent is the most fit to answer the question, based on the task(s) that specific agent is designed to answer. As things stand now (December 18th 2025) it is not currently possible to select what agent will answer, for example, as a step of an automation (WIP).

At the moment, the best choice is still to deactivate agents that are not crucial and differentiate in a clear way currently active agents. Developers are working on an automated system to make it so that AI agents can escalate properly to human operators when users want to speak with a non-AI operator (this is useful for both our clients and our technical support).

### Default Reply

A default reply is a toggleable option that acts as a fallback answer in case an agent has problems following its internal pipeline (the causes might vary: it has trouble following its instructions, it cannot retrieve information passed by the tools, etc.).

In general, the default reply is what the end user sees whenever there is a problem with the backend running the agent.

It is recommended to set a default reply, otherwise the user might ask something to the agent, the agent might come across problems and simply not answer.

## 7. Playground Section

The playground section allows users to test how a specific agent behaves and how different agents interact in a conversation. They are in fact two separate playground sections:

- **Playground (agent-specific):** button within the agent system prompt configuration interface
- **Playground (multi-agent):** button in the agents list interface

What the final users will interact with falls in the second scenario (multiple agents interacting with each other and with the user within the same chat).

Behind the scenes, the coordinating system automatically determines which agent will 'take the turn' and act based upon users' input.

If one or more agents behave in the intended way in their dedicated playground but not in the multi-agent playground, either they're not selected (they're inactive) or there are underlying issues in how they interact with other agents.

## 8. FAQs, Common Issues and Troubleshooting

### AI Agent delivers false or contradictory information when using an integration

Other than checking for problems within the Spoki AI ecosystem (agent prompt, agent tools, agent KB) make it sure that external applications (ie. Prestashop) you are connecting to are not actively blocking automated requests (such as scripts), like firewalls and so on. This might require escalation to developers and/or IT staff and in-depth analysis in that agents might correctly invoke the appropriate tools to request information from an integration but not retrieve the expected information.

### AI Agent does not properly escalate to a human when a user says "I want to speak with a human"

You should take a look at the prompt to check if the agent knows how to behave in this case and make sure that there is a dedicated tool to notify a human operator. You still need to manually deactivate the AI operator in the Spoki chat. The development team is currently working on an internal 'transfer to human' tool for agents to make it so that agents have a default way to escalate to humans as a fallback measure in case our customers do not manually create a dedicated tool.

### Sales Agent vs Customer Agent vs Custom Agent

- **Custom agents** are the more customisable ones and can potentially fit any role provided the appropriate tools and prompts. Experienced users might prefer tailoring a custom agent to fit their needs.
- **Sales agents and Customer agents** are basically custom agents with special generic system prompts created internally that users cannot access. Our underlying system prompts are made internally from our devs and steer sales agents and customer agents in the right direction for their intended use cases. Inexperienced users might want to start tinkering with this type of agent in that they require less setup.

### Are there resources I can check to get some inspiration for my system prompt?

- https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions?hl=it
- https://console.cloud.google.com/vertex-ai/studio/prompt-gallery?invt=AcE48Q&project=vernal-centaur-481713-a9

Have fun, these are basically a prompt library. Just focus on the "System Instructions" section, the other ones are more developer-oriented and outside the scope of this guide. You can of course suggest customers to take inspiration from these resources if they feel curious about how to write a prompt, in general the Generate with AI function in Spoki is more controllable on our end in that it is a proprietary system.

### What does it mean to 'iterate a prompt'?

Basically it's an A/B test. Write a prompt, try to break it with specific questions related to that agent's function in the playground. Try with 10-15 attempts with killer questions, note down if, when and how the agent provided the wrong answer. Then write a second version (iteration) that tries to address the ways you managed to break the previous one. Rinse and repeat until you are satisfied with the end result. It takes time, depending on the complexity of the prompt. This is a crucial step, it is often frustrating, but AI cannot read your mind so you have to step down to its level.

### Can I trace back which agent is giving me an answer in Spoki?

Yes, as long as you are in any one of the playgrounds (agent-specific or multiagent) you can see the name of the agent that is providing the answer, so as to isolate possible issues with that specific agent.

### Does the AI agent(s) have context of the conversation with a user?

Yes, the supervising system 'reads' the full conversation with the user and based on their latest request selects the 'best' agent to answer the question.

### My agent is not respecting its knowledge base

It is very likely that in the knowledge base an item (e.g. the KB being a catalogue with product descriptions) is mentioned more than once with different and/or contradictory information, so the agent is retrieving contradictory information but it is not able to assess what is the correct source of information to reference when providing an answer.

### Can an agent's prompt run out of space?

Theoretically no. However, our front-end is currently limited to 16k characters (which is an incredibly generous limit). Keep in mind that a longer prompt naturally leads to potentially higher risks of scattering information through its length.