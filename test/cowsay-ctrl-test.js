'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('starting properties', () => {
    it('title should be "Welcome to Cowville"', () => {
      expect(this.cowsayCtrl.title).toBe('Welcome to Cowville');
    });
    it('history should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });
    it('cowfiles should be populated', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
      });
    });
    it('current should be the first cowfile in the array', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.current).toEqual(list[0]);
      });
    });
  });
  describe('#update', () => {
    it('should return a cow that says "testing"', () => {
      let expected = cowsay.say({text:'testing', f: this.cowsayCtrl.current});
      let result = this.cowsayCtrl.update('testing');
      expect(result).toEqual(expected);
    });
  });
  describe('#speak', () => {
    it('should expect spoken and history to equal a cowsay "testing"', () => {
      let expected = cowsay.say({text:'testing', f: this.cowsayCtrl.current});
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });
  describe('#undo', () => {
    it('should pop off the second "speak" call, and return the first call', () => {
      let expected = cowsay.say({text:'testing', f: this.cowsayCtrl.current});
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('testing to be popped off');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
    });
  });
});
