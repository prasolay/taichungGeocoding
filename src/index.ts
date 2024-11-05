import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello, World!!進入到index.ts中！');
});

app.listen(3000, () => console.log('http server is running at port 3000.'));