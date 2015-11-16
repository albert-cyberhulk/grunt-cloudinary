/*
 * grunt-cloudinary
 * https://github.com/albert-cyberhulk/grunt-cloudinary
 *
 * Copyright (c) 2015 Albert Cyberhulk
 * Licensed under the MIT license.
 */

// Requiring path module
var path = require('path');
// Requiring async module
var async = require('async');
// Requiring cloudinary as a node module
var cloudinary = require('cloudinary');
// Requiring underscore module
var _ = require('underscore');
// Exporting Grunt module
module.exports = function (grunt) {

  function notifyForceContinue(msg) {
    grunt.fail.warn(msg);
  }

  // Registering module as a multitask
  grunt.registerMultiTask('cloudinary', 'Upload images to Cloudinary', function () {
    var done = this.async();
    var options = this.options({
      remove: true, // removes files after uploading
      replace: true, // replaces references of initial files with cloud ones
    });
    if (this.files.length < 1) {
      notifyForceContinue('Destination not written because no source files were provided.');
    }
    if (_.isEmpty(this.options().credentials)) {
      notifyForceContinue("Cloudinary credentials are not specified");
    }
    cloudinary.config(options.credentials);
    done();
    this.filesSrc.forEach(function (imgSrc) {
      console.log("Image source", imgSrc);
      done();
    });
  });
};
