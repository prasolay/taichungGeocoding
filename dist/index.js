"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello, World!!進入到index.ts中！');
});
app.listen(3000, () => console.log('http server is running at port 3000.'));
//# sourceMappingURL=index.js.map