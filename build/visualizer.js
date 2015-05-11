(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(module){
  var utils = require('./utils');
  var start = module.exports.start = function(){
    if(this.initialized){
      var next = this.nextVis.bind(this);
      this.canvas.addEventListener('click', next);
      this.draw.call(this);
    }else{
      console.log('Visualizer not properly initialized.');
    }
    return this;
  };
  var addEffect = module.exports.addEffect = function(fn){
    if(utils.isFunction(fn)){
      this.vis.push(fn);
    }else{
      return false;
    }
    return this;
  };
  var draw = module.exports.draw = function(time){
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
  var nextVis= module.exports.nextVis = function(){
    this.current += 1;
    if(this.current >= this.vis.length){
      this.current = 0;
    }
  };
  return module;
}).call({},module);

},{"./utils":3}],2:[function(require,module,exports){
(function(window,module){
  var core = require('./core');
  var visuals = require('./visuals');
  var utils = require('./utils');
  var mVisualizer = function(opts){
    opts = opts||{};
    this.showFps = opts.showFps||false;
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
    this.showFps = opts.showFps||false;
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

},{"./core":1,"./utils":3,"./visuals":4}],3:[function(require,module,exports){
(function(module){
  var isFunction = module.exports.isFunction = function(functionToCheck){
    //http://stackoverflow.com/a/7356528/342426
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };
  return module;
}).call({},module);

},{}],4:[function(require,module,exports){
(function(module){
  var lineGraph = module.exports.lineGraph= function(opts){
    opts = opts||{};
    this.addEffect(function($ctx,$dataStream){
      var width = $ctx.canvas.width;
      var height = $ctx.canvas.height;
      var step = width/$dataStream.length;
      $ctx.fillStyle = opts.bgColor||'#FFFFFF';
      $ctx.fillRect(0,0,width,height);
      $ctx.strokeStyle = opts.color||'#000000';
      $ctx.fillStyle = opts.color||'#000000';
      $ctx.beginPath();
      $ctx.moveTo(-1000,height);
      for(var i = 0;i<$dataStream.length;i++){
        $ctx.lineTo(i*step,Math.floor(height - height*($dataStream[i]/512)));
      }
      $ctx.closePath();
      if(opts.fill){
        $ctx.fill();
      }else{
        $ctx.stroke();
      }
    });
    return this;
  };
  var barGraph = module.exports.barGraph = function(opts){
    opts = opts||{};
    opts.bgColor = opts.bgColor || '#FFFFFF';
    opts.color = opts.color||'#aa7744';
    this.addEffect(function($ctx,$dataStream){
      var width = $ctx.canvas.width;
      var height = $ctx.canvas.height;
      var step = opts.width||width/$dataStream.length;
      $ctx.fillStyle = opts.bgColor;
      $ctx.fillRect(0,0,$ctx.canvas.width,$ctx.canvas.height);
      for(var i = 0;i<$dataStream.length;i++){
        $ctx.fillStyle = opts.color;
        $ctx.fillRect(i*step,Math.floor(height - height*($dataStream[i]/512)),
          step,height*($dataStream[i]/512));
      }
    });
    return this;
  };
  return module;
}).call({},module);

},{}]},{},[2])