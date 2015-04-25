// var filterCoffeeScript = require('broccoli-coffee')
// var filterTemplates = require('broccoli-template')
var uglifyJavaScript = require('broccoli-uglify-js')
var compileES6 = require('broccoli-es6-concatenator')
var compileSass = require('broccoli-sass')
var pickFiles = require('broccoli-static-compiler')
var mergeTrees = require('broccoli-merge-trees')
var findBowerTrees = require('broccoli-bower')
var env = require('broccoli-env').getEnv()
var assetRev = require('broccoli-asset-rev');

console.log('Starting...');

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
var jsFiles = pickFiles('assets/javascripts', {
  srcDir: '/',
  files: ["*.js"],
  destDir: '/assets'
})
// sourceTrees = jsFiles.concat(findBowerTrees())

// merge array into tree
// var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })

// Transpile ES6 modules and concatenate them,
// recursively including modules referenced by import statements.
// var appJs = compileES6(appAndDependencies, {
//   // Prepend contents of vendor/loader.js
//   // loaderFile: 'loader.js',
//   inputFiles: [
//     '*.js'
//   ],
//   legacyFilesToAppend: [
//     'jquery.js'
//   ],
//   wrapInEval: env !== 'production',
//   outputFile: '/assets/app.min.js'
// })
// console.log(appCss);
// if (env === 'production') {
//   // minify js
//   appJs = uglifyJavaScript(appJs, {
//     // mangle: false,
//     // compress: false
//   })
// }


// compile sass
var appCss = compileSass(['assets/stylesheets'], 'app.scss', 'assets/app.css')

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

var tree = mergeTrees( [jsFiles, appCss, imageFiles, publicFiles], { overwrite: true })
// var tree = [jsFiles, appCss, imageFiles, publicFiles]

tree = assetRev(tree, {
  extensions: ['js', 'css', 'png', 'jpg', 'gif'],
  // exclude: ['fonts/169929'],
  replaceExtensions: ['html', 'js', 'css'],
  // prepend: 'https://subdomain.cloudfront.net/'
  generateRailsManifest: true
});

// merge js, css and public file trees, and export the
// module.exports = mergeTrees( [tree['inputTree']], { overwrite: true })
module.exports = tree

