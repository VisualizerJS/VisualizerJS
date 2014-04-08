var assert = require('assert');
var core = require('../src/core.js');
var mock_ctx; 

describe('Core', function(){
  beforeEach(function(){
    mock_ctx = {vis: [function(){}], current:0};
  });
  describe('.nextVis',function(){
    it('ctx.current should be 0 ',function(done){
      core.nextVis.call(mock_ctx);
      assert.deepEqual(mock_ctx.current,0);
      done();
    });
    it('ctx.current should be 1',function(done){
      core.addEffect.call(mock_ctx,function(){});
      core.nextVis.call(mock_ctx);
      assert.deepEqual(mock_ctx.current,1);
      done();
    });
  });
  describe('.addEffect',function(){
    it('should return false if not passed a function', function(done){
      var retval = core.addEffect.call(mock_ctx,'');
      assert.deepEqual(retval, false);
      done();
    });
    it('should add a new item to context.vis when passed a function.', function(done){
      core.addEffect.call(mock_ctx,function(){});
      assert.equal(mock_ctx.vis.length, 2);
      done();
    });
  });
});
