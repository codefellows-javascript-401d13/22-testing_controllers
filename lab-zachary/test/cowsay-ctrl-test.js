'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function () {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });
  describe('Initial properties setup', () => {
    it('title should be set to cow creator', () => {
      expect(this.cowsayCtrl.title).toBe('cow creator');
    });
    it('subtitle should be set to make it, view it, undo it', () => {
      expect(this.cowsayCtrl.subTitle).toBe('make it, view it, undo it');
    });
    it('cowlist should equal results from cowsay.list()', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
      });
    });
    it('history should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });
  });
  describe('#update', () => {
    it('should return a cow', () => {
      let expected = cowsay.say({text: 'test string', f: this.cowsayCtrl.current});
      let result = this.cowsayCtrl.update('test string');
      expect(result).toEqual(expected);
    });
  });
  describe('#speak', () => {
    it('should return a cow', () => {
      let expected = cowsay.say({text: 'test string again', f: this.cowsayCtrl.current});
      this.cowsayCtrl.speak('test string again');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(1);
    });
  });
  describe('#undo', () => {
    it('should remove an item from history', () => {
      this.cowsayCtrl.speak('test');
      this.cowsayCtrl.speak('another test');
      let expected = cowsay.say({text: 'test', f:this.cowsayCtrl.current});
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
});

describe('Navigation Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.navControl = new $controller('NavController');
    });
  });
  describe('property tests', () => {
    it('should contain a title of cowcontrol.io', () => {
      expect(this.navControl.title).toEqual('cowcontrol.io');
    });
    it('should contain an array of nav items', () => {
      expect(this.navControl.routes.length).toEqual(3);
    });
  });
});
