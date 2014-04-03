(function(window){
  var core = require('./core');
  var utils = require('./utils');
  var mVisualizer = function(opts){
    this.pub = {
      ctx:null,
      dataStream: (opts)?opts.dataStream||null:null
    };
    this.vis = [];
    this.initialized = 0;
    this.current = 0;
    this.canvas = null;
    this.timer = null;
    this.container = window.document.getElementById((opts)?opts.container||'canvas-container':'canvas-container');
  };
  mVisualizer.prototype.draw = core.draw;
  mVisualizer.prototype.nextVis = core.nextVis;
  mVisualizer.prototype.init = core.initialize; 
  mVisualizer.prototype.start = core.start;
  mVisualizer.prototype.addEffect = core.addEffect;

  window.Visualizer = window.Visualizer||mVisualizer;
}).call({},window);
