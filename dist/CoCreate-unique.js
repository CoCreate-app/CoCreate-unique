(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoCreateUnique"] = factory();
	else
		root["CoCreateUnique"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/CoCreate-unique.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CoCreate-unique.js":
/*!********************************!*\
  !*** ./src/CoCreate-unique.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var CoCreateUnique = {\n  selector: \"input[data-unique='true'], textarea[data-unique='true']\",\n  requestAttr: \"data-unique_request_id\",\n  init: function init(container) {\n    var mainContainer = container || document;\n\n    if (!mainContainer.querySelectorAll) {\n      return;\n    }\n\n    var items = mainContainer.querySelectorAll(this.selector);\n    var self = this;\n    items.forEach(function (item) {\n      var request_id = CoCreate.utils.generateUUID();\n      item.setAttribute(self.requestAttr, request_id);\n      self.setInputEvent(item);\n    });\n  },\n  initListener: function initListener() {\n    var self = this;\n    CoCreate.crud.listenMessage('checkedUnique', function (data) {\n      self.checkedUnique(data);\n    });\n  },\n  checkedUnique: function checkedUnique(data) {\n    var request_id = data['request_id'];\n    if (!request_id) return;\n    var element = document.querySelector(\"[\".concat(this.requestAttr, \"='\").concat(request_id, \"']\"));\n\n    if (data['unique']) {\n      element.classList.remove('data-unique-invalid');\n      element.classList.add('data-unique-valid');\n    } else {\n      element.classList.remove('data-unique-valid');\n      element.classList.add('data-unique-invalid');\n    }\n  },\n  setInputEvent: function setInputEvent(input) {\n    var self = this;\n    input.addEventListener('input', function (e) {\n      //. request check input\n      var request_data = CoCreate.getCommonParams();\n      request_data['collection'] = input.getAttribute('data-collection');\n      request_data['name'] = input.getAttribute('name');\n      request_data['value'] = e.target.value;\n      request_data['request_id'] = input.getAttribute(self.requestAttr);\n      CoCreate.socket.send('checkUnique', request_data);\n    });\n  },\n  checkValidate: function checkValidate(form) {\n    var items = form.querySelectorAll(this.selector);\n\n    for (var i = 0; i < items.length; i++) {\n      if (!items[i].classList.contains('data-unique-success')) {\n        return false;\n      }\n    }\n\n    return true;\n  }\n};\nCoCreateUnique.init();\nCoCreateUnique.initListener();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZVVuaXF1ZS8uL3NyYy9Db0NyZWF0ZS11bmlxdWUuanM/ZmE2NSJdLCJuYW1lcyI6WyJDb0NyZWF0ZVVuaXF1ZSIsInNlbGVjdG9yIiwicmVxdWVzdEF0dHIiLCJpbml0IiwiY29udGFpbmVyIiwibWFpbkNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW1zIiwic2VsZiIsImZvckVhY2giLCJpdGVtIiwicmVxdWVzdF9pZCIsIkNvQ3JlYXRlIiwidXRpbHMiLCJnZW5lcmF0ZVVVSUQiLCJzZXRBdHRyaWJ1dGUiLCJzZXRJbnB1dEV2ZW50IiwiaW5pdExpc3RlbmVyIiwiY3J1ZCIsImxpc3Rlbk1lc3NhZ2UiLCJkYXRhIiwiY2hlY2tlZFVuaXF1ZSIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaW5wdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInJlcXVlc3RfZGF0YSIsImdldENvbW1vblBhcmFtcyIsImdldEF0dHJpYnV0ZSIsInRhcmdldCIsInZhbHVlIiwic29ja2V0Iiwic2VuZCIsImNoZWNrVmFsaWRhdGUiLCJmb3JtIiwiaSIsImxlbmd0aCIsImNvbnRhaW5zIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxjQUFjLEdBQUc7QUFFdEJDLFVBQVEsMkRBRmM7QUFHdEJDLGFBQVcsRUFBRSx3QkFIUztBQUt0QkMsTUFBSSxFQUFFLGNBQVNDLFNBQVQsRUFBb0I7QUFFekIsUUFBSUMsYUFBYSxHQUFHRCxTQUFTLElBQUlFLFFBQWpDOztBQUVBLFFBQUksQ0FBQ0QsYUFBYSxDQUFDRSxnQkFBbkIsRUFBcUM7QUFDcEM7QUFDQTs7QUFFRCxRQUFJQyxLQUFLLEdBQUdILGFBQWEsQ0FBQ0UsZ0JBQWQsQ0FBK0IsS0FBS04sUUFBcEMsQ0FBWjtBQUNBLFFBQU1RLElBQUksR0FBRyxJQUFiO0FBRUFELFNBQUssQ0FBQ0UsT0FBTixDQUFjLFVB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IENvQ3JlYXRlVW5pcXVlID0ge1xuXG5cdHNlbGVjdG9yOiBgaW5wdXRbZGF0YS11bmlxdWU9J3RydWUnXSwgdGV4dGFyZWFbZGF0YS11bmlxdWU9J3RydWUnXWAsXG5cdHJlcXVlc3RBdHRyOiBcImRhdGEtdW5pcXVlX3JlcXVlc3RfaWRcIixcblx0XG5cdGluaXQ6IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdFxuXHRcdGxldCBtYWluQ29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50O1xuXHRcdFxuXHRcdGlmICghbWFpbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBpdGVtcyA9IG1haW5Db250YWluZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKVxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdFxuXHRcdGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdGNvbnN0IHJlcXVlc3RfaWQgPSBDb0NyZWF0ZS51dGlscy5nZW5lcmF0ZVVVSUQoKTtcblx0XHRcdGl0ZW0uc2V0QXR0cmlidXRlKHNlbGYucmVxdWVzdEF0dHIsIHJlcXVlc3RfaWQpO1xuXHRcdFx0c2VsZi5zZXRJbnB1dEV2ZW50KGl0ZW0pXG5cdFx0fSlcblx0fSxcblx0XG5cdGluaXRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Q29DcmVhdGUuY3J1ZC5saXN0ZW5NZXNzYWdlKCdjaGVja2VkVW5pcXVlJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0c2VsZi5jaGVja2VkVW5pcXVlKGRhdGEpXG5cdFx0fSlcdFxuXHR9LFxuXHRcblx0Y2hlY2tlZFVuaXF1ZTogZnVuY3Rpb24oZGF0YSkge1xuXHRcdGNvbnN0IHJlcXVlc3RfaWQgPSBkYXRhWydyZXF1ZXN0X2lkJ107XG5cdFx0XG5cdFx0aWYgKCFyZXF1ZXN0X2lkKSByZXR1cm5cblx0XHRcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgWyR7dGhpcy5yZXF1ZXN0QXR0cn09JyR7cmVxdWVzdF9pZH0nXWApXG5cdFx0XG5cdFx0aWYgKGRhdGFbJ3VuaXF1ZSddKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RhdGEtdW5pcXVlLWludmFsaWQnKTtcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGF0YS11bmlxdWUtdmFsaWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkYXRhLXVuaXF1ZS12YWxpZCcpO1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXRhLXVuaXF1ZS1pbnZhbGlkJyk7XG5cdFx0fVxuXHR9LFxuXG5cdHNldElucHV0RXZlbnQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHQvLy4gcmVxdWVzdCBjaGVjayBpbnB1dFxuXHRcdFx0bGV0IHJlcXVlc3RfZGF0YSA9IENvQ3JlYXRlLmdldENvbW1vblBhcmFtcygpO1xuXHRcdFx0cmVxdWVzdF9kYXRhWydjb2xsZWN0aW9uJ10gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sbGVjdGlvbicpO1xuXHRcdFx0cmVxdWVzdF9kYXRhWyduYW1lJ10gPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxuXHRcdFx0cmVxdWVzdF9kYXRhWyd2YWx1ZSddID0gZS50YXJnZXQudmFsdWVcblx0XHRcdHJlcXVlc3RfZGF0YVsncmVxdWVzdF9pZCddID0gaW5wdXQuZ2V0QXR0cmlidXRlKHNlbGYucmVxdWVzdEF0dHIpXG5cdFx0XHRDb0NyZWF0ZS5zb2NrZXQuc2VuZCgnY2hlY2tVbmlxdWUnLCByZXF1ZXN0X2RhdGEpO1xuXHRcdH0pXG5cdFx0XG5cdH0sXG5cdFxuXHRjaGVja1ZhbGlkYXRlOiBmdW5jdGlvbihmb3JtKSB7XG5cdFx0Y29uc3QgaXRlbXMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZWxlY3Rvcik7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFpdGVtc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGEtdW5pcXVlLXN1Y2Nlc3MnKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59XG5cbkNvQ3JlYXRlVW5pcXVlLmluaXQoKTtcbkNvQ3JlYXRlVW5pcXVlLmluaXRMaXN0ZW5lcigpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/CoCreate-unique.js\n");

/***/ })

/******/ })["default"];
});