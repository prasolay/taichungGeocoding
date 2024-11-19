import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import gulpSass from "gulp-sass";
import * as sassMolde from "sass";
const sass = gulpSass(sassMolde);
import { exec } from "child_process";
// import dotenv from "gulp-dotenv";
// import rename from "gulp-rename";

// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require("vinyl-source-stream");
// var tsify = require("tsify");
// const sass = require("gulp-sass")(require("sass"));
// // var paths = {
// //   pages: ["src/*.html"],
// // };
// var exec = require("child_process").exec;

const parallelList = [];

//增加html檔案
parallelList.push("copy-html");
gulp.task("copy-html", function () {
  const html = ["./src/*.html"];
  gulp.src(html).pipe(gulp.dest("./public"));
  return new Promise((resolve, reject) => {
    resolve("html success");
  });
});

//啟動伺服器檔案
gulp.task("start-server", function (cb) {
  exec(
    " npx cross-env NODE_ENV=development && node server.js ",
    function (err, stdout, stderr) {
      if (err) {
        console.error(`exec error: ${err}`);
        return cb(err);
      }
      console.log(stdout);
      console.error(stderr);
      cb();
    }
  );
});

// console.log(process.env.NODE_ENV);

// if (process.env.NODE_ENV) {
//   gulp.task("start-server", function (cb) {
//     gulp
//       .src(`./src/environments/${process.env.NODE_ENV}.env`)
//       .pipe(dotenv())
//       .pipe(rename("env.json")),
//       exec(
//         " npx cross-env NODE_ENV=development node server.js ",
//         function (err, stdout, stderr) {
//           console.log(stdout);
//           console.log(stderr);
//           cb(err);
//         }
//       );
//   });
// } else {
//   throw new Error("系統開發環境變數設定錯誤!");
// }

//增加scss
parallelList.push("css");
gulp.task("css", function () {
  const css = ["./src/css/*.scss"];
  gulp
    .src(css)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"));

  return new Promise((resolve, reject) => {
    resolve("css success");
  });
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(parallelList),
    function () {
      return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/js/main.ts"],
        cache: {},
        packageCache: {},
      })
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("public"));
    },
    "start-server"
  )
);
