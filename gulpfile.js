import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import gulpSass from "gulp-sass";
import * as sassMolde from "sass";
const sass = gulpSass(sassMolde);
import { exec } from "child_process";
import { spawn } from "child_process";
import watchify from "watchify";
import gutil from "gulp-util";
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

const watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/js/main.ts"],
    cache: {},
    packageCache: {},
  })
).plugin(tsify);

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
if (process.env.NODE_ENV == "development") {
  gulp.task("start-server", function (cb) {
    const server = spawn("node", ["server.js"], {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.NODE_ENV.PORT,
      }, //port應該要從.env檔案讀取
    });

    server.on("error", (err) => {
      console.error(`Failed to start server process: ${err}`);
      cb(err);
    });

    server.on("close", (code) => {
      if (code !== 0) {
        console.error(`server process exited with code ${code}`);
        cb(new Error(`server process exited with code ${code}`));
      } else {
        cb();
      }
    });
  });
} else if (process.env.NODE_ENV == "production") {
  gulp.task("start-server", function (cb) {
    const server = spawn("node", ["server.js"], {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.NODE_ENV.PORT,
      }, //port應該要從.env檔案讀取
    });

    server.on("error", (err) => {
      console.error(`Failed to start server process: ${err}`);
      cb(err);
    });

    server.on("close", (code) => {
      if (code !== 0) {
        console.error(`server process exited with code ${code}`);
        cb(new Error(`server process exited with code ${code}`));
      } else {
        cb();
      }
    });
  });
}

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

//間聽瀏覽器檔案-JS檔
function jsBundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("public"));
}

function cssBundle() {
  const css = ["./src/css/*.scss"];
  return watchedBrowserify
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css"));
}

// gulp.task(
//   "default",
//   gulp.series(gulp.parallel(parallelList), jsBundle, "start-server")
// );

gulp.task("default", gulp.series(gulp.parallel(parallelList), jsBundle));

//間聽檔案
watchedBrowserify.on("update", jsBundle, cssBundle);
// watchedBrowserify.on("update", cssBundle);
// watchedBrowserify.on("log", gutil.log);
