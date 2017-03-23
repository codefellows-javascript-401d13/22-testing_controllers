'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach( () => {
    angular.mock.module('mooMooApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
      this.navCtrl = new $controller('NavController');
    });
  });

  describe('initial properties', () => {
    it('title should be cowcreator.io', () => {
      expect(this.cowsayCtrl.title).toBe('Cow Creator');
    });

    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    it('list of cowfiles should show proper cowfiles', () => {
      cowsay.list((err, cowfiles) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(cowfiles);
      });
    });
  });

  describe('#update', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      let testResult = this.cowsayCtrl.update('testing');
      expect(testResult).toEqual(expected);
    });
  });

  describe('#speak', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current })
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(1);
    });
  });

  describe('#undo', () => {
    it('should modify our history array and return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('test control');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
});
