var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('styles', function(){
     return sass('scss/**/*.scss', {style:'compressed'})
      .pipe(gulp.dest('www/css/'));
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);
