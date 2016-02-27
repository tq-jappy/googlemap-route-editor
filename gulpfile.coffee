gulp = require "gulp"
uglify = require "gulp-uglify"
minify = require "gulp-minify-css"
del = require "del"
webpack = require "webpack-stream"
browserSync = require "browser-sync"
path = require "path"
config = require "./gulp/config"

# Building CSS files
gulp.task "css", ->
  gulp.src config.styles.src
    .pipe minify()
    .pipe gulp.dest config.styles.dest

# Compile and bundle JS file from source code
gulp.task "js", ->
  gulp.src config.scripts.src
    .pipe webpack  require "./webpack.config.js"
    .pipe gulp.dest config.scripts.dest

# Copy all static files in src directory to temporary build directory
gulp.task "statics", ->
  gulp.src config.views.src
    .pipe gulp.dest config.views.dest
  gulp.src config.images.src
    .pipe gulp.dest config.images.dest

# Build
gulp.task "build", [ "css", "js", "statics" ]

# Cleanup built files
gulp.task "clean", ->
  del config.clean.target, { force: true }

# Watch
gulp.task "watch", ->
  gulp.watch "./src/**/*", [ "build" ]

gulp.task "browserReload", ->
  browserSync.reload()

# LiveReload
gulp.task "browserSync", ["statics", "js", "css"], ->
  browserSync
    server:
      baseDir: config.browserSync.baseDir,
      index: config.browserSync.index
    reloadDelay: config.browserSync.reloadDelay
  gulp.watch [config.views.src, config.images.src], ["statics", "browserReload"], ->
  gulp.watch config.scripts.src, ["js", "browserReload"], ->
  gulp.watch config.styles.src, ["css", "browserReload"], ->

# Default entry point
gulp.task "default", [ "build", "deploy" ]
