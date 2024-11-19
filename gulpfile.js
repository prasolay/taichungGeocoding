import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import gulpSass from "gulp-sass";
import * as sassMolde from "sass";
import { exec } from "child_process";

const sass = gulpSass(sassMolde);

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

gulp.task("start-server", function (cb) {
  exec("node server.js", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

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
