// //express.js server
// //api : server side

// //

// //시간읽어서 1초전.. 서버시간...
// //node.js에서 쓰는 mysql

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const result = await prisma.user.findMany();
  console.log("GET완료, JSON에 들어가요옹");
  res.status(200).json({ result }); // 너가 없어서 내가 하루를 날렸어....
}

//https://guswnl0610.github.io/nodejs/prismaCRUD/
