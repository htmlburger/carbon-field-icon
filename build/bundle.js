/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carbon_fields_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @carbon-fields/core */ \"@carbon-fields/core\");\n/* harmony import */ var _carbon_fields_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_carbon_fields_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ \"./src/main.js\");\n/**\n * External dependencies.\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\nObject(_carbon_fields_core__WEBPACK_IMPORTED_MODULE_0__[\"registerFieldType\"])('icon', _main__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__webpack_provided_wp_dot_element) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\");\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\n\n\n\n/**\n * External dependencies.\n */\n\n\n\n\n\nvar IconField =\n/*#__PURE__*/\nfunction (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(IconField, _Component);\n\n  function IconField() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IconField);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(IconField)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"state\", {\n      isFocused: false,\n      searchTerm: '',\n      chosenIcon: null,\n      iconClass: '',\n      availableOptions: []\n      /**\n       * Lifecycle hook.\n       *\n       * @return {void}\n       */\n\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"handleClick\", function (e) {\n      if (_this.popup.contains(e.target)) {\n        return;\n      }\n\n      _this.closeList();\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"handleChange\", function (_ref) {\n      var provider = _ref.provider,\n          value = _ref.value;\n      var _this$props = _this.props,\n          id = _this$props.id,\n          onChange = _this$props.onChange;\n      onChange(id, {\n        value: value,\n        provider: provider,\n        icon: value\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"handleButtonClearClick\", function (e) {\n      var _this$props2 = _this.props,\n          id = _this$props2.id,\n          onChange = _this$props2.onChange;\n\n      _this.setState({\n        searchTerm: '',\n        iconClass: '',\n        chosenIcon: null\n      });\n\n      onChange(id, {\n        value: '',\n        icon: '',\n        provider: ''\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"onIconChange\", function (value) {\n      var options = _this.props.field.options;\n      var valueObject = Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"first\"])(Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"filter\"])(options, function (option) {\n        return option.value === value;\n      }));\n\n      if (valueObject && valueObject.value === '') {\n        valueObject = null;\n      }\n\n      _this.setState({\n        searchTerm: valueObject ? valueObject.value : '',\n        iconClass: valueObject ? valueObject.class : '',\n        chosenIcon: valueObject\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"openList\", function () {\n      _this.setState({\n        isFocused: true\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"closeList\", function () {\n      _this.setState({\n        isFocused: false\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"onFocusInput\", function (e) {\n      e.preventDefault();\n\n      _this.setState({\n        isFocused: true\n      });\n\n      _this.searchInput.focus();\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"onOptionSelect\", function (option) {\n      _this.handleChange(option);\n\n      _this.onIconChange(option.value);\n\n      _this.closeList();\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this)), \"onSearchTermChange\", function (e) {\n      var field = _this.props.field;\n      var options = field.options;\n      var searchTerm = e.target.value;\n      var availableOptions = searchTerm ? Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"filter\"])(options, function (option) {\n        var compareTo = [option.value, option.name].concat(option.search_terms).map(function (searchTerm) {\n          return searchTerm.toLowerCase();\n        });\n        var match = Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"some\"])(compareTo, function (metadata) {\n          return metadata.indexOf(searchTerm.toLowerCase()) !== -1;\n        });\n        return match;\n      }) : options;\n\n      _this.setState({\n        searchTerm: searchTerm,\n        availableOptions: availableOptions\n      });\n    });\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(IconField, [{\n    key: \"componentWillMount\",\n    value: function componentWillMount() {\n      document.addEventListener('mousedown', this.handleClick, false);\n    }\n    /**\n     * Lifecycle hook.\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      document.removeEventListener('mousedown', this.handleClick, false);\n    }\n    /**\n     * Lifecycle hook.\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      var _this$props3 = this.props,\n          field = _this$props3.field,\n          value = _this$props3.value;\n      var options = field.options;\n      var availableOptions = Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"filter\"])(options, function (option) {\n        var compareTo = [option.value, option.name].concat(option.search_terms).map(function (searchTerm) {\n          return searchTerm.toLowerCase();\n        });\n        var match = Object(lodash__WEBPACK_IMPORTED_MODULE_7__[\"some\"])(compareTo, function (metadata) {\n          return metadata.indexOf(_this2.state.searchTerm.toLowerCase()) !== -1;\n        });\n        return match;\n      });\n      this.onIconChange(value.value);\n      this.setState({\n        searchTerm: value ? value.icon : '',\n        availableOptions: availableOptions\n      });\n    }\n    /**\n     * Handles document click.\n     *\n     * @param  {Event} e\n     * @return {void}\n     */\n\n  }, {\n    key: \"render\",\n\n    /**\n     * Renders the component.\n     *\n     * @return {Object}\n     */\n    value: function render() {\n      var _this3 = this;\n\n      var _this$props4 = this.props,\n          name = _this$props4.name,\n          value = _this$props4.value;\n      var openList = this.openList,\n          onSearchTermChange = this.onSearchTermChange;\n      var _this$state = this.state,\n          iconClass = _this$state.iconClass,\n          isFocused = _this$state.isFocused,\n          searchTerm = _this$state.searchTerm,\n          availableOptions = _this$state.availableOptions,\n          chosenIcon = _this$state.chosenIcon;\n      var iconPreview;\n\n      if (chosenIcon && chosenIcon.icon) {\n        iconPreview = __webpack_provided_wp_dot_element.createElement(\"img\", {\n          src: chosenIcon.icon\n        });\n      } else {\n        iconPreview = __webpack_provided_wp_dot_element.createElement(\"i\", {\n          className: iconClass\n        });\n      }\n\n      return __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: \"cf-icon-wrapper\"\n      }, __webpack_provided_wp_dot_element.createElement(\"input\", {\n        type: \"hidden\",\n        name: \"\".concat(name, \"[provider]\"),\n        value: value.provider,\n        readOnly: true\n      }), __webpack_provided_wp_dot_element.createElement(\"input\", {\n        type: \"hidden\",\n        name: \"\".concat(name, \"[icon]\"),\n        value: value.icon,\n        readOnly: true\n      }), __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: \"cf-icon-preview\"\n      }, __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: \"cf-icon-preview__canvas\"\n      }, chosenIcon ? iconPreview : __webpack_provided_wp_dot_element.createElement(\"span\", {\n        className: \"cf-icon-preview__canvas-label\"\n      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__[\"__\"])('No icon selected', 'carbon-field-icon-ui'))), __webpack_provided_wp_dot_element.createElement(\"input\", {\n        type: \"text\",\n        className: \"cf-icon-preview__label\",\n        value: chosenIcon ? chosenIcon.name : '',\n        readOnly: true\n      })), __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: \"cf-icon-switcher\",\n        ref: function ref(popup) {\n          return _this3.popup = popup;\n        }\n      }, __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()({\n          'cf-icon-search': true,\n          'cf-icon-search--focused': isFocused,\n          'dashicons-before': true,\n          'dashicons-search': true\n        })\n      }, __webpack_provided_wp_dot_element.createElement(\"input\", {\n        type: \"text\",\n        onFocus: openList,\n        onChange: onSearchTermChange,\n        value: searchTerm,\n        className: \"cf-icon-search__input\",\n        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__[\"__\"])('Search icon ...', 'carbon-field-icon-ui'),\n        ref: function ref(searchInput) {\n          return _this3.searchInput = searchInput;\n        }\n      }), __webpack_provided_wp_dot_element.createElement(\"button\", {\n        type: \"button\",\n        className: \"cf-icon-search__clear button button-small\",\n        onClick: this.handleButtonClearClick\n      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__[\"__\"])('Clear', 'carbon-field-icon-ui'))), __webpack_provided_wp_dot_element.createElement(\"div\", {\n        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()({\n          'cf-icon-switcher__options': true,\n          'cf-icon-switcher__options--opened': isFocused\n        })\n      }, __webpack_provided_wp_dot_element.createElement(\"ul\", {\n        className: \"cf-icon-switcher__options-list\"\n      }, availableOptions.length ? availableOptions.map(function (option) {\n        return __webpack_provided_wp_dot_element.createElement(\"li\", {\n          key: option.value,\n          className: \"cf-icon-switcher__options-list__item cf-icon-switcher__options-list__item--\".concat(option.value)\n        }, __webpack_provided_wp_dot_element.createElement(\"button\", {\n          type: \"button\",\n          onClick: function onClick() {\n            _this3.onOptionSelect(option);\n          },\n          className: classnames__WEBPACK_IMPORTED_MODULE_8___default()({\n            'active': option.value === value\n          })\n        }, option.icon ? __webpack_provided_wp_dot_element.createElement(\"img\", {\n          src: option.icon,\n          className: option.class\n        }) : __webpack_provided_wp_dot_element.createElement(\"i\", {\n          className: option.class,\n          dangerouslySetInnerHTML: {\n            __html: option.contents\n          }\n        }), __webpack_provided_wp_dot_element.createElement(\"span\", null, option.name)));\n      }) : __webpack_provided_wp_dot_element.createElement(\"li\", {\n        key: \"no-results\",\n        className: \"cf-icon-switcher__options-list__item cf-icon-switcher__options-list__item--no-results\"\n      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__[\"__\"])('No results found', 'carbon-field-icon-ui'))))));\n    }\n  }]);\n\n  return IconField;\n}(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IconField);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\")))\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ }),

