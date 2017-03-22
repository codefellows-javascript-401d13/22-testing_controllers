'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay'); //eslint-disable-line

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('initial properties', () => {
    it('title property should be Welcome to Cowtown, Pardner!', () => {
      expect(this.cowsayCtrl.title).toBe('Wecome to Cowtown, Pardner!');
    });

    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });
  });
});
