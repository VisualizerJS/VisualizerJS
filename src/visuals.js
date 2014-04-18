(function(module){
  var drawPeaks = module.exports.drawPeaks= function(opts){
    opts = opts||{};
    this.addEffect(function($ctx,$dataStream){
      var step = opts.width||4;
      $ctx.fillStyle = opts.bgColor||'#FFFFFF';
      $ctx.fillRect(0,0,$ctx.canvas.width,$ctx.canvas.height);
      $ctx.fillStyle = opts.color||'#000000';
      for(var i = 0;i<$dataStream.length;i++){
        $ctx.fillRect(i*step,Math.floor(64 - 64*($dataStream[i]/256)),1,2);
        var avg = ($dataStream[i]+$dataStream[i+1])/2;
        $ctx.fillRect(i*step+2,Math.floor(64 - 64*(avg/256)),2,2);
        var avg1 = ($dataStream[i+1]+avg)/2;
        $ctx.fillRect(i*step+3,Math.floor(64 - 64*(avg1/256)),2,2);
        var avg2 = ($dataStream[i+1]+avg1)/2;
        $ctx.fillRect(i*step+4,Math.floor(64 - 64*(avg2/256)),2,2);
      }
    });
    return this;
  };
  var barGraph = module.exports.barGraph = function(opts){
    opts = opts ||{};
    opts.bgColor = opts.bgColor || '#FFFFFF';
    opts.color = opts.color||'#aa7744';
    opts.width =  opts.width||'8';
    this.addEffect(function($ctx,$ds){
      $ctx.fillStyle = opts.bgColor;
      $ctx.fillRect(0,0,$ctx.canvas.width,$ctx.canvas.height);
      for(var i = 0;i<$ds.length;i++){
        $ctx.fillStyle = opts.color;
        $ctx.fillRect(i*opts.width,Math.floor(64 - 64*($ds[i]/256)),
          opts.width,64*($ds[i]/256));
      }
    });
    return this;
  };
  return module;
}).call({},module);
