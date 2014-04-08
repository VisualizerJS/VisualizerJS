(function(module){
  var utils = require('./utils');
  var start = module.exports.start = function(){
    var next = this.nextVis.bind(this);
    this.canvas.addEventListener('click', next);
    this.draw.call(this);
  };
  var addEffect = module.exports.addEffect = function(fn){
    if(utils.isFunction(fn)){
      this.vis.push(fn);
    }else{
      return false;
    }
  };
  var draw = module.exports.draw = function(){
    var cur_vis = this.vis[this.current].bind({});
    var boundDraw = this.draw.bind(this);
    cur_vis(this.pub.ctx,this.pub.dataStream);
    this.timer = requestAnimationFrame(boundDraw);

  };
  var nextVis= module.exports.nextVis = function(){
    this.current += 1;
    if(this.current >= this.vis.length){
      this.current = 0;
    }
  };
  return module;
}).call({},module);
