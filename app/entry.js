'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

const mooMooApp = angular.module('mooMooApp', []);

mooMooApp.controller('CowsayController', ['$log', CowsayController]);

function CowsayController($log) {
  $log.debug('CowsayController');

  this.title = 'Cow Creator';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = cowfiles[0];
  });

  this.update = function(input) {
    $log.debug('cowsayCtrl.update');
    return cowsay.say({ text: input || 'cowcontrol.io', f: this.current });
  };

  this.speak = function(input) {
    $log.debug('cowsayCtrl.update');

    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function() {
    $log.debug('cowsayCtrl.undo');

    this.history.pop();
    this.spoken = this.history.pop() || '';
  };
}

mooMooApp.controller('NavController', ['$log', NavController]);

function NavController($log) {
  $log.debug('NavController');

  this.routes = [
    {
      name: 'Home',
      url: '/home'
    },
    {
      name: 'Cow Creator',
      url: '/cow-creator'
    },
    {
      name: 'Account',
      url: '/account'
    }
  ];
}
