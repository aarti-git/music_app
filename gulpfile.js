function defaultTask() {
    var sass = require('gulp-sass');
    var gulp = require("gulp");

    gulp.task("scss", async function () {
        gulp.watch('css/*.scss', async function compile_scss(){
            gulp
                .src("css/index.scss")
                .pipe(sass({
                    // outputStyle: "compressed"
                    outputStyle: "expanded"
                }))
                // .pipe('mystyle.css')
                .pipe(gulp.dest("css"));
        })
    });
}

exports.default = defaultTask()

// command :  gulp scss