(function(module){
  var drawPeaks = module.exports.drawPeaks= function($ctx,$dataStream){
    var step = 4;
    $ctx.fillStyle = '#FFFFFF';
    $ctx.fillRect(0,0,$ctx.canvas.width,$ctx.canvas.height);
    $ctx.fillStyle = '#000000';
    for(var i = 0;i<$dataStream.length;i++){
      $ctx.fillRect(i*step,Math.floor(64 - 64*($dataStream[i]/256)),1,2);
      var avg = ($dataStream[i]+$dataStream[i+1])/2;
      $ctx.fillRect(i*step+2,Math.floor(64 - 64*(avg/256)),2,2);
      var avg1 = ($dataStream[i+1]+avg)/2;
      $ctx.fillRect(i*step+3,Math.floor(64 - 64*(avg1/256)),2,2);
      var avg2 = ($dataStream[i+1]+avg1)/2;
      $ctx.fillRect(i*step+4,Math.floor(64 - 64*(avg2/256)),2,2);
    }
  };
  return module;
}).call({},module);
