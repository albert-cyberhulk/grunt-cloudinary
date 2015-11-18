# grunt-cloudinary

> Uploads specified static files to cloudinary

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cloudinary --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cloudinary');
```

## The 'cloudinary' task

### Overview
In your project's Gruntfile, add a section named `cloudinary` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cloudinary: {
      // Options for cloudinary
      options: {
        remove: true, // removes files after uploading // to be done in next releases
        replace: true, // replaces references of initial files with cloud ones // to be done in next releases
        credentials: { // cloudinary credentials
          'api_key': 'yourapikeyhere',
          'api_secret': 'yourapisecrethere',
          'cloud_name': 'yourcloudnamehere'
        }
      },
      // source files to be processed
      src: {
        expand: true,
        cwd: 'yourfolderpathhere', //
        src: [ // map to static files in project
          'styles/**/*.css', 'scripts/**/*.js', 'images/**/*.png'
        ]
      }
    }
});
```

### Options

#### options.remove
Type: `Boolean`
Default value: `false`

A Boolean value that is used remove the src files after upload (to be done...).

#### options.replace
Type: `Boolean`
Default value: `false`

A Boolean value that is used to replace all occurences in project files (to be done...).

### Usage Examples

#### Default Options
In this example, the default options are used to upload files to cloudinary

```js
grunt.initConfig({
  cloudinary: {
    options: {},
    src: [ // map to static files in project
      'styles/**/*.css', 'scripts/**/*.js', 'images/**/*.png'
    ]
  },
});
```

#### Custom Options
In this example, custom options are used to replace and remove occurences

```js
grunt.initConfig({
  cloudinary: {
    options: {
      replace: true,
      remove: true
    },
    src: [ // map to static files in project
      'styles/**/*.css', 'scripts/**/*.js', 'images/**/*.png'
    ]
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_Version: 0.2.0_
