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
   
## 運作專案檔案腳本
正式環境:

    npm run start 
生產環境

    npm run start:dev
