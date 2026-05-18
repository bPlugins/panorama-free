var gulp = require("gulp");
const zip = require("gulp-zip");
const fs_config = require("./fs-config.json");

require("gulp-freemius-deploy")(gulp, {
  developer_id: fs_config.developer_id,
  plugin_id: fs_config.plugin_id,
  public_key: fs_config.public_key,
  secret_key: fs_config.secret_key,
  zip_name: "panorama.zip",
  zip_path: "zip/",
  add_contributor: false,
});

function bundle() {
  return gulp
    .src(["**/*", "!node_modules/**", "!src/**", "!zip/**","!index.html", "!composer-lock.json", "!composer.json", "!bundled/**", "!gulpfile.js", "!package.json", "!360-video.mp4", "!index.html", "!package-lock.json", "!webpack.config.js", "!.gitignore", "!todo.txt", "!fs-config.json", "!empty.js"])
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
