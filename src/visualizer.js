var isFunction = function(functionToCheck){
  //http://stackoverflow.com/a/7356528/342426
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
var drawPeaks = function(){
  var step = 3;
  this.ctx.fillStyle = '#FFFFFF';
  this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  this.ctx.fillStyle = '#000000';
  for(var i = 0;i<this.audioSource.streamData.length;i++){
    this.ctx.fillRect(i*step,Math.floor(64 - 64*(this.audioSource.streamData[i]/256)),step,2);
  }
};
function Visualizer(){
  var visualizer = {};
  var pub = {}
  var vis = [];
  var initialized = 0;
  var current = 0;
  var canvas = null;
  var timer = null;
  var container = null;
  pub.ctx = null;
  pub.audioSource = null;
  var draw = function(){
    vis[current].call(pub);
    timer = requestAnimationFrame(draw);
  }
  var nextVis = function(){
    current += 1;
    if(current >= draw.length){
      current = 0;
    }
    cancelAnimationFrame(timer);
    draw();
  };
  visualizer.init = function(opts){
    if(opts.container && opts.audioSource){
      initialized = 1;
      container = window.document.getElementById(opts.container);
      pub.audioSource = opts.audioSource;
      canvas = window.document.createElement('canvas');
      pub.ctx = canvas.getContext('2d');
      container.appendChild(canvas);
      canvas.width = opts.width||'256'; 
      canvas.height = opts.height||'128';
      visualizer.addEffect(drawPeaks);
    }else{
      console.log('Visualizer.init: missing options, audiotSource and container are required');
    }
  };
  visualizer.start = function(){
    if(initialized === 1){
      canvas.addEventListener('click', nextVis);
      draw();
    }else{
      console.log('Visualizer.start: Visualizer not initialized.');
    }
  };
  visualizer.addEffect = function(fn){
    if(isFunction(fn)){
      vis.push(fn);
    }else{
      console.log('Visualizer.addEffect: argument not  a function');
    }
  }
  return visualizer;
}
