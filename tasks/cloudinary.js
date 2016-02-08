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
module.exports = function(grunt) {

  // Registering module as a multitask
  grunt.registerMultiTask('cloudinary', 'Upload images to Cloudinary', function() {
    this.finishExecution = this.async();
    var that = this;

    function notifyForceContinue(msg) {
      grunt.fail.warn(msg);
    }

    function removeOriginal() {

    }

    function findAndReplace(replaceDir, toBeReplaced, replacement) {
      grunt.file.recurse(replaceDir, function(abspath, rootdir, subdir, filename) {
        var content = grunt.file.read(abspath);
        if (filename !== toBeReplaced) {
          if (content.indexOf(toBeReplaced) !== -1) {
            var newContent = content.replace(toBeReplaced, replacement);
            grunt.file.write(abspath, newContent);
            console.log("Replaced occurencies of " + toBeReplaced + " in file " + filename + " : " + replacement);
          }
        }
      });

    }

    function replaceOcurrencies(curArray, replace, replaceDir) {
      var curLimit = curArray.length;
      if (!replace) {
        this.finishExecution(true);
        return false;
      }
      _.each(curArray, function(el, index, list) {
        this.findAndReplace(replaceDir, el.fileName, el.fileUrl);
        if (index === curLimit - 1) {
          this.finishExecution(true);
        }
      }.bind(this));
    }
    this.curResourceType = "raw";
    this.notifyForceContinue = notifyForceContinue;
    this.replaceOcurrencies = replaceOcurrencies;
    this.findAndReplace = findAndReplace;
    this.removeOriginal = removeOriginal;
    this.fileStack = [];
    this.resourceType = {
      "resource_type": this.curResourceType,
    };
    var options = this.options({
      replace: false, // replaces originals with uploaded ones // default false
      dir: '' // path where the occurencies should be replaced
    });
    if (this.files.length < 1) {
      this.notifyForceContinue('Destination not written because no source files were provided.');
    }
    // Checking if credenrials are empty
    if (_.isEmpty(this.options().credentials)) {
      this.notifyForceContinue("Cloudinary credentials are not specified");
    }
    // Check if replace should be triggered and replaceDir is mentioned
    if (!(options.replace &&
        options.dir !== '' &&
        grunt.file.isDir(options.dir))) {
      this.notifyForceContinue("Replace option without Replacdir is not a valid operation");
    }
    // Configuring cloudinary
    cloudinary.config(options.credentials);
    // Looping through source files and processing them
    this.files.forEach(function(file) {
      var contents = file.src.filter(function(filepath) {
        // Remove nonexistent files (it's up to you to filter or warn here).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          this.notifyForceContinue(filepath + " does not exist in the system");
        }
        if (filepath.match(/\.(jpg|jpeg|ico|JPEG|png|gif)$/)) {
          this.curResourceType = 'image';
        } else {
          this.curResourceType = 'raw';
        }
        this.resourceType = {
          "resource_type": this.curResourceType,
        };
        try {
          cloudinary.uploader.upload(filepath, // filepath on local system
            function(result, error) {
              if (error) {
                this.notifyForceContinue(error.code);
              }
              console.log("File " + filepath + " uploaded to " + result.url);
              this.fileStack.push({
                filePath: filepath,
                fileName: filepath.replace(options.dir, ''),
                fileUrl: result.url,
              });
              if (this.filesSrc.length === this.fileStack.length) {
                this.replaceOcurrencies(this.fileStack, options.replace, options.dir);
              }
            }.bind(this), this.resourceType);
        } catch (ex) {
          this.notifyForceContinue(ex);
        }
      }.bind(this)); // end of map
    }.bind(this)); // END of foreach

  }); // END OF registerMultiTask

}; // end of module exports
