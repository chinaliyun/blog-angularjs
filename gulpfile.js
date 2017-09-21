var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sync = require('gulp-sync-task');
var bs = require('browser-sync').create();
var fs = require('fs');

// gulp.plumber 编译出错时，不中断编译
var srcPath = 'app/src/';
var opt = 'app/output/';

var httpDevUrl = 'http://192.168.32.202:8077';
// var httpDevUrl = 'http://101.37.21.176:70';
// var httpDevUrl = 'http://118.31.211.56:8080';
// var httpTestUrl = 'http://101.37.21.176:70';
// var httpDistUrl = 'http://118.31.211.56:8080';

gulp.task('tagDev', function(cb){
    console.log('serverUrl will connect to '+httpDevUrl)
    sync.callback = cb;
})

gulp.task('tagTest', function(cb){
    console.log('serverUrl will connect to '+httpTestUrl)
    sync.callback = cb;
})
gulp.task('tagDist', function(cb){
    console.log('serverUrl will connect to '+httpDistUrl)
    sync.callback = cb;
})

gulp.task('lib', function (cb) {
    gulp.src(srcPath + 'libs/**/*')
        .pipe($.plumber())
        .pipe(gulp.dest(opt + 'libs/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
gulp.task('static', function (cb) {
    gulp.src(srcPath+'static')
        .pipe($.plumber())
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(opt + 'js/'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(opt + 'js/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('replaceDev', function (cb) {
    gulp.src([srcPath + 'components/global/dict/dict.constant.js'])
        .pipe($.replace(/serverUrl\ ?=\ ?'(.*)'/g, `serverUrl\ =\ '${httpDevUrl}\'`))
        .pipe(gulp.dest(srcPath + 'components/global/dict/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
gulp.task('replaceTest', function (cb) {
    gulp.src([srcPath + 'components/global/dict/dict.constant.js'])
        .pipe($.replace(/serverUrl\ ?=\ ?'(.*)'/g, `serverUrl\ =\ '${httpTestUrl}\'`))
        .pipe(gulp.dest(srcPath + 'components/global/dict/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
gulp.task('replaceDist', function (cb) {
    gulp.src([srcPath + 'components/global/dict/dict.constant.js'])
        .pipe($.replace(/serverUrl\ ?=\ ?'(.*)'/g, `serverUrl\ =\ '${httpDistUrl}\'`))
        .pipe(gulp.dest(srcPath + 'components/global/dict/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('replaceSource', function (cb) {
    fs.readFile('./app/output/index.html', 'utf-8', function (err, data) {
        if (err) throw err;
        data += '<script>console.log = function(){}</script>';
        data = data.replace(/(lib|index)\.js/g, '$1.min.js?' + new Date().getTime())
        data = data.replace(/(lib|index)\.css/g, '$1.min.css?' + new Date().getTime())
        fs.writeFile('./app/output/index.html', data, function (err) {
            if (err) throw err;
            sync.callback = cb;
        })
    })
})



gulp.task('html', function (cb) {
    gulp.src([srcPath + '/components/**/*.html', srcPath + '/index.html'])
        .pipe($.rename(function (path) {
            if (path.basename == 'index') {
                path.dirname = './';
            } else {
                path.dirname = './view';
            }
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(opt + '/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('json', function (cb) {
    gulp.src(srcPath + 'components/**/*.json')
        .pipe($.rename({
            dirname: ''
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(opt + '/data/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('img', function (cb) {
    gulp.src(srcPath + 'components/**/*.png')
        .pipe($.rename({
            dirname: ''
        }))
        .pipe($.plumber())
        .pipe(gulp.dest(opt + '/image/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('concatless', function (cb) {
    gulp.src(srcPath + 'components/**/*.less')
        .pipe($.concat('bundle.less'))
        .pipe(gulp.dest(srcPath + 'style/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
gulp.task('less', function (cb) {
    gulp.src(srcPath + 'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(opt + '/css/'))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(opt + '/css/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('js', function (cb) {
    gulp.src([srcPath + 'app.js', srcPath + 'components/**/*.js'])
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(opt + '/js/'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(opt + '/js/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('clean', function () {
    gulp.src([opt + '!(image)/'])
        .pipe($.clean())
})


gulp.task('server', function () {
    bs.init({
        server: opt,
        director: true,
        browser: 'google chrome',
        open: false,
        ui: false,
        files: [
            opt + '**/*.*'
        ]
    })

})
gulp.task('watch', function () {
    gulp.watch('bower_components/**/*.js', ['lib'])
    gulp.watch(srcPath + 'components/**/*.less', ['concatless'])
    gulp.watch(srcPath + '/style/*.less', ['less'])
    gulp.watch(srcPath + 'components/**/*.js', ['js'])
    gulp.watch([srcPath + 'components/**/*.html', srcPath + '/index.html'], function (e) {
        console.log(e.type, e.path)
        gulp.src(e.path)
            .pipe($.rename(function (path) {
                if (path.basename == 'index') {
                    path.dirname = './';
                } else {
                    path.dirname = './view';
                }
            }))
            .pipe(gulp.dest(opt + '/'))
    })
    gulp.watch(srcPath + 'components/**/*.json', function (e) {
        console.log(e.type, e.path)
        gulp.src(e.path)
            .pipe($.rename({
                dirname: ''
            }))
            .pipe($.plumber())
            .pipe(gulp.dest(opt + '/data/'))
    })
})

gulp.task('buildDist', sync('tagDist','lib', 'lib-js', 'replaceDist', 'js', 'concatless', 'less', 'html', 'json', 'img', 'replaceSource'))


gulp.task('buildTest', sync('tagTest','lib', 'lib-js', 'replaceTest', 'js', 'concatless', 'less', 'html', 'json', 'img', 'replaceSource'))


gulp.task('default', sync('clean', 'lib', 'lib-js', 'replaceDev', 'js', 'concatless', 'less', 'html', 'json', 'img', 'server', 'watch'))

/*

开发：
清空opt目录
没有要求的JS文件压缩到lib.js中
有要求的js文件夹整个目录复制到libs中


*/