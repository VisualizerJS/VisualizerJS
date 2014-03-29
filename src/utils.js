(function(module){
  var isFunction = module.exports.isFunction = function(functionToCheck){
    //http://stackoverflow.com/a/7356528/342426
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };
  return module;
}).call({},module);
