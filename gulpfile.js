"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var rename = require("gulp-rename");
var svg = require("gulp-svgstore");
var minifycss = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require('gulp-webp');
var include = require('posthtml-include');
var posthtml = require('gulp-posthtml');

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minifycss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svg({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("optimizeimages", function () {
  return gulp.src("build/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));

});

gulp.task("webp", function () {
  return gulp.src("build/img/*.{jpg,png}")
    .pipe(webp({
      quality: 90,
      method: 6
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css")).on("change", server.reload);
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task("build",
  gulp.series(
    "clean",
    "sprite",
    "css",
    "copy",
    "html",
    // "optimizeimages",
    "webp"
  )
);
