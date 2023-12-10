import { PrismaClient } from "@prisma/client";

type User = {
  id: string;
  username: string;
  name: string;
  password: string;
};

const users: User[] = [
  {
    id: "16834cc1-2b23-4d83-8b02-47463590e2d5",
    username: "username1",
    name: "name1",
    password: "password1",
  },
  {
    id: "91b2d98e-c0bf-456d-9d5e-f71bf54d739f",
    username: "username2",
    name: "name2",
    password: "password2",
  },
  {
    id: "fd38bb21-8433-480e-badd-f6b8014149b0",
    username: "username3",
    name: "name3",
    password: "password3",
  },
];

export default async function seedUser(prisma: PrismaClient) {
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log(createdUser);
  }
}
