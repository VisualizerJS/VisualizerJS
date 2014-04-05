(function(window,module){
  var utils = require('./utils');
  var visuals = require('./visuals');
  var start = module.exports.start = function(){
    var next = this.nextVis.bind(this);
    this.canvas.addEventListener('click', next);
    this.draw.call(this);
  };
  var addEffect = module.exports.addEffect = function(fn){
    this.vis.push(fn);
  };
  var initialize =  module.exports.initialize = function(opts){
    this.pub.dataStream = opts.dataStream;
    this.container = window.document.getElementById((opts)?opts.container||'canvas-container':'canvas-container');
    this.canvas = window.document.createElement('canvas');
    this.pub.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    this.canvas.width = opts.width||'256'; 
    this.canvas.height = opts.height||'128';
    this.initialized = 1;
    this.addEffect.call(this,visuals.drawPeaks); 
  };
  var draw = module.exports.draw = function(){
    var self = this;
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
    cancelAnimationFrame(this.timer);
    this.draw.call(this);
  };
  return module;
}).call({},window,module);
