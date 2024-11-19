import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
var PORT = 3005;
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

// 動態選擇環境變數的檔案
dotenv.config({
  path: path.resolve(
    __dirname,
    `./src/environments/${process.env.NODE_ENV}.env`
  ),
});
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
app.get("/", (req, res, next) => {
  res.send("Hello, World!!進入到index.ts中!");
});

app.listen(process.env.PORT, () =>
  console.log(`http server is running at port ${process.env.PORT}.`)
);

// // 設定靜態檔案目錄
// app.use(express.static(path.join(__dirname, "dist")));

// // 讀取 index.html
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
