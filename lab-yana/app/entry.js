'use strict';

require('./scss/core.scss');

const cowsay = require('cowsay-browser');
const angular = require('angular');

const mooApp = angular.module('mooApp', []);

mooApp.controller('MooController', ['$log', MooController]);

function MooController($log) {
  $log.debug('MooController');

  this.title = 'Wisdom of the Cow';
  this.name = 'cowabunga.io';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = this.cowfiles[7];
  });

  this.update = function(input) {
    $log.debug('MooCtrl.update');
    return cowsay.say({ text: input || 'MOOOOOO!!!!!', f: this.current });
  };

  this.speak = function(input) {
    $log.debug('MooCtrl.speak');
    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function() {
    $log.debug('MooCtrl.undo');
    this.history.pop();
    this.spoken = this.history.pop();
  };
}

mooApp.controller('NavController', ['$log', NavController]);

function NavController($log) {
  $log.debug('NavController');

  this.routes = [
    {
      name: 'home',
      url: '/home'
    },
    {
      name: 'about',
      url: '/aboutus'
    },
    {
      name: 'contact',
      url: '/contactus'
    }
  ];
}
