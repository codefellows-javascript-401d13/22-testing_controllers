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

  describe('initial properties', () => {
    it('should show that title property is equal to Welcome to the farm', () => {
      expect(this.cowsayCtrl.title).toBe('Welcome to the Farm!');
    });

    it('should be a list of cowfiles showing proper cowfiles', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.current).toEqual(list[0]);
      });
    });

    it('should show that history is an array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

  });

  describe('#update', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current});
      let result = this.cowsayCtrl.update('testing');
      expect(result).toEqual(expected);
    });
    // TODO: this test is not working I need to pass no text to cow
    // it('should output the default cow text', () => {
    //   let expected = cowsay.say({ f: this.cowsayCtrl.current });
    //   let result = 'mooo bitches';
    //   expect(result).toEqual(expected);
    // });
  });

  describe('#speak', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current});
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });

    it('should return a populated array', () => {
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.history.length).toBeGreaterThan(0);
    })
  });

  describe('#undo', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current});
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('testing again');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
});
