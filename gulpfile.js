/* eslint-disable */
// модуль для сборки спрайта
const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const config = {
  shape: {
    dimension: {
      // Set maximum dimensions
      maxWidth: 128,
      maxHeight: 128
    },
    spacing: {
      // Add padding
      padding: 0
    }
  },
  mode: {
    css: {
      // Activate the «css» mode
      render: {
        css: true // Activate CSS output (with default options)
      }
    },
    symbol: {
      dest: '.'
    }
  },
  symbol: true
}

gulp.task('svg-sprite', function () {
  return (
    gulp
      .src('./svgseparate/*.svg', { cwd: '' })
      // minify svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      // remove all fill, style and stroke declarations in out shapes
      .pipe(
        cheerio({
          run: function ($) {
            $('[fill]').removeAttr('fill')
            $('[stroke]').removeAttr('stroke')
            $('[style]').removeAttr('style')
          },
          parserOptions: { xmlMode: true }
        })
      )
      // cheerio plugin create unnecessary string '&gt;', so replace it.
      .pipe(replace('&gt;', '>'))
      // build svg sprite
      .pipe(svgSprite(config))
      .pipe(gulp.dest('sprites'))
  )
})
