export const config = {
  api: {
    externalResolver: true,
  },
};
export default async function handler(req, res) {
  const fs = require("fs");
  const result = fs.readFile(
    "./components/text/Test/Test.md",
    "utf8",
    (err, data) => {
      if (err) {
        console.log("ERROR!!!!!");
        console.error(err);
      }
      console.log("data : ", data);
      res.status(200).json({ data: data }); //{키:값}으로 해야함( ꒦ິ࿄꒦ີ)
    }
  );
}
