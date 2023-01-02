import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { name, email, phone, content } = JSON.parse(req.body);

  const document = await prisma.user.create({
    data: {
      name: name,
      email: email,
      phone: phone,
      content: content,
    },
  });

  console.log(document);
  res.status(200).json({ message: "포스트 끝났어용" });
}
