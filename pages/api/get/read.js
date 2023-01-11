// //express.js server
// //api : server side

// //

// //시간읽어서 1초전.. 서버시간...

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  // console.log(req.body);
  const result = await prisma.user.findMany({
    orderBy: [
      {
        role: "desc",
      },
      {
        id: "desc",
      },
    ],
    // take: 6,
  });
  // console.log("GET완료, JSON에 들어가요옹");
  res.status(200).json({ result });
}

//https://guswnl0610.github.io/nodejs/prismaCRUD/
