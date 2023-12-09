import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
