(function(module){
  var isFunction = module.exports.isFunction = function(functionToCheck){
    //http://stackoverflow.com/a/7356528/342426
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };
  var check= module.exports.check = function(a){
    return (function(b){
        return function(){
          if(a.call(this,arguments)){
            b.call(this,arguments);
          }
        };
    })
  };
  var checkIfArgFunction = module.exports.checkIfArgFunction = check(isFunction);
  return module;
}).call({},module);
