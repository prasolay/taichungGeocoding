const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const paths = {
  pages: ["src/*.html"],
};
const exec = require("child_process").exec;

//豪呈程式碼
// const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const minifyCss = require("gulp-clean-css");
const parallelList = [];

//測適用
console.log(process.env.NODE_ENV);
debugger;

//init html
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("public"));
});

//豪呈程式碼
parallelList.push("js");
gulp.task("js", function () {
  var js = ["./src/js/*.js"];

  if (process.env.NODE_ENV === "production") {
    gulp
      .src(js)
      .pipe(uglify({ output: { comments: false } }))
      .pipe(gulp.dest("./public/js/"));
  } else {
    gulp.src(js).pipe(gulp.dest("./public/js/"));
  }

  return new Promise((resolve, reject) => {
    resolve("js success");
  });
});

parallelList.push("css");
gulp.task("css", function () {
  var css = ["./src/css/*.scss"];

  if (process.env.NODE_ENV === "production") {
    gulp
      .src(css)
      .pipe(sass().on("error", sass.logError))
      .pipe(minifyCss())
      .pipe(gulp.dest("./public/css"));
  } else {
    gulp
      .src(css)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("./public/css"));
  }

  return new Promise((resolve, reject) => {
    resolve("css success");
  });
});

//處理html檔案
parallelList.push("copy-html");
gulp.task("html", function () {
  var html = ["./src/*.html"];
  gulp.src(html).pipe(gulp.dest("public"));
});

gulp.task("default", gulp.parallel(parallelList), "start-sever");

//init sever
gulp.task("start-server", function (cb) {
  exec("node server.ts", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task(
  "default",
  gulp.series(gulp.parallel(parallelList), "bundle-js", "start-server")
);

// gulp.task(
//   "default",
//   gulp.parallel(parallelList),
//   function () {
//     // var ts = ["./src/js/*.ts"];
//     if (process.env.NODE_ENV === "production") {
//       return browserify({
//         basedir: ".",
//         debug: true,
//         cache: {},
//         entries: ["src/js/index.ts"],
//         packageCache: {},
//       })
//         .plugin(tsify)
//         .bundle()
//         .pipe(source("bundle.js"))
//         .pipe(uglify({ output: { comments: false } }))
//         .pipe(gulp.dest("./public/js/"));
//     } else {
//       return browserify({
//         basedir: ".",
//         debug: true,
//         cache: {},
//         entries: ["src/js/index.ts"],
//         packageCache: {},
//       })
//         .plugin(tsify)
//         .bundle()
//         .pipe(source("bundle.js"))
//         .pipe(gulp.dest("./public/js/"));
//     }
//   },
//   "start-server"
// );
