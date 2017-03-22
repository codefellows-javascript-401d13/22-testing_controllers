'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

// Create the entire app
const cowsayApp = angular.module('cowsayApp', []);

// Create and name the CowsayController
cowsayApp.controller('CowsayController', ['$log', CowsayController]);

// Define the CowsayController constructor
function CowsayController($log) {
  // Debug
  $log.debug('CowsayController');

  // Properties
  this.title = 'Welcome to Cowville!';
  this.history = [];

  // History Stack
  cowsay.list( (err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = cowfiles[0];
  });

  // Update message
  this.update = function(input) {
    $log.debug('cowsayCtrl.update()');
    return cowsay.say({ text: input || 'moooooooo', f: this.current });
  };

  // Make the cow say the thing
  this.speak = function(input) {
    $log.debug('cowsayCtrl.speak()');

    // Update message
    this.spoken = this.update(input);

    // Add this message to the history stack
    this.history.push(this.spoken);
  };

  // Undo last message
  this.undo = function() {
    $log.debug('cowsayCtrl.undo()');

    // Remove from history
    this.history.pop();
    this.spoken = this.history.pop() || '';
  };
};

cowsayApp.controller('NavController', ['$log', NavController]);

// Define the NavController constructor
function NavController($log) {
  $log.debug('NavController');

  // routes for nav bar elements
  this.routes = [
    {
      name: 'home',
      url: '/home'
    },
    {
      name: 'about',
      url: '/about-us'
    },
    {
      name: 'contact',
      url: '/contact-us'
    }
  ];
};
