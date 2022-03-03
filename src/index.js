(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["./client"], function(CoCreateUnique) {
        	return factory(CoCreateUnique)
        });
    } else if (typeof module === 'object' && module.exports) {
      const CoCreateUnique = require("./server.js")
      module.exports = factory(CoCreateUnique);
    } else {
        root.returnExports = factory(root["./client.js"]);
  }
}(typeof self !== 'undefined' ? self : this, function (CoCreateUnique) {
  return CoCreateUnique;
}));