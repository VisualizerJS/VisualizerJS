(function(module){
  var utils = require('./utils');
  module.exports.start = function(){
    if(this.initialized){
      this.draw.call(this);
    }else{
      console.log('Visualizer not properly initialized.');
    }
    return this;
  };
  module.exports.addEffect = function(fn){
    if(utils.isFunction(fn)){
      this.vis.push(fn);
    }else{
      return false;
    }
    return this;
  };
  module.exports.draw = function(time){
    if(!this._lastTime){
      this._lastTime = time;
      this.fps = 0;
    }
    this._delta = (time-this._lastTime)/1000;
    this._lastTime = time;
    this.fps = Math.floor(1 / this._delta);
    var cur_vis = this.vis[this.current].bind(this);
    var boundDraw = this.draw.bind(this);
    cur_vis(this.pub.ctx,this.pub.dataStream);
    if(this.showFps){
      this.pub.ctx.fillStyle = 'yellow';
      this.pub.ctx.fillText('fps: '+this.fps,50,50);
    }
    this.timer = requestAnimationFrame(boundDraw);

  };
  module.exports.nextVis = function(){
    this.current += 1;
    if(this.current >= this.vis.length){
      this.current = 0;
    }
  };
  return module;
}).call({},module);
