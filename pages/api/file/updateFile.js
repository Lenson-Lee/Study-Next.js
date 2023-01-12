export const config = {
  api: {
    externalResolver: true,
  },
};
export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const fs = require("fs");
  const data = {
    title: "Text",
    content: "### 수정했어요 \n >>> - 수정되었나요",
  };

  const str = JSON.stringify(data);
  //
  const result = fs.writeFile(
    "./components/text/Test/Test.md",
    str,
    "utf8",
    (err, result) => {
      console.log("result : ", result);

      if (err) {
        console.log("ERROR!!!!!");
        console.error(err);
      }
      res.status(200).json({ result: result }); //{키:값}으로 해야함( ꒦ິ࿄꒦ີ)
    }
  );
}
