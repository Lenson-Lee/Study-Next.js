import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: "김수한무거북이와두루미",
      // email: "kim@turtle.swan",-> unique를 왜 넣어 바보야
      content: "삼천갑자 동방삭 치치카포 사리사리",
    },
  });
  console.log(updateUser);
  res.status(200).json({ message: "수정 끝났어용" });
}
