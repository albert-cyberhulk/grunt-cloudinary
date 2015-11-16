/*
 * grunt-cloudinary
 * https://github.com/albert-cyberhulk/grunt-cloudinary
 *
 * Copyright (c) 2015 Albert Cyberhulk
 * Licensed under the MIT license.
 */

// Requiring cloudinary as a node module
var cloudinary = require('cloudinary');

// Exporting Grunt module
module.exports = function (grunt) {
  // Registering module as a multitask
  grunt.registerMultiTask('cloudinary', 'Upload images to Cloudinary', function () {
    // Configuring the cloudinary by options
    cloudinary.config(this.options());
    var done = this.async();
    this.filesSrc.forEach(function (imgSrc) {
      console.log(imgSrc);
      done();
    });
  });
};
