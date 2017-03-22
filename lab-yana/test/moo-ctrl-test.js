'use strict';

require('./lib/test-setup.js');

const cowsay = require('cowsay-browser');
const angular = require('angular');

describe('Moo Controller', function() {
  beforeEach(() => {
    angular.mock.module('mooApp');
    angular.mock.inject($controller => {
      this.mooCtrl = new $controller('MooController');
    });
  });

  describe('initial properties', () => {
    it('title property should equal to Wisdom of the Cow', () => {
      expect(this.mooCtrl.title).toBe('Wisdom of the Cow');
    });
    it('name property should equal to cowabunga.io', () => {
      expect(this.mooCtrl.name).toBe('cowabunga.io');
    });
    it('history property should be an empty array', () => {
      expect(Array.isArray(this.mooCtrl.history)).toBe(true);
      expect(this.mooCtrl.history.length).toEqual(0);
    });
    it('cowfiles property should be a list of all cowfiles', () => {
      cowsay.list((err, list) => {
        expect(this.mooCtrl.cowfiles).toEqual(list);
        expect(this.mooCtrl.current).toEqual(list[7]);
      });
    });
  });
  describe('#update', () => {
    it('should return test string', () => {
      let expected = cowsay.say({ text: 'test string', f: this.mooCtrl.current });
      let result = this.mooCtrl.update('test string');
      expect(result).toEqual(expected);
    });
  });
  describe('#speak', () => {
    it('should return test string', () => {
      let expected = cowsay.say({ text: 'test string', f: this.mooCtrl.current });
      this.mooCtrl.speak('test string');
      expect(this.mooCtrl.spoken).toEqual(expected);
      expect(this.mooCtrl.history[0]).toEqual(expected);
      expect(this.mooCtrl.history.length).toEqual(1);
    });
  });
  describe('#undo', () => {
    it('should return test string', () => {
      let expected = cowsay.say({ text: 'test string', f: this.mooCtrl.current });
      this.mooCtrl.speak('test string');
      this.mooCtrl.speak('a second test string');
      expect(this.mooCtrl.history.length).toEqual(2);
      this.mooCtrl.undo();
      expect(this.mooCtrl.history.length).toEqual(0);
      expect(this.mooCtrl.spoken).toEqual(expected);
    });
  });
});

describe('Nav Controller', function() {
  beforeEach(() => {
    angular.mock.module('mooApp');
    angular.mock.inject($controller => {
      this.navCtrl = new $controller('NavController');
    });
  });
  describe('initial properties', () => {
    it('routes property should be an array', () => {
      expect(Array.isArray(this.navCtrl.routes)).toBe(true);
    });
    it('routes[0] should have a name of home and a url of /home', () => {
      expect(this.navCtrl.routes[0].name).toEqual('home');
      expect(this.navCtrl.routes[0].url).toEqual('/home');
    });
    it('routes[1] should have a name of home and a url of /home', () => {
      expect(this.navCtrl.routes[1].name).toEqual('about');
      expect(this.navCtrl.routes[1].url).toEqual('/aboutus');
    });
    it('routes[2] should have a name of home and a url of /home', () => {
      expect(this.navCtrl.routes[2].name).toEqual('contact');
      expect(this.navCtrl.routes[2].url).toEqual('/contactus');
    });
  });
});
