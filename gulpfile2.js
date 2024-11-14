const gulp = require("gulp");
// const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const minifyCss = require("gulp-clean-css");
const parallelList = [];

//測適用
console.log(process.env.NODE_ENV);
debugger;

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
  var css = ["./assets/css/*.scss"];

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

gulp.task("default", gulp.parallel(parallelList));
