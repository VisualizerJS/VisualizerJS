(function(window){
  var core = require('./core');
  var utils = require('./utils');
  var mVisualizer = function(opts){
    this.pub = {
      ctx:null,
      dataSource: (opts)?opts.dataSource||null:null
    }
    this.vis = [];
    this.initialized = 0;
    this.current = 0;
    this.canvas = null;
    this.timer = null;
    this.container = window.document.getElementById((opts)?opts.container||'canvas-container':'canvas-container');
  };
  var checkIfInitialized = utils.check(function(){return (this.initialized === 1);});
  mVisualizer.prototype.draw = checkIfInitialized(core.draw);
  mVisualizer.prototype.nextVis = checkIfInitialized(core.nextVis);
  mVisualizer.prototype.init = core.initialize; 
  mVisualizer.prototype.start = checkIfInitialized(core.start);
  mVisualizer.prototype.addEffect = checkIfInitialized(utils.checkIfArgFunction(core.addEffect));

  window.Visualizer = window.Visualizer||mVisualizer;
}).call({},window);