/***/ "@carbon-fields/core":
/*!**************************!*\
  !*** external "cf.core" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cf.core;\n\n//# sourceURL=webpack:///external_%22cf.core%22?");

/***/ }),

/***/ "@wordpress/element":
/*!**************************************************!*\
  !*** external "cf.vendor['@wordpress/element']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cf.vendor['@wordpress/element'];\n\n//# sourceURL=webpack:///external_%22cf.vendor%5B'@wordpress/element'%5D%22?");

/***/ }),

/***/ "@wordpress/i18n":
/*!***********************************************!*\
  !*** external "cf.vendor['@wordpress/i18n']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cf.vendor['@wordpress/i18n'];\n\n//# sourceURL=webpack:///external_%22cf.vendor%5B'@wordpress/i18n'%5D%22?");

/***/ }),

/***/ "classnames":
/*!******************************************!*\
  !*** external "cf.vendor['classnames']" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cf.vendor['classnames'];\n\n//# sourceURL=webpack:///external_%22cf.vendor%5B'classnames'%5D%22?");

/***/ }),

/***/ "lodash":
/*!**************************************!*\
  !*** external "cf.vendor['lodash']" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cf.vendor['lodash'];\n\n//# sourceURL=webpack:///external_%22cf.vendor%5B'lodash'%5D%22?");

/***/ })

/******/ });