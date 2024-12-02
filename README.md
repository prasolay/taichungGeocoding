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
14. npm install gulp-dotenv gulp-rename --save
15. npm install --save-dev watchify
16. npm install @types/openlayers
17. npm install realpathify vinyl-buffer gulp-sourcemaps babelify --save-dev
18. npm install babel-preset-env --save-dev
19. npm install --save-dev @babel/preset-env
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


## 已知問題
1. 讀取ol模組時會出現重大狀況
   1. 
      ``` cmd
         Error: 'import' and 'export' may appear only with 'sourceType: module'
      ```
      說明：引用o模組時，會出現引用錯誤，即使已經把.ts模組修改成使用esm方式進行引用，也確認自己撰寫的.ts檔案符合esm架構，並且也可以順利被引用。但是只要引入o模組時就醫定會出現問題。

      解決方法：放棄使用gulp使用，改使用「webpack」或者是「parcel」，確保引入進來的.js不論是cjs或者是esm都不會有間容問題。

      完整error
      ```cmd
      [15:58:38] Bundle Error: 'import' and 'export' may appear only with 'sourceType: module'
      [15:58:38] 'bundle-js' errored after 3.07 s
      [15:58:38] TypeError: Cannot read properties of undefined (reading 'emit')
         at Readable.<anonymous> (file:///D:/work_area/sideProject/taichungGeocoding/gulpfile.js:145:12)
         at Readable.emit (node:events:531:35)
         at Readable.emit (node:domain:488:12)
         at Labeled.<anonymous> (D:\work_area\sideProject\taichungGeocoding\node_modules\read-only-stream\index.js:28:44)
         at Labeled.emit (node:events:519:28)
         at Labeled.emit (node:domain:488:12)
         at Labeled.<anonymous> (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:130:18)
         at Labeled.emit (node:events:531:35)
         at Labeled.emit (node:domain:488:12)
         at DestroyableTransform.<anonymous> (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:130:18)
         at DestroyableTransform.emit (node:events:519:28)
         at DestroyableTransform.emit (node:domain:488:12)
         at DestroyableTransform._transform (D:\work_area\sideProject\taichungGeocoding\node_modules\browserify\index.js:708:34)
         at Transform._read (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_transform.js:184:10)
         at Transform._write (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_transform.js:172:83)
         at Pipeline._write (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:70:22)
         at doWrite (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_writable.js:428:64)
         at writeOrBuffer (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_writable.js:417:5)
         at Writable.write (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_writable.js:334:11)
         at Labeled.ondata (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:619:20)
         at Labeled.emit (node:events:519:28)
         at Labeled.emit (node:domain:551:15)
         at addChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:291:12)
         at readableAddChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:278:11)
         at Readable.push (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:245:10)
         at Pipeline._read (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:54:31)
         at DestroyableTransform.onreadable (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:61:18)
         at Object.onceWrapper (node:events:633:28)
         at DestroyableTransform.emit (node:events:519:28)
         at DestroyableTransform.emit (node:domain:551:15)
         at emitReadable_ (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:504:10)
         at emitReadable (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:498:62)
         at addChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:298:29)
         at readableAddChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:278:11)
         at Readable.push (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:245:10)
      ream\lib\_stream_writable.js:417:5)
         at Writable.write (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_writable.js:334:11)
         at Labeled.ondata (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:619:20)
         at Labeled.emit (node:events:519:28)
         at Labeled.emit (node:domain:551:15)
         at addChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:291:12)
         at readableAddChunk (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:278:11)
         at Readable.push (D:\work_area\sideProject\taichungGeocoding\node_modules\readable-stream\lib\_stream_readable.js:245:10)
         at Pipeline._read (D:\work_area\sideProject\taichungGeocoding\node_modules\stream-splicer\index.js:54:31)
      [15:58:38] 'default' errored after 3.09 s
      ```
