var gulp = require("gulp");
const zip = require("gulp-zip");

function bundle() {
  return gulp
    .src([
      "**/*",
      "!node_modules/**",
      "!src/**",
      "!zip/**",
      "!bundled/**",
      "!.git/**",
      "!gulpfile.js",
      "!package.json",
      "!package-lock.json",
      "!webpack.config.js",
      "!.gitignore",
      "!.eslintrc.js",
      "!README.md",
      "!todo.txt",
    ])
    .pipe(gulp.dest("bundled/panorama"));
}

exports.bundle = bundle;

exports.zip = () => {
  return (
    gulp
      .src(["bundled/**"])
      .pipe(zip("panorama.zip"))
      .pipe(gulp.dest("zip"))
  );
};
