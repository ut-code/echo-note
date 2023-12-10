import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const openai = new OpenAI();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", (request, response) => {
  response.send("Connection successful!");
});

app.post("/api/user", async (request, response) => {
  const { username, name, password } = request.body;
  const user = await prisma.user.create({
    data: {
      username,
      name,
      password,
    },
  });
  response.json(user);
});

app.get("/api/user/:id", async (request, response) => {
  const id = request.params.id;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  response.json(user);
});

app.post("/api/summarize-text", async (request, response) => {
  const { rawText } = request.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "あなたは優秀なノートテイカーです。次の内容を要約してください。",
      },
      { role: "user", content: rawText },
    ],
    model: "gpt-3.5-turbo",
  });
  const summarizedText = completion.choices[0].message.content;
  response.json({
    summarizedText,
  });
});

app.post("/api/file", async (request, response) => {
  const { name, content } = request.body;
  const file = await prisma.file.create({
    data: {
      name,
      content,
    },
  });
  response.json(file);
});

app.get("/api/file", async (request, response) => {
  const files = await prisma.file.findMany();
  response.json(files);
});

app.get("/api/file/:id", async (request, response) => {
  const id = request.params.id;
  const file = await prisma.file.findUnique({
    where: { id },
  });
  response.json(file);
});

app.put("/api/file/:id", async (request, response) => {
  const id = request.params.id;
  const { name, content } = request.body;
  const file = await prisma.file.update({
    where: { id },
    data: {
      name,
      content,
    },
  });
  response.json(file);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
