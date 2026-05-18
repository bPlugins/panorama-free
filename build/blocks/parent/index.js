/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/parent/Edit.js":
/*!***********************************!*\
  !*** ./src/blocks/parent/Edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\parent\\Edit.js",
  _this = undefined;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var _wp$blockEditor = wp.blockEditor,
  InnerBlocks = _wp$blockEditor.InnerBlocks,
  useBlockProps = _wp$blockEditor.useBlockProps;
var _wp$data = wp.data,
  useSelect = _wp$data.useSelect,
  dispatch = _wp$data.dispatch;
var useEffect = wp.element.useEffect;
var Edit = function Edit(props) {
  var blockProps = useBlockProps();
  var clientId = props.clientId,
    isSelected = props.isSelected;
  var innerBlocks = useSelect(function (select) {
    return select("core/block-editor").getBlock(clientId).innerBlocks;
  });
  useEffect(function () {
    if (isSelected) {
      wp.data.dispatch("core/edit-post").openGeneralSidebar("edit-post/block");
    }
  }, [isSelected]);
  dispatch("core/block-editor").setTemplateValidity(true);
  var insertBlockType = function insertBlockType(type) {
    var block = wp.blocks.createBlock(type === "bpgb/panorama" ? "bpgb/panorama" : "panorama/".concat(type));
    return dispatch("core/block-editor").insertBlock(block, 0, clientId);
  };
  var appenderToUse = function appenderToUse() {
    if (innerBlocks.length === 0) {
      return /*#__PURE__*/React.createElement(InnerBlocks.ButtonBlockAppender, {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 14
        }
      });
    } else {
      return false;
    }
  };
  if (!(innerBlocks !== null && innerBlocks !== void 0 && innerBlocks.length)) {
    return /*#__PURE__*/React.createElement("div", _extends({}, blockProps, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36,
        columnNumber: 7
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "bpl-panorama-editor",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }
    }, /*#__PURE__*/React.createElement("h2", {
      className: "panorama-title",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 11
      }
    }, "Choose a viewer "), /*#__PURE__*/React.createElement("div", {
      className: "panorama-buttons",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 11
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "panorama-button image-3d",
      onClick: function onClick() {
        insertBlockType("image-3d");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 15
      }
    }, "\uD83E\uDDCA"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 15
      }
    }, "Image 3D")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button image-360",
      onClick: function onClick() {
        insertBlockType("image-360");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 15
      }
    }, "\uD83C\uDF10"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 15
      }
    }, "Image 360\xB0")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button video",
      onClick: function onClick() {
        insertBlockType("video");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 15
      }
    }, "\uD83C\uDFA5"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 15
      }
    }, "Video")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button video-360",
      onClick: function onClick() {
        insertBlockType("video-360");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 15
      }
    }, "\uD83C\uDFAC"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75,
        columnNumber: 15
      }
    }, " Video 360\xB0")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button gallery",
      onClick: function onClick() {
        insertBlockType("gallery");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 15
      }
    }, "\uD83D\uDDBC\uFE0F"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 15
      }
    }, "Gallery")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button tour",
      onClick: function onClick() {
        insertBlockType("tour");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 15
      }
    }, "\uD83C\uDFDB\uFE0F"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 15
      }
    }, "Tour 360\xB0")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button google-street",
      onClick: function onClick() {
        insertBlockType("google-street");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 15
      }
    }, "\uD83D\uDDFA\uFE0F"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 15
      }
    }, "Google Street")), /*#__PURE__*/React.createElement("button", {
      className: "panorama-button gutenberg-block",
      onClick: function onClick() {
        insertBlockType("bpgb/panorama");
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104,
        columnNumber: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 15
      }
    }, "\uD83C\uDF04"), /*#__PURE__*/React.createElement("span", {
      className: "text",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 15
      }
    }, "Panorama Gutenberg block"))), /*#__PURE__*/React.createElement(InnerBlocks, {
      templateLock: false,
      allowedBlocks: ["panorama/image-360", "panorama/image-3d", "panorama/video", "panorama/video-360", "panorama/google-street", "panorama/gallery", "panorama/tour", "panorama/virtual-tour", "bpgb/panorama"],
      renderAppender: function renderAppender() {
        return false;
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 11
      }
    })));
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, blockProps, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 5
    }
  }), /*#__PURE__*/React.createElement(InnerBlocks, {
    templateLock: false,
    allowedBlocks: ["panorama/image-360", "panorama/image-3d", "panorama/video", "panorama/video-360", "panorama/google-street", "panorama/gallery", "panorama/tour", "bpgb/panorama"],
    renderAppender: function renderAppender() {
      return appenderToUse();
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 7
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/parent/parent.scss":
/*!***************************************!*\
  !*** ./src/blocks/parent/parent.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/parent/block.json":
/*!**************************************!*\
  !*** ./src/blocks/parent/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"panorama/parent","version":"1.0.0","title":"Panorama Viewer","category":"widgets","description":"Interactive Viewer for Panorama Image and video.","keywords":["panorama viewer","panorama block","b-blocks panorama"],"textdomain":"panorama","supports":{"align":["wide","full"],"html":false},"example":{"attributes":{}},"editorScript":"file:./index.js","editorStyle":"file:./index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/blocks/parent/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/parent/block.json");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit */ "./src/blocks/parent/Edit.js");
/* harmony import */ var _parent_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parent.scss */ "./src/blocks/parent/parent.scss");
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\parent\\index.js",
  _this = undefined;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
  InnerBlocks = _wp$blockEditor.InnerBlocks,
  useBlockProps = _wp$blockEditor.useBlockProps;



registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  icon: "images-alt2",
  edit: _Edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: function save() {
    var blockProps = useBlockProps.save();
    return /*#__PURE__*/React.createElement("div", _extends({}, blockProps, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 7
      }
    }), /*#__PURE__*/React.createElement(InnerBlocks.Content, {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 9
      }
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map