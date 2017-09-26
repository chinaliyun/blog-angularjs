var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sync = require('gulp-sync-task');
var bs = require('browser-sync').create();
var fs = require('fs');


var jsPath = [
    'src/components/**/*.js',
    'src/common/**/*.js',
    'src/global/**/*.js',
    'src/model/**/*.js'
];
var jsonPath = 'src/model/**/*.json';
// gulp.plumber 编译出错时，不中断编译

var httpDevUrl = 'http://blogapi.com';
// var httpDevUrl = 'http://127.0.0.1:8888';
// var httpDevUrl = 'http://118.31.211.56:8080';
// var httpTestUrl = 'http://101.37.21.176:70';
// var httpDistUrl = 'http://118.31.211.56:8080';

var staticPath, postPath;

gulp.task('devInit', function (cb) {
    staticPath = '../static';
    postPath = httpDevUrl;
    sync.callback = cb;

})
gulp.task('testInit', function (cb) {
    staticPath = './static';
    postPath = httpTestUrl;
    sync.callback = cb;
})
gulp.task('distInit', function (cb) {
    staticPath = './static';
    postPath = httpDistUrl;
    sync.callback = cb;
})

gulp.task('clean', function (cb) {
    gulp.src('dist')
        .pipe($.clean())
    setTimeout(function () {
        sync.callback = cb;
    }, 500)
})
gulp.task('lib', function (cb) {
    console.log('当前使用的postUrl是： ' + postPath)
    console.log('当前static路径是： ' + staticPath)
    gulp.src('static/lib/**/*.*')
        .pipe($.plumber())
        .pipe(gulp.dest('dist/static/libs/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('index', function (cb) {
    gulp.src('src/index.html')
        .pipe($.replace(/{STATIC_PATH}/g, staticPath))
        .pipe($.replace(/{POST_PATH}/g, postPath))
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('html', function (cb) {
    gulp.src('src/components/**/*.html')
        .pipe($.rename({
            dirname: ''
        }))
        .pipe($.replace(/{STATIC_PATH}/g, staticPath))
        .pipe($.replace(/{POST_PATH}/g, postPath))
        .pipe(gulp.dest('dist/static/view/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
/*
    需要产生变量的有  图片路径  第三方库路径 接口前缀
    ../static/image/test.png
    ../static/lib/...

    ./static/image/test.png
    ./static/lib
    图片路径和第三放库路径都在static中
    html  
    html任务以及watch任务最后都执行一次replace任务，替换其中的图片路径以及接口前缀

    js 
    js任务concat之后执行一次replace任务，替换其中的图片路径以及接口前缀
*/
gulp.task('js', function (cb) {
    gulp.src(jsPath)
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe($.replace(/{STATIC_PATH}/g, staticPath))
        .pipe($.replace(/{POST_PATH}/g, postPath))
        .pipe(gulp.dest('dist/static/js/'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/js/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('lib-js', function (cb) {
    gulp.src([
        'static/js/angular.js',
        'static/js/angular-ui-router.js',
        'static/js/angular-cookies.js',
        'static/js/markdown.js',
        'static/js/md5.js',
    ])
        .pipe($.plumber())
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest('dist/static/js/'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/js/'))
        .on('end', function () {
            sync.callback = cb;
        })
})

gulp.task('concatless', function (cb) {
    gulp.src('src/components/**/*.less')
        .pipe($.plumber())
        .pipe($.concat('bundle.less'))
        .pipe(gulp.dest('src/style/'))
        .on('end', function () {
            sync.callback = cb;
        })
})
gulp.task('less', function (cb) {
    gulp.src('src/style/index.less')
        // 这里一定要记得先替换再less否则会报错
        .pipe($.plumber())
        .pipe($.replace(/{STATIC_PATH}/g, staticPath))
        .pipe($.less())
        .pipe(gulp.dest('dist/static/css/'))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/css/'))
        .on('end', function () {
            sync.callback = cb;
        })
})





gulp.task('json', function (cb) {
    gulp.src('src/components/**/*.json')
        .pipe($.rename({
            dirname: ''
        }))
        .pipe($.plumber())
        .pipe(gulp.dest('dist/data/'))
        .on('end', function () {
            sync.callback = cb;
        })
})




gulp.task('server', function () {
    bs.init({
        server: 'dist',
        director: true,
        browser: 'google chrome',
        open: false,
        ui: false,
        files: [
            'dist/**/*.*'
        ],
        rewriteRules: [
            {
                match: /\/\#\!(.*)$/g,
                fn: function (match) {
                    return 'index.html/#!$1';
                }
            }
        ]
    })

})
gulp.task('replaceUrl', function (cb) {
    fs.readFile('dist/index.html', 'utf-8', function (err, data) {
        if (err) throw err;
        data += '<script>console.log = function(){}</script>';
        data = data.replace(/(lib|index)\.js/g, '$1.min.js?' + new Date().getTime())
        data = data.replace(/(lib|index)\.css/g, '$1.min.css?' + new Date().getTime())
        fs.writeFile('dist/index.html', data, function (err) {
            if (err) throw err;
            sync.callback = cb;
        })
    })
})

gulp.task('watch', function () {
    gulp.watch('src/index.html', function (e) {
        console.log(e.type, e.path)
        gulp.src(e.path)
            .pipe($.replace(/{STATIC_PATH}/g, staticPath))
            .pipe($.replace(/{POST_PATH}/g, postPath))
            .pipe(gulp.dest('dist/'))
    })
    gulp.watch('src/components/**/*.html', function (e) {
        console.log(e.type, e.path)
        gulp.src(e.path)
            .pipe($.rename({
                dirname: ''
            }))
            .pipe($.replace(/{STATIC_PATH}/g, staticPath))
            .pipe($.replace(/{POST_PATH}/g, postPath))
            .pipe(gulp.dest('dist/static/view'))
    })
    gulp.watch('src/components/**/*.less', ['concatless'])
    gulp.watch('src/style/*.less', ['less'])
    gulp.watch(jsPath, ['js'])
    gulp.watch(jsonPath, function (e) {
        console.log(e.type, e.path)
        gulp.src(e.path)
            .pipe(gulp.dest('dist/data/json/'))
    })
})

gulp.task('dist', sync('distInit', 'clean', 'index', 'lib', 'html', 'js', 'lib-js', 'concatless', 'less', 'replaceUrl'))


gulp.task('test', sync('testInit', 'clean', 'index', 'lib', 'html', 'js', 'lib-js', 'concatless', 'less', 'replaceUrl'))


gulp.task('dev', sync('devInit', 'clean', 'index', 'lib', 'html', 'js', 'lib-js', 'concatless', 'less', 'json', 'server', 'watch'))

/*

开发：
清空dev目录,
没有要求的JS文件压缩到dev/static/js/lib.js中
有要求的js文件夹整个目录复制到dev/static/中
['components/*.js', 'common/*.js', 'globals/*.js', 'model/*.js']        'dev/static/js/index.js'
['components/*.html', 'common/*.html']         'dev/static/view/'
index.html复制到 dev/index.html中
script src='./static/js/lib.js'
script src='./static/js/index.js'
link src='./static'

开发中还要把图片和lib类js复制到另一个目录中 太不方便，所以把static目录放在外层，index.html可以直接引用， 生产的时候再编译static到对应目录
开发的时候使用外层的static目录  build的时候把static放进dist中    要把index.html中
build：
inedx.html    dist/index.html
static/       dist/static

开发时
    static中需要执行的任务有：
        普通js合并压缩
        lib直接复制
        image 直接复制
*/