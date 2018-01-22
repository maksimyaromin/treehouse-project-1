/*
    Gulpfile.js 
    Max Eremin
    22.01.2018 21:29 
*/

const gulp = require("gulp");
const server = require("gulp-webserver");

/* Lounch simple web server with livereload module on http://localhost:9000 
*/
gulp.task("server:start", () => {
    gulp.src(".")
        .pipe(server({
            livereload: true,
            open: true,
            port: 9000
        }));
});

/* Default gulp task. App was run when execute npm start (or just gulp) in console
*/
gulp.task("default", [ "server:start" ]);