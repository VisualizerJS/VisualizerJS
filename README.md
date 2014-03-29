VisualizerJS
============

Canvas visualization library, was originally part of my [Soundcloud radio](http://zxc.fi/) but decided to roll it out as a separate library.

###Requirements
1. Node 0.10.18

###Installing

Clone this repo and install the dependencies. Then build with Browserify 
```
npm install
node node_modules/.bin/browserify src/main.js > visualizer.js
```



Usage:
```
var viz = new Visualizer();
viz.init({dataSource: as,container: 'cont'}); 
```

###Adding your own visualization functions

```
var drawPeaks = function(){
// this exposes the 2d context and audiosource
// to your function
  var step = 3;
  this.ctx.fillStyle = '#FFFFFF';
  this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  this.ctx.fillStyle = '#000000';
  for(var i = 0;i<this.audioSource.streamData.length;i++){
    this.ctx.fillRect(i*step,Math.floor(64 - 64*(this.audioSource.streamData[i]/256)),step,2);
  }
};
viz.addEffect(drawPeaks);
```
