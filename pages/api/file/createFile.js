export const config = {
  api: {
    externalResolver: true,
  },
};
const createFile = (req, res) => {
  // console.log("createFile 도착", JSON.parse(req.body));
  const obj = JSON.parse(req.body); //title을 String으로 사용하기 위해
  const fs = require("fs");

  const directory = fs.existsSync("./components/text/"); //디렉토리 경로 입력
  // console.log("Type : ", typeof obj.title);
  // console.log("Boolean : ", directory);

  if (!fs.existsSync("./components/text/" + obj.title)) {
    fs.mkdirSync("./components/text/" + obj.title);
  }

  // 해당 경로로 파일 저장 ^^!!
  fs.writeFile(
    "./components/" + "text/" + obj.title + "/" + obj.title + ".md",
    req.body,
    function (err) {
      if (err === null) {
        // console.log(req.body);
        console.log("createFile 완성했어용(ฅ^･ω･^ ฅ) ");
      } else {
        console.log("createFile 실패했어용૮( ꒦ິ࿄꒦ີ)ა ");
        console.log(err);
      }
    }
  );

  // const path = require("path");
  // console.log("path.sep:", path);
  // console.log(path.dirname(__filename));
  // console.log(path.basename(__filename));
  // console.log(path.parse(__filename));
  // //
  // console.log("경로" + path.resolve("/app", "components", "text.txt"));
  // console.log(path.isAbsolute("/app/components/text"));
  // console.log("=================");
};
export default createFile;
