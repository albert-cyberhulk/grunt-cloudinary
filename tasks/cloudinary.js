/*
 * grunt-cloudinary
 * https://github.com/albert-cyberhulk/grunt-cloudinary
 *
 * Copyright (c) 2015 Albert Cyberhulk
 * Licensed under the MIT license.
 */

 var cloudinary = require('cloudinary');

module.exports = function (grunt) {
  grunt.registerMultiTask('cloudinary', 'Upload images to Cloudinary', function () {



    cloudinary.config(this.options());
    console.log(this.options());
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
