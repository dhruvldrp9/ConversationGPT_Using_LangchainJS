import express from 'express';
import bodyParser from 'body-parser';
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { DynamicTool, SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { Redis } from "ioredis";
import { RedisChatMessageHistory } from "langchain/stores/message/ioredis";
// import { RunnableSequence } from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";

const app = express();
const port = 3000;

//Langchain code
const client = new Redis("redis://localhost:6379");

const memory = new BufferMemory({
    chatHistory: new RedisChatMessageHistory({
      sessionId: new Date().toISOString(),
      sessionTTL: 300,
      client,
    }),
  });

const Open = "Enter_Your_OpenAI_API_Key";
const Serp = "Enter_Your_Serp_API_Key";

const tools = [new Calculator(), new SerpAPI(Serp), new DynamicTool({
    name: "memory1",
    description: "call when asked about memory",
    func: async (input, memory) => {
      const chatHistory = await memory.get("chatHistory");
      const text = chatHistory.map((m) => m.text).join("\n");
      return { text };
    }
})];
const chat = new ChatOpenAI({ openAIApiKey: Open,modelName: "gpt-4", temperature: 0 });
const outputParser = new StringOutputParser();


const executor = await initializeAgentExecutorWithOptions(tools, chat, {
  agentType: "openai-functions",
//   verbose: true,
});

// Langchain code ends here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    const result = await executor.invoke({
        input: userMessage,
    });

    // For demonstration, echo back the user's message
    const response = {
        message: result.output,
    };

    console.log('Received message:', userMessage);
    console.log('Sending response:', response.message);
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
