function Visualizer(){
  var timer = null;
  var draw = [];
  var visualizer = {};
  visualizer.container = null;
  visualizer.audioSource = null;
  visualizer.fgCanvas = null;
  visualizer.fgCtx = null;
  visualizer.step = 3;
  visualizer.init = function(opts){
    visualizer.container = window.document.getElementById(opts.container);
    visualizer.audioSource = opts.audioSource;
    visualizer.fgCanvas = window.document.createElement('canvas');
    visualizer.fgCtx = visualizer.fgCanvas.getContext('2d');
    visualizer.container.appendChild(visualizer.fgCanvas);
    visualizer.fgCanvas.width = visualizer.audioSource.streamData.length*2;
    visualizer.fgCanvas.height = '128';
    draw.push(drawPeaks);
  };
  visualizer.start = function(){
    visualizer.fgCanvas.addEventListener('click', function(){
      visualizer.step += 1;
      if(visualizer.step > 8){
        visualizer.step = 3;
      }
    });
    draw[0](); 
  };
  var drawPeaks = function(){
    visualizer.fgCtx.fillStyle = '#FFFFFF';
    visualizer.fgCtx.fillRect(0,0,256,256);
    visualizer.fgCtx.fillStyle = '#000000';
    var step = visualizer.step;
    for(var i = 0;i<visualizer.audioSource.streamData.length;i++){
      visualizer.fgCtx.fillRect(i*step,Math.floor(62 - 62*(visualizer.audioSource.streamData[i]/256)),step,2);
    }
    timer = requestAnimationFrame(drawPeaks);
  };
  return visualizer;
}
