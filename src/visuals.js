(function(module){
    module.exports.lineGraph= function(opts){
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
    module.exports.barGraph = function(opts){
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
