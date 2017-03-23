'use strict';

const angular = require('angular');
const cowsay = require('cowsay-browser');

require('./scss/core.scss');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', CowsayController]);
cowsayApp.controller('NavController', ['$log', NavController]);

function CowsayController($log) {
  this.history = [];
  this.spoken = '';
  this.title = 'cow creator';
  this.subTitle = 'make it, view it, undo it';
  this.spokenTitle = 'view it!';
  this.spokenSubTitle = 'check out the cow you just made!';

  this.speak = function(input) {
    $log.debug('speak');
    this.spoken = this.update(input);
    this.history.push(this.spoken);
    this.update(input);
  };

  this.update = function(input) {
    $log.debug('update');
    return cowsay.say({text: input || 'that\'s just like, your opinion, man', f: this.current });
  };

  this.undo = function() {
    $log.debug('undo');
    this.history.pop();
    this.spoken = this.history.pop() || '';
  };

  cowsay.list((err, list) => {
    this.cowfiles = list;
    this.current = this.cowfiles[8];
  });

}

function NavController($log) {
  $log.debug('NavController');
  this.title = 'cowcontrol.io';
  this.routes = [
    {
      name: 'home',
      url: '/home',
    },
    {
      name: 'cow creator',
      url: '/cowcreator'
    },
    {
      name: 'account',
      url: '/account'
    }
  ];
}