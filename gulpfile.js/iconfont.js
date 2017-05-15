const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const timestamp = Math.round(Date.now() / 1000);

//generate icon font from svg files
gulp.task('iconfont', () => {
    let fsiconfont = gulp.src('src/assets/_icons/*.svg')
        .pipe(imagemin())
        .pipe(iconfont({
            normalize: true,
            fontHeight: 1000,
            descent: 64,
            fontName: 'Catif',
            metadata: 'A Catenology Icon Font',
            appendCodepoints: true,
            fontPath: 'fonts',
            formats: ['ttf', 'eot', 'woff', 'svg'],
            timestamp: timestamp
        }))
        //generate _icons.scss
        .on('glyphs', (glyphs) => {
            let options = {
                fontName: 'Catif',
                fontPath: 'fonts/',
                className: 'catif',
                timestamp: timestamp,
                glyphs: glyphs.map(function(glyph) {
                    return {
                        codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
                        name: glyph.name
                    }
                })
            };
            glyphs.forEach((glyph, idx, arr) => {
                arr[idx].glyph = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
            });
            gulp.src('src/assets/_icons/_template.scss')
                .pipe(consolidate('lodash', options))
                .pipe(rename('_iconfont.scss'))
                .pipe(gulp.dest('src/_sass/minty/partials/'));
        })
        .pipe(gulp.dest('src/assets/fonts'));
    return fsiconfont;
});
