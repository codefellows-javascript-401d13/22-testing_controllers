![cf](https://i.imgur.com/7v5ASc8.png) Lab 22 - Testing Angular Controllers
======

## To Submit this Assignment
  * create a new branch and work off of the same fork that you made on Monday
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Include
  * `.eslintrc`
  * `.babelrc`
  * `.gitignore`
  * `package.json`
    * create an npm `watch` script for running `webpack-dev-server --inline --hot`
    * create an npm `lint` script for linting your JS with `eslint`
    * create an npm `test` script for running karma and all associated tests
    * create an npm `test-watch` script for running karma on file system changes
  * **ignore the build directory**
  * `webpack.config.js`
  * `karma.config.js`

## Description
  * Use the `karma init karma.conf.js` CLI tool to generate a new karma configuration file
    * *include this file in your assignment submission*
  * Write a test that checks for default properties set by your controller(s)
  * Write a series of tests that check your controller methods for expected functionality

## Bonus
  * **2pts:** Create a series of `scss` partials for your `_base` styles, `_reset` stylesheet, and `_main` styles
    * these should be imported (`@import`) into a `core.scss` file that will be compiled into a stylesheet for your application
