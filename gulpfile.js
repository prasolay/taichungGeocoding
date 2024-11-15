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

// //初始化瀏覽器環境變數
// const watchedBrowserify = watchify(
//   browserify({
//     basedir: ".",
//     debug: true,
//     entries: ["src/js/main.ts"],
//     cache: {},
//     packageCache: {},
//   })
// ).plugin(tsify);

//豪呈程式碼
// parallelList.push("js");
// gulp.task("js", function () {
//   var ts = ["./src/js/*.ts"];

//   if (process.env.NODE_ENV === "production") {
//     gulp
//       .src(ts)
//       // .plugin(tsify)
//       // .pipe(source("bundle.js"))
//       // .pipe(uglify({ output: { comments: false } }))
//       .pipe(gulp.dest("./public/js/"));
//   } else {
//     gulp
//       .src(ts)
//       // .plugin(tsify)
//       // .bundle()
//       // .pipe(source("bundle.js"))
//       .pipe(gulp.dest("./public/js/"));
//   }

//   return new Promise((resolve, reject) => {
//     resolve("js success");
//   });
// });

// function bundle() {
//   return watchedBrowserify
//     .bundle()
//     .pipe(source("bundle.js"))
//     .pipe(gulp.dest("dist"));
// }

//gpt程式碼
gulp.task("bundle-js", function () {
  if (process.env.NODE_ENV === "production") {
    return browserify({
      basedir: ".",
      debug: true,
      cache: {},
      entries: ["src/js/index.ts"],
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer()) // 需要 buffer 來使用 gulp-uglify
      .pipe(uglify({ output: { comments: false } }))
      .pipe(gulp.dest("./public/js/"));
  } else {
    return browserify({
      basedir: ".",
      debug: true,
      cache: {},
      entries: ["src/js/index.ts"],
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./public/js/"));
  }
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
  gulp.src(html).pipe(gulp.dest("./public"));

  return new Promise((resolve, reject) => {
    resolve("html success");
  });
});

//init sever
gulp.task("start-server", function (cb) {
  exec("node server.js", function (err, stdout, stderr) {
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
