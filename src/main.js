(function(window){
  var core = require('./core');
  var visuals = require('./visuals');
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
  var initialize = function(opts){
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
  mVisualizer.prototype.draw = core.draw;
  mVisualizer.prototype.nextVis = core.nextVis;
  mVisualizer.prototype.init = initialize; 
  mVisualizer.prototype.start = core.start;
  mVisualizer.prototype.addEffect = core.addEffect;

  window.Visualizer = window.Visualizer||mVisualizer;
  return window;
}).call({},window);
