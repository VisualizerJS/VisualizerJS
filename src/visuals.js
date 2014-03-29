(function(module){
  var drawPeaks = module.exports.drawPeaks= function(){
    var step = 3;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    this.ctx.fillStyle = '#000000';
    for(var i = 0;i<this.dataSource.streamData.length;i++){
      this.ctx.fillRect(i*step,Math.floor(64 - 64*(this.dataSource.streamData[i]/256)),step,2);
    }
  };
  return module;
}).call({},module);
