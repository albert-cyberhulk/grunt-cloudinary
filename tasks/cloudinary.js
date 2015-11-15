/*
 * grunt-cloudinary
 * https://github.com/albert-cyberhulk/grunt-cloudinary
 *
 * Copyright (c) 2015 Albert Cyberhulk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cloudinary', 'Uploads specified static files to cloudinary', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};

/*
'use strict';

var cloudinary = require('cloudinary');



module.exports = function (grunt) {
//
    grunt.registerMultiTask('cloudinary', 'Upload images to Cloudinary', function () {

        cloudinary.config(this.options());
        var done = this.async();
        cloudinary.api.resources(function (result) {
            console.log(result);
        });

        var data = [];

        this.filesSrc.forEach(function (imgSrc) {

            cloudinary.uploader.upload(imgSrc, function (result) {
                data[imgSrc] = result.url;
                //console.log(result.url);
                grunt.log.writeln('Uploading ' + result.url);
            }, {public_id: imgSrc});

        });
    });
};
*/
