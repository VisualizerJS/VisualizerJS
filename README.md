[![Build status](https://api.travis-ci.org/VisualizerJS/VisualizerJS.svg)](https://travis-ci.org/VisualizerJS/VisualizerJS)

VisualizerJS
============

Canvas visualization library, was originally part of my [Soundcloud radio](http://zxc.fi/) but decided to roll it out as a separate library.

###Requirements
1. Node 0.10.18

###Installing

Clone this repo and install the dependencies. Then build with Browserify
```
npm install
npm run minify
```

**Usage:**
```
var viz = new Visualizer();
viz.init({dataStream: yourdatastream,container: 'cont'})
  .barGraph({bgColor:'#000000',color:'#235478'})
  .start();
```
**API:**

|func       | options                                       |
|-----------|-----------------------------------------------|
|init       | container: id for your canvas container       |
|           | datastream: array of the data to be visualized|
|-----------|-----------------------------------------------|
|barGraph   | bgColor: background color                     |
|           | color: foreground color                       |
|           | width: bar width                              |
|-----------|-----------------------------------------------|
|start      |                                               |
|-----------|-----------------------------------------------|


###Adding your own visualization functions

```
var drawPeaks = function($ctx,$dataStream){
// this exposes the 2d context and datastream
// to your function
  var step = 3;
  $ctx.fillStyle = '#FFFFFF';
  $ctx.fillRect(0,0,$ctx.canvas.width,$ctx.canvas.height);
  $ctx.fillStyle = '#000000';
  for(var i = 0;i<$dataStream.length;i++){
    $ctx.fillRect(i*step,Math.floor(64 - 64*($dataStream[i]/256)),step,2);
  }
};
viz.addEffect(drawPeaks);
```
###TODO
1. Write some tests maybe
2. Get more graphs and visualizations built in.
