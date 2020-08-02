const gulp = require('gulp')
const ts = require('gulp-typescript')
const del = require('del')
const merge = require('merge2')

const tsProject = ts.createProject('tsconfig.build.json')

function clean() {
  return del(['./dist'])
}

function buildTS() {
  const tsResult = tsProject.src().pipe(tsProject())
  return merge([
    gulp.src('./src/**/*.module.css').pipe(gulp.dest('dist')),
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist')),
  ])
}

const bulid = gulp.series([clean, buildTS])

exports.default = bulid
