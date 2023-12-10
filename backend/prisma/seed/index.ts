import { PrismaClient } from "@prisma/client";
import seedUser from "./user";

const prisma = new PrismaClient();

async function main() {
  await seedUser(prisma);
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
