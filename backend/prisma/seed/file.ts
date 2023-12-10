import { PrismaClient } from "@prisma/client";

type File = {
  id: string;
  name: string;
  rawText: string;
  summarizedText: string;
};

const files: File[] = [
  {
    id: "521dc79a-49d7-4798-ac95-ad06bd51cd43",
    name: "name1",
    rawText: "raw1",
    summarizedText: "summarized1",
  },
];

export default async function seedFile(prisma: PrismaClient) {
  for (const file of files) {
    const createdFile = await prisma.file.create({
      data: file,
    });
    console.log(createdFile);
  }
}
