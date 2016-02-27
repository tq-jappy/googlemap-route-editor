src = "./src"
dest = "./build"

module.exports =
  clean:
    target: [dest]
  scripts:
    src: "#{src}/js/**/*"
    dest: "#{dest}/js"
  styles:
    src: "#{src}/css/**/*"
    dest: "#{dest}/css"
  views:
    src: "#{src}/**/*.html"
    dest: dest
  images:
    src: "#{src}/img/**/*"
    dest: dest
  browserSync:
    baseDir: dest
    index: "index.html"
    reloadDelay: 3000
