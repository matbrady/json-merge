'use strict';
var assert = require('assert');
var jsonMerge = require('./json-merge');

suite('Test Cases', function () {

  test('should return object', function () {
    assert.strictEqual(typeof jsonMerge(), "object");
    assert.strictEqual(typeof jsonMerge('./test/json/*'), "object");
  });

  test('should strip comments', function () {
    assert.notEqual(jsonMerge('./test/json/*'), '{/* Comment */\n"one":{"id":"1","name":"one"},"two":{"id":"2","name":"two"}}');
  });

  test('show create object based on file name', function() {
    var data = jsonMerge('./test/json/*');

    assert.strictEqual(typeof data.one, "object");
    assert.strictEqual(typeof data.car, "undefined");
    assert.strictEqual(typeof data.item_three, "object");
    assert.strictEqual(typeof jsonMerge('./test/json/*', {nameType: false})["item space"], "object");
  });
});