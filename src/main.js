(function(window,module){
  var core = require('./core');
  var visuals = require('./visuals');
  var utils = require('./utils');
  var mVisualizer = function(opts){
    opts = opts||{}
    this.pub = {
      ctx:null,
      dataStream: opts.dataStream||null
    };
    this.vis = [];
    this.initialized = 0;
    this.current = 0;
    this.canvas = null;
    this.timer = null;
    this.container = window.document.getElementById(opts.container)||window.document.body;
  };
  var initialize = function(opts){
    opts = opts||{};
    this.pub.dataStream = opts.dataStream||this.pub.dataStream;
    this.container = window.document.getElementById(opts.container)||this.container;
    this.canvas = window.document.createElement('canvas');
    this.pub.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    this.canvas.width = opts.width||window.innerWidth;
    this.canvas.height = opts.height||window.innerHeight;
    if(this.pub.dataStream !== null && this.container !== null && this.pub.ctx !== null){
      this.initialized = 1;
    }
    return this;
  };
  mVisualizer.prototype.lineGraph = visuals.lineGraph;
  mVisualizer.prototype.barGraph =  visuals.barGraph;
  mVisualizer.prototype.draw = core.draw;
  mVisualizer.prototype.nextVis = core.nextVis;
  mVisualizer.prototype.init = initialize;
  mVisualizer.prototype.start = core.start;
  mVisualizer.prototype.addEffect = core.addEffect;

  window.Visualizer = window.Visualizer||mVisualizer;
  module.exports = mVisualizer;
  return module;
}).call({},window,module);
