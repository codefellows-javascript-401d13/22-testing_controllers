'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', () => {
  beforeEach( () => {
    angular.mock.module('mooMooApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });

    describe('initial properties', () => {
      it('title should be cowcreator.io', () => {
        expect(this.cowsayCtrl.title).toBe('cowcreator.io');
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
  });
});
