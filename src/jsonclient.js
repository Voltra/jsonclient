import $json from "../build-babel/jsonclient"

// (function UniversalModuleDefinition(root, factory){
// 	if(typeof exports === 'object' && typeof module === 'object')
//         module.exports = factory();
//     else{
// 		var module_name = "$json";
// 		if(typeof define === 'function' && define.amd)
// 			define(module_name, [], factory);
// 		else
// 			if(typeof exports === 'object')
// 				exports[module_name] = factory();
// 			else
// 				root[module_name] = factory();
// 	}
// })(window || (global || this), function(){
//     return $json;
// });

// var that = window;
(function BrowserModuleDefinition(root, factory){
	root["$json"] = factory();
})(this || window, ()=>$json);