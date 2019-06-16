var gulp=require('gulp'),  //gulp基础库
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename');   //文件重命名

gulp.task('default',function(){
    return gulp.src(["src/WebDanmu.js", "src/WebDanmuPainter.js"])  //选择合并的JS
        .pipe(concat('webdanmu.js'))   //合并js
        .pipe(gulp.dest('dist/'))         //输出
        .pipe(rename({suffix:'.min'}))     //重命名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('dist/'));            //输出
});
