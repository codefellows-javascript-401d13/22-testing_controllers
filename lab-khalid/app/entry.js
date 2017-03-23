'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');

const
  angular = require('angular'),
  cowsay = require('cowsay-browser'),

  cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', CowsayController]);

function CowsayController($log){
  $log.debug('CowsayController');

  this.title = 'Welcome to Cowville';
  this.history = [];

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = this.cowfiles[0];
  });

  this.update = function(input){
    $log.debug('CowsayController.update()');
    
    return cowsay.say({ text: input || 'MOOOOOOOOOOOOO!' ,f: this.current });
  };

  this.speak = function(input) {
    $log.debug('CowsayController.speak()');

    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function(){
    $log.debug('CowsayController.undo()');

    this.history.pop();
    this.spoken = this.history.pop() || '';
  };
}

cowsayApp.controller('NavController', ['$log', NavController]);

function NavController($log) {
  $log.debug('NavController');

  this.routes = [
    {
      name: 'home',
      url: '/'
    },
    {
      name: 'about',
      url: '/about'
    },
    {
      name: 'contact',
      url: '/contact'
    }
  ];
}