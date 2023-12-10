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

app.post("/api/summarize-text", async (request, response) => {
  const { rawText } = request.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `あなたは歴史の授業を受けている学生です。
          先生が授業中に以下の説明をしたので、その内容をノートにまとめようと思いました。
          まず、重要な点を要約して、ノートをまとめる際のガイドラインを作りましょう。
          この時、小学生向け、中学生向け、高校生向けで表現や詳しさが異なる３通りのガイドラインを作ってください。
          ガイドラインのテンプレート
          1.タイトル:
          2.出来事の概要:
          3.背景と動機:
          4.影響と意義:
          以下の手順に従って、このテンプレートを完成させてください。
          1.この授業の要点を10文字程度でまとめ、「タイトル：」の後に書いてください
          2.先生の説明から、出来事を時系列順にまとめて箇条書きしてください
          3.出来事のきっかけとなった背景と動機を箇条書きにしてください
          4.出来事が起きたことによる影響や歴史的意義を箇条書きにしてください
          （先生の説明）
          みなさん、今日は戦国時代の興亡を象徴する出来事、本能寺の変についてお話ししましょう。1582年、織田信長が京都本能寺で明智光秀に襲撃され、信長は討たれました。これにより、豊臣秀吉が台頭し、戦国時代の終焉が訪れたのです。本能寺の変は、歴史の中で大きな転換点であり、豊臣秀吉が後に天下を統一する端緒となりました。信長の死により、新たな時代の扉が開かれたのです。`,
      },
      { role: "user", content: rawText },
    ],
    model: "gpt-4",
  });
  const summarizedText = completion.choices[0].message.content;
  response.json({
    summarizedText,
  });
});

app.get("/api/file", async (request, response) => {
  const files = await prisma.file.findMany();
  response.json(files);
});

app.post("/api/file", async (request, response) => {
  const { name, rawText, summarizedText } = request.body;
  const file = await prisma.file.create({
    data: {
      name,
      rawText,
      summarizedText,
    },
  });
  response.json(file);
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
  const { name, rawText, summarizedText } = request.body;
  const file = await prisma.file.update({
    where: { id },
    data: {
      name,
      rawText,
      summarizedText,
    },
  });
  response.json(file);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
