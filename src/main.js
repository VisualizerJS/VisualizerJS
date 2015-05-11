(function(window,module){
    var core = require('./core');
    var visuals = require('./visuals');
    var utils = require('./utils');
    var Visualizer = function(opts){
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
    Visualizer.prototype.lineGraph = visuals.lineGraph;
    Visualizer.prototype.barGraph =  visuals.barGraph;
    Visualizer.prototype.draw = core.draw;
    Visualizer.prototype.nextVis = core.nextVis;
    Visualizer.prototype.init = initialize;
    Visualizer.prototype.start = core.start;
    Visualizer.prototype.addEffect = core.addEffect;

    module.exports = Visualizer;
    return module;
}).call({},window,module);
