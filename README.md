# taichungGeocoding
台中市門牌地址資料對位專案，使用openlayers與node.js進行專案開發

#
以openlayers進行環境建置

## 安裝指令
1. npm install -g typescript
2. npm install ol
3. npm install typescript --save-dev
4. tsc --init
   1. 修改「tsconfig.json」裡面內容。
5. npm install @types/node @types/express --save-dev
6. npm install ts-node --save-dev
7. npm install --save-dev cross-env
   1. 修改package.json檔案內容
8. npm install gulp gulp-clean-css gulp-sass sass --save-dev
   1. 目的為把js與scss檔案自動編譯到另一個資料夾裡面。
9. 放棄使用「nodemon」
   1.  放棄使用「nodemon」。
10. npm install gulp-cli gulp-typescript --save-dev
11. npm install --save-dev gulp-typescript gulp-cli
12. npm install --save-dev browserify tsify vinyl-source-stream
13. npm install --save-dev gulp-uglify-es
## 運作專案檔案腳本
正式環境:

    npm run start 
生產環境

    npm run start:dev

## 操作指令
1. 把src資料夾內容更新到public資料夾：
   ```
   npm run compile
   ```
2. 運作測試環境：
   ```
   
   ```
