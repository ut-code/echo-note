import { PrismaClient } from "@prisma/client";
import seedUser from "./user";
import seedFile from "./file";

const prisma = new PrismaClient();

async function main() {
  await seedUser(prisma);
  await seedFile(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
