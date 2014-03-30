(function(module){
  var drawPeaks = module.exports.drawPeaks= function(){
    var step = 4;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    this.ctx.fillStyle = '#000000';
    for(var i = 0;i<this.dataSource.streamData.length;i++){
      this.ctx.fillRect(i*step,Math.floor(64 - 64*(this.dataSource.streamData[i]/256)),1,2);
      var avg = (this.dataSource.streamData[i]+this.dataSource.streamData[i+1])/2;
      this.ctx.fillRect(i*step+2,Math.floor(64 - 64*(avg/256)),2,2);
      var avg1 = (this.dataSource.streamData[i+1]+avg)/2;
      this.ctx.fillRect(i*step+3,Math.floor(64 - 64*(avg1/256)),2,2);
      var avg2 = (this.dataSource.streamData[i+1]+avg1)/2;
      this.ctx.fillRect(i*step+4,Math.floor(64 - 64*(avg2/256)),2,2);
    }
  };
  return module;
}).call({},module);
