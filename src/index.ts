import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();

// 動態選擇環境變數的檔案
dotenv.config({ path: path.resolve(__dirname, `/environments/${ process.env.NODE_ENV }.env`) });
console.log(__dirname);

app.get('/', (req, res, next) => {
    res.send('Hello, World!!進入到index.ts中!');
    res.send('你好！');
});


app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));