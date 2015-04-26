// var filterCoffeeScript = require('broccoli-coffee')
// var filterTemplates = require('broccoli-template')
var uglifyJavaScript = require('broccoli-uglify-js')
var concat = require('broccoli-concat')
// var esTranspiler = require('broccoli-babel-transpiler');
var compileSass = require('broccoli-sass')
var pickFiles = require('broccoli-static-compiler')
var mergeTrees = require('broccoli-merge-trees')
// var findBowerTrees = require('broccoli-bower')
var env = require('broccoli-env').getEnv()
var assetRev = require('broccoli-asset-rev');
var instrument = require('broccoli-debug').instrument;
// var browserify = require('broccoli-browserify');
var fastBrowserify = require('broccoli-fast-browserify');
var es6ify = require('es6ify');

// function preprocess (tree) {
//   // filter .hbs and .handlebar files, use the Ember handlebar compiler
//   tree = filterTemplates(tree, {
//     extensions: ['hbs', 'handlebars'],
//     compileFunction: 'Ember.Handlebars.compile'
//   })

//   // compile coffee script, bare: no top-level function wrapper
//   tree = filterCoffeeScript(tree, {
//     bare: true
//   })
//   return tree
// }

// create tree for files in the app folder

// app = preprocess(app)

// create tree for files in the styles folder
// var styles = 'assets'
// styles = pickFiles('/assets', {
//   srcDir: '/stylesheets',
//   files: ["*.scss"],
//   destDir: '/build'
// })
// styles = preprocess(styles)

// create tree for files in the test folder
// var tests = 'tests'
// tests = pickFiles(tests, {
//   srcDir: '/',
//   destDir: 'appkit/tests' // move under appkit namespace
// })
// tests = preprocess(tests)

// create tree for vendor folder (no filters needed here)
// var vendor = 'bower_components'

// include app, styles and vendor trees
// var sourceTrees = [styles, js]

// include tests if in production
// if (env !== 'production') {
//   sourceTrees.push(tests)
// }

// Add bower dependencies
// findBowerTrees uses heuristics to pick the lib directory and/or main files,
// and returns an array of trees for each bower package found.
// browserPolyfillFiles = pickFiles('node_modules/babel-es6-polyfill', {
//   srcDir: '/',
//   files: ["*.js"],
//   destDir: '/assets'
// });

// browserPolyfillFiles = browserify(browserPolyfillFiles);

var jsFiles = pickFiles('assets/javascripts', {
  srcDir: '/',
  files: ["*.js"],
  destDir: '/assets'
});



jsFiles = instrument.print(jsFiles);

// jsFiles = concat(jsFiles, {
//   inputFiles: ["**/*.js"],
//   outputFile: '/assets/app.js'
// });

bowerFiles = pickFiles('bower_components/jquery/dist', {
  srcDir: '/',
  files: ["*"],
  destDir: '/assets/vendor'
});

// if (env === 'production') {
//   // minify js
//   appJs = uglifyJavaScript(appJs, {
//     // mangle: false,
//     // compress: false
//   })
// }

// var jsFiles = new esTranspiler(jsFiles, {

// });

// jsFiles = instrument.print(jsFiles);


// jsFiles = browserify(jsFiles, {
//   outputFile: '/assets/main.js',
//   entries: ['./assets/main.js']
// });

var jsFiles = fastBrowserify(jsFiles, {
  bundles: {
    "assets/app.js": {
      transform: es6ify,
      entryPoints: [es6ify.runtime, 'assets/app.js']
    }
  }
});


jsFiles = instrument.print(jsFiles);

// compile sass
var appCss = compileSass(['assets/stylesheets'], 'app.scss', 'assets/app.css');

// create tree for public folder (no filters needed here)
var imageFiles = pickFiles('assets/images', {
  srcDir: '/',
  files: ['**/*.jpg'],
  destDir: 'assets'
})

var publicFiles = pickFiles('public', {
  srcDir: '.',
  destDir: '.'
});

var tree = mergeTrees( [ bowerFiles, jsFiles, appCss, imageFiles, publicFiles], { overwrite: true })
// var tree = [jsFiles, appCss, imageFiles, publicFiles]

// tree = assetRev(tree, {
//   extensions: ['js', 'css', 'png', 'jpg', 'gif'],
//   // exclude: ['fonts/169929'],
//   replaceExtensions: ['html', 'js', 'css'],
//   // prepend: 'https://subdomain.cloudfront.net/'
//   generateRailsManifest: true
// });

tree = instrument.print(tree);


// merge js, css and public file trees, and export the
// module.exports = mergeTrees( [tree['inputTree']], { overwrite: true })
module.exports = tree

