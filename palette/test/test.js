var assert = require('assert');
var obj = require('./functions.js');

describe('Array', function() {
  describe('simple test', function() {
    it('expected array from [0, 0] to [1, 1]', function() {
        assert.deepEqual(obj.calcStraightLine([0, 0], [1, 1]), [ [ 0, 0 ], [ 1, 1 ] ]);
    });
  });

  describe('horizontal line', function() {
    it('expected array from [0, 0] to [3, 0]', function() {
        assert.deepEqual(obj.calcStraightLine([0, 0], [3, 0]), [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ]);
    });
  });

  describe('vertical line', function() {
    it('expected array from [0, 0] to [0, 3]', function() {
        assert.deepEqual(obj.calcStraightLine([0, 0], [0, 3]), [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ]);
    });
  });

  describe('diagonal line', function() {
    it('expected array from [0, 0] to [3, 3]', function() {
        assert.deepEqual(obj.calcStraightLine([0, 0], [3, 3]), [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ]);
    });
  });

  describe('reverse diagonal line', function() {
    it('expected array from [3, 3] to [0, 0]', function() {
        assert.deepEqual(obj.calcStraightLine([3, 3], [0, 0]), [ [ 3, 3 ], [ 2, 2 ], [ 1, 1 ], [ 0, 0 ] ]);
    });
  });
});