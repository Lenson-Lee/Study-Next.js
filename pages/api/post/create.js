import { PrismaClient } from "@prisma/client";
//express.js server
//api : server side

//

//시간읽어서 1초전.. 서버시간...
//node.js에서 쓰는 mysql

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
