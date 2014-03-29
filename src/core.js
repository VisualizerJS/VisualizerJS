(function(window,module){
  var utils = require('./utils');
  var visuals = require('./visuals');
  var start = module.exports.start = function(){
    var self = this
    this.canvas.addEventListener('click', function(){
      self.draw.call(self);
    });
    this.draw.call(this);
  };
  var addEffect = module.exports.addEffect = function(fn){
      this.vis.push(fn);
    /*if(utils.isFunction(fn)){
      this.vis.push(fn);
    }else{
      console.log('Visualizer.addEffect: argument not  a function');
    }*/
  };
  var initialize =  module.exports.initialize = function(opts){
    this.pub.dataSource = opts.dataSource;
    this.container = window.document.getElementById((opts)?opts.container||'canvas-container':'canvas-container');
    this.canvas = window.document.createElement('canvas');
    this.pub.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    this.canvas.width = opts.width||'256'; 
    this.canvas.height = opts.height||'128';
    for(var i in visuals){
      addEffect.call(this,visuals[i]);
    }
    this.initialized = 1;
  };
  var draw = module.exports.draw = function(){
    var self = this;
    this.vis[this.current].call(this.pub);
    this.timer = requestAnimationFrame(function(){
      self.draw.call(self);
    });

  };
  var nextVis= module.exports.nextVis = function(){
      this.current += 1;
      if(this.current >= this.vis.length){
        this.current = 0;
      }
      cancelAnimationFrame(this.timer);
      this.draw.call(this);
  };
  return module
}).call({},window,module);
