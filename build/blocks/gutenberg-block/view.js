/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../bpl-tools/utils/common.js":
/*!************************************!*\
  !*** ../bpl-tools/utils/common.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVGSanitizer: () => (/* binding */ SVGSanitizer),
/* harmony export */   escapeHTML: () => (/* binding */ escapeHTML),
/* harmony export */   isExist: () => (/* binding */ isExist),
/* harmony export */   sanitizeHTML: () => (/* binding */ sanitizeHTML),
/* harmony export */   sanitizeInput: () => (/* binding */ sanitizeInput),
/* harmony export */   sanitizeURL: () => (/* binding */ sanitizeURL)
/* harmony export */ });
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isExist = function isExist(value) {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  if (_typeof(value) === 'object' && Object.keys(value).length === 0) {
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  if (typeof value === 'number' && value === 0) {
    return false;
  }
  return true;
};
var escapeHTML = function escapeHTML() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!input) {
    return '';
  }

  // Regular expression to match all HTML tags and their attributes
  return input === null || input === void 0 ? void 0 : input.replace(/<([a-z][a-z0-9]*)\b([^>]*)>/gi, function (match, tagName, attrs) {
    // List of allowed tags and their attributes
    var allowedTags = ['b', 'strong', 'i', 'em', 'span', 'a', 'br'];
    var allowedAttrs = ['style', 'href', 'target', 'rel', 'class'];

    // If the tag is allowed, keep it, but sanitize its attributes
    if (allowedTags.includes(tagName.toLowerCase())) {
      // Process the tag's attributes
      var sanitizedAttrs = attrs.replace(/([a-z0-9-]+)=["'][^"']*["']/gi, function (attrMatch, attrName) {
        // Only keep allowed attributes
        if (allowedAttrs.includes(attrName.toLowerCase())) {
          return attrMatch; // Keep allowed attributes as they are
        }
        return ''; // Remove any other attributes
      });
      return "<".concat(tagName).concat(sanitizedAttrs, ">");
    }
    return match === null || match === void 0 ? void 0 : match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });
};
var sanitizeURL = function sanitizeURL(inputUrl) {
  try {
    var url = new URL(inputUrl);

    // 1. Check for safe protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return null;
    } else {
      // 2. Strip query and fragment for safety
      // url.search = '';
      // url.hash = '';

      return url.toString();
    }
  } catch (err) {
    if (typeof inputUrl === 'string' && inputUrl.startsWith('/') && !inputUrl.startsWith('//')) {
      return inputUrl;
    } else {
      return null;
    }
  }
};
var sanitizeHTML = function sanitizeHTML(input) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(input, 'text/html');
  var allowedTags = ['b', 'strong', 'i', 'em', 'span', 'a', 'br'];
  var allowedAttrs = ['style', 'href', 'target', 'rel', 'class'];
  doc.body.querySelectorAll('*').forEach(function (node) {
    // Remove disallowed tags
    if (!allowedTags.includes(node.tagName.toLowerCase())) {
      node.remove();
      return;
    }

    // Loop through attributes and sanitize
    _toConsumableArray(node.attributes).forEach(function (attr) {
      if (!allowedAttrs.includes(attr.name)) {
        node.removeAttribute(attr.name);
      }

      // if (attr.name === 'href' && attr.value.trim().toLowerCase().startsWith('javascript:')) {
      // 	node.removeAttribute('href');
      // }

      if (attr.name === 'href') {
        var sanitizeHref = sanitizeURL(attr.value);
        if (sanitizeHref) {
          node.setAttribute('href', sanitizeHref);
        } else {
          node.removeAttribute('href');
        }
      }
    });
  });
  return doc.body.innerHTML;
};
var sanitizeInput = function sanitizeInput(input) {
  return input.replace(/[<>]/g, '').replace(/javascript:/gi, '').replace(/on\w+=/gi, '').trim();
};

//-------- Sanitize SVG ----------//
var SVGSanitizer = /*#__PURE__*/function () {
  function SVGSanitizer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SVGSanitizer);
    this.defaultOptions = {
      allowedTags: ['svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan', 'defs', 'clipPath', 'mask', 'linearGradient', 'radialGradient', 'stop', 'style', 'title', 'desc'],
      allowedAttributes: ['id', 'class', 'style', 'transform', 'd', 'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 'points', 'x1', 'y1', 'x2', 'y2', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'fill-opacity', 'stroke-opacity', 'viewBox', 'preserveAspectRatio', 'xmlns', 'xmlns:xlink'],
      allowedProtocols: ['http', 'https', 'data'],
      removeScripts: true,
      removeEvents: true,
      removeExternalResources: true,
      sanitizeStyle: true
    };
    this.options = _objectSpread(_objectSpread({}, this.defaultOptions), options);
  }
  return _createClass(SVGSanitizer, [{
    key: "sanitize",
    value: function sanitize(svgString) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgString, 'image/svg+xml');
      this.removeScripts(doc);
      this.sanitizeElements(doc);
      var serializer = new XMLSerializer();
      return serializer.serializeToString(doc.documentElement);
    }

    // ✅ New method: sanitize from File object
  }, {
    key: "sanitizeFile",
    value: function () {
      var _sanitizeFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
        var response, svgText;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(file);
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.text();
            case 5:
              svgText = _context.sent;
              return _context.abrupt("return", this.sanitize("".concat(svgText)));
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sanitizeFile(_x) {
        return _sanitizeFile.apply(this, arguments);
      }
      return sanitizeFile;
    }()
  }, {
    key: "removeScripts",
    value: function removeScripts(doc) {
      if (this.options.removeScripts) {
        var scripts = doc.querySelectorAll('script');
        scripts.forEach(function (script) {
          return script.remove();
        });
        var allElements = doc.querySelectorAll('*');
        allElements.forEach(function (el) {
          if (el.tagName.toLowerCase().includes('script')) {
            el.remove();
          }
        });
      }
    }
  }, {
    key: "sanitizeElements",
    value: function sanitizeElements(doc) {
      var _this = this;
      var allElements = doc.querySelectorAll('*');
      allElements.forEach(function (element) {
        var tagName = element.tagName.toLowerCase();
        if (!_this.options.allowedTags.includes(tagName)) {
          element.remove();
          return;
        }
        _this.sanitizeAttributes(element);
      });
    }
  }, {
    key: "sanitizeAttributes",
    value: function sanitizeAttributes(element) {
      var _this2 = this;
      var attributes = Array.from(element.attributes);
      attributes.forEach(function (attr) {
        var attrName = attr.name.toLowerCase();
        var attrValue = attr.value;
        if (_this2.options.removeEvents && attrName.startsWith('on')) {
          element.removeAttribute(attrName);
          return;
        }
        if (_this2.options.removeExternalResources) {
          if ((attrName === 'href' || attrName === 'xlink:href') && !_this2.isAllowedUrl(attrValue)) {
            element.removeAttribute(attrName);
            return;
          }
        }
        var baseAttrName = attrName.replace('xlink:', '');
        if (!_this2.options.allowedAttributes.includes(baseAttrName)) {
          element.removeAttribute(attrName);
          return;
        }
        if (attrName === 'style' && _this2.options.sanitizeStyle) {
          _this2.sanitizeStyleAttribute(element, attrValue);
        }
      });
    }
  }, {
    key: "isAllowedUrl",
    value: function isAllowedUrl(url) {
      if (url.startsWith('data:') || url.startsWith('#')) {
        return true;
      }
      try {
        var parsedUrl = new URL(url);
        return this.options.allowedProtocols.includes(parsedUrl.protocol.replace(':', ''));
      } catch (_unused) {
        return false;
      }
    }
  }, {
    key: "sanitizeStyleAttribute",
    value: function sanitizeStyleAttribute(element, styleValue) {
      var safeStyle = styleValue.replace(/expression\(|javascript:|url\(javascript:/gi, '').replace(/behavior\s*:/gi, '').replace(/binding\s*:/gi, '');
      element.setAttribute('style', safeStyle);
    }
  }]);
}();

/***/ }),

/***/ "../bpl-tools/utils/data.js":
/*!**********************************!*\
  !*** ../bpl-tools/utils/data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentColor: () => (/* binding */ contentColor),
/* harmony export */   deskBreakpoint: () => (/* binding */ deskBreakpoint),
/* harmony export */   gradient: () => (/* binding */ gradient),
/* harmony export */   mobileBreakpoint: () => (/* binding */ mobileBreakpoint),
/* harmony export */   primaryColor: () => (/* binding */ primaryColor),
/* harmony export */   primaryColor100: () => (/* binding */ primaryColor100),
/* harmony export */   primaryColor1000: () => (/* binding */ primaryColor1000),
/* harmony export */   primaryColor200: () => (/* binding */ primaryColor200),
/* harmony export */   primaryColor300: () => (/* binding */ primaryColor300),
/* harmony export */   primaryColor400: () => (/* binding */ primaryColor400),
/* harmony export */   primaryColor500: () => (/* binding */ primaryColor500),
/* harmony export */   primaryColor600: () => (/* binding */ primaryColor600),
/* harmony export */   primaryColor700: () => (/* binding */ primaryColor700),
/* harmony export */   primaryColor800: () => (/* binding */ primaryColor800),
/* harmony export */   primaryColor900: () => (/* binding */ primaryColor900),
/* harmony export */   secondaryColor: () => (/* binding */ secondaryColor),
/* harmony export */   tabBreakpoint: () => (/* binding */ tabBreakpoint),
/* harmony export */   titleColor: () => (/* binding */ titleColor)
/* harmony export */ });
var deskBreakpoint = '@media only screen and (min-width: 1025px)';
var tabBreakpoint = '@media only screen and (max-width: 1024px)';
var mobileBreakpoint = '@media only screen and (max-width: 640px)';
var primaryColor = '#146EF5';
var primaryColor100 = '#e7f0fe';
var primaryColor200 = '#b6d2fc';
var primaryColor300 = '#85b4fa';
var primaryColor400 = '#5495f8';
var primaryColor500 = '#2377f6';
var primaryColor600 = '#095edc';
var primaryColor700 = '#0749ab';
var primaryColor800 = '#05347a';
var primaryColor900 = '#031f49';
var primaryColor1000 = '#010a18';
var secondaryColor = '#FF7A00';
var titleColor = '#070127';
var contentColor = '#485781';
var gradient = 'linear-gradient(135deg, #0040E3, #18D4FD)';

/***/ }),

/***/ "../bpl-tools/utils/getCSS.js":
/*!************************************!*\
  !*** ../bpl-tools/utils/getCSS.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAdvBGCSS: () => (/* binding */ getAdvBGCSS),
/* harmony export */   getBackgroundCSS: () => (/* binding */ getBackgroundCSS),
/* harmony export */   getBorderBoxCSS: () => (/* binding */ getBorderBoxCSS),
/* harmony export */   getBorderCSS: () => (/* binding */ getBorderCSS),
/* harmony export */   getBoxCSS: () => (/* binding */ getBoxCSS),
/* harmony export */   getColorsCSS: () => (/* binding */ getColorsCSS),
/* harmony export */   getGradientCSS: () => (/* binding */ getGradientCSS),
/* harmony export */   getIconCSS: () => (/* binding */ getIconCSS),
/* harmony export */   getMaskCSS: () => (/* binding */ getMaskCSS),
/* harmony export */   getMultiShadowCSS: () => (/* binding */ getMultiShadowCSS),
/* harmony export */   getOverlayCSS: () => (/* binding */ getOverlayCSS),
/* harmony export */   getSeparatorCSS: () => (/* binding */ getSeparatorCSS),
/* harmony export */   getShadowCSS: () => (/* binding */ getShadowCSS),
/* harmony export */   getSpaceCSS: () => (/* binding */ getSpaceCSS),
/* harmony export */   getTransformCSS: () => (/* binding */ getTransformCSS),
/* harmony export */   getTypoCSS: () => (/* binding */ getTypoCSS),
/* harmony export */   isValidCSS: () => (/* binding */ isValidCSS)
/* harmony export */ });
/* harmony import */ var _Components_Mask_assets_shapes_blob_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/blob.svg */ "../bpl-tools/Components/Mask/assets/shapes/blob.svg");
/* harmony import */ var _Components_Mask_assets_shapes_circle_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/circle.svg */ "../bpl-tools/Components/Mask/assets/shapes/circle.svg");
/* harmony import */ var _Components_Mask_assets_shapes_flower_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/flower.svg */ "../bpl-tools/Components/Mask/assets/shapes/flower.svg");
/* harmony import */ var _Components_Mask_assets_shapes_hexagon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/hexagon.svg */ "../bpl-tools/Components/Mask/assets/shapes/hexagon.svg");
/* harmony import */ var _Components_Mask_assets_shapes_sketch_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/sketch.svg */ "../bpl-tools/Components/Mask/assets/shapes/sketch.svg");
/* harmony import */ var _Components_Mask_assets_shapes_triangle_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/Mask/assets/shapes/triangle.svg */ "../bpl-tools/Components/Mask/assets/shapes/triangle.svg");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common */ "../bpl-tools/utils/common.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data */ "../bpl-tools/utils/data.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }








var isValidCSS = function isValidCSS(p, v) {
  return (0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(v) ? "".concat(p, ": ").concat(v, ";") : '';
};
var getBackgroundCSS = function getBackgroundCSS(bg) {
  var isSolid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var isGradient = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var isImage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var _ref = bg || {},
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'solid' : _ref$type,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '' : _ref$color,
    _ref$gradient = _ref.gradient,
    gradient = _ref$gradient === void 0 ? _data__WEBPACK_IMPORTED_MODULE_7__.gradient : _ref$gradient,
    _ref$image = _ref.image,
    image = _ref$image === void 0 ? {} : _ref$image,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? 'center center' : _ref$position,
    _ref$attachment = _ref.attachment,
    attachment = _ref$attachment === void 0 ? '' : _ref$attachment,
    _ref$repeat = _ref.repeat,
    repeat = _ref$repeat === void 0 ? 'no-repeat' : _ref$repeat,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? '' : _ref$size,
    _ref$overlayColor = _ref.overlayColor,
    overlayColor = _ref$overlayColor === void 0 ? '' : _ref$overlayColor;
  var styles = 'gradient' === type && isGradient ? isValidCSS('background', gradient) : 'image' === type && isImage ? "background: url(".concat(image === null || image === void 0 ? void 0 : image.url, ");\n\t\t\t\t").concat(isValidCSS('background-color', overlayColor), "\n\t\t\t\t").concat(isValidCSS('background-position', position), "\n\t\t\t\t").concat(isValidCSS('background-size', size), "\n\t\t\t\t").concat(isValidCSS('background-repeat', repeat), "\n\t\t\t\t").concat(isValidCSS('background-attachment', attachment), "\n\t\t\t\t").concat(isValidCSS('background-repeat', repeat), "\n\t\t\t\tbackground-blend-mode: overlay;") : isSolid && isValidCSS('background', color);
  return styles;
};
var getBorderCSS = function getBorderCSS(border) {
  var _ref2 = border || {},
    _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? '' : _ref2$width,
    _ref2$style = _ref2.style,
    style = _ref2$style === void 0 ? 'solid' : _ref2$style,
    _ref2$color = _ref2.color,
    color = _ref2$color === void 0 ? '' : _ref2$color,
    _ref2$side = _ref2.side,
    side = _ref2$side === void 0 ? 'all' : _ref2$side,
    _ref2$radius = _ref2.radius,
    radius = _ref2$radius === void 0 ? '' : _ref2$radius;
  var borderSideCheck = function borderSideCheck(s) {
    var bSide = side === null || side === void 0 ? void 0 : side.toLowerCase();
    return (bSide === null || bSide === void 0 ? void 0 : bSide.includes('all')) || (bSide === null || bSide === void 0 ? void 0 : bSide.includes(s));
  };
  var borderCSS = "".concat(width, " ").concat(style, " ").concat(color);
  var styles = "\n\t\t".concat(!width || parseInt(width) === 0 ? '' : ['top', 'right', 'bottom', 'left'].map(function (side) {
    return borderSideCheck(side) ? "border-".concat(side, ": ").concat(borderCSS, ";") : '';
  }).join(''), "\n\t\t").concat(isValidCSS('border-radius', radius), "\n\t");
  return styles;
};
var getBorderBoxCSS = function getBorderBoxCSS(border) {
  if (!border) return '';
  var generateBorderCSS = function generateBorderCSS(borderObj) {
    var _borderObj$color = borderObj.color,
      color = _borderObj$color === void 0 ? '#000000' : _borderObj$color,
      _borderObj$style = borderObj.style,
      style = _borderObj$style === void 0 ? 'solid' : _borderObj$style,
      _borderObj$width = borderObj.width,
      width = _borderObj$width === void 0 ? '0px' : _borderObj$width;
    return "".concat(width, " ").concat(style, " ").concat(color);
  };
  if ('object' === _typeof(border) && !Array.isArray(border)) {
    if (border.hasOwnProperty('top') || border.hasOwnProperty('right') || border.hasOwnProperty('bottom') || border.hasOwnProperty('left')) {
      var sides = ['top', 'right', 'bottom', 'left'];
      return sides.map(function (side) {
        return border[side] ? "border-".concat(side, ": ").concat(generateBorderCSS(border[side]), ";") : '';
      }).join(' ').trim();
    } else {
      return isValidCSS('border', generateBorderCSS(border));
    }
  }
  return '';
};
var getColorsCSS = function getColorsCSS(colors) {
  var _ref3 = colors || {},
    _ref3$color = _ref3.color,
    color = _ref3$color === void 0 ? '' : _ref3$color,
    _ref3$bgType = _ref3.bgType,
    bgType = _ref3$bgType === void 0 ? 'solid' : _ref3$bgType,
    _ref3$bg = _ref3.bg,
    bg = _ref3$bg === void 0 ? '' : _ref3$bg,
    _ref3$gradient = _ref3.gradient,
    gradient = _ref3$gradient === void 0 ? _data__WEBPACK_IMPORTED_MODULE_7__.gradient : _ref3$gradient;
  var styles = "\n\t\t".concat(isValidCSS('color', color), "\n\t\t").concat(gradient || bg ? isValidCSS('background', 'gradient' === bgType ? gradient : bg) : '', "\n\t");
  return styles;
};
var getIconCSS = function getIconCSS(icon) {
  var isSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var isColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var _ref4 = icon || {},
    _ref4$fontSize = _ref4.fontSize,
    fontSize = _ref4$fontSize === void 0 ? 16 : _ref4$fontSize,
    _ref4$colorType = _ref4.colorType,
    colorType = _ref4$colorType === void 0 ? 'solid' : _ref4$colorType,
    _ref4$color = _ref4.color,
    color = _ref4$color === void 0 ? 'inherit' : _ref4$color,
    _ref4$gradient = _ref4.gradient,
    gradient = _ref4$gradient === void 0 ? _data__WEBPACK_IMPORTED_MODULE_7__.gradient : _ref4$gradient;
  var colorCSS = 'gradient' === colorType ? "color: transparent; background-image: ".concat(gradient, "; -webkit-background-clip: text; background-clip: text;") : isValidCSS('color', color);
  var styles = "\n\t\t".concat(!fontSize || !isSize ? '' : isValidCSS('font-size', fontSize ? "".concat(fontSize, "px") : ''), "\n\t\t").concat(isColor ? colorCSS : '', "\n\t");
  return styles;
};
var getMultiShadowCSS = function getMultiShadowCSS(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'box';
  var styles = '';
  value === null || value === void 0 || value.map(function (item, index) {
    var _ref5 = item || {},
      _ref5$hOffset = _ref5.hOffset,
      hOffset = _ref5$hOffset === void 0 ? '0px' : _ref5$hOffset,
      _ref5$vOffset = _ref5.vOffset,
      vOffset = _ref5$vOffset === void 0 ? '0px' : _ref5$vOffset,
      _ref5$blur = _ref5.blur,
      blur = _ref5$blur === void 0 ? '0px' : _ref5$blur,
      _ref5$spreed = _ref5.spreed,
      spreed = _ref5$spreed === void 0 ? '0px' : _ref5$spreed,
      _ref5$color = _ref5.color,
      color = _ref5$color === void 0 ? '#e7f0fe' : _ref5$color,
      _ref5$isInset = _ref5.isInset,
      isInset = _ref5$isInset === void 0 ? false : _ref5$isInset;
    var inset = isInset ? 'inset' : '';
    var offsetBlur = "".concat(hOffset, " ").concat(vOffset, " ").concat(blur);
    var isComa = index + 1 >= value.length ? '' : ', ';
    styles += 'text' === type ? "".concat(offsetBlur, " ").concat(color).concat(isComa) : "".concat(offsetBlur, " ").concat(spreed, " ").concat(color, " ").concat(inset).concat(isComa);
  });
  return styles || '';
};
var getSeparatorCSS = function getSeparatorCSS(separator) {
  var _ref6 = separator || {},
    _ref6$width = _ref6.width,
    width = _ref6$width === void 0 ? '50%' : _ref6$width,
    _ref6$height = _ref6.height,
    height = _ref6$height === void 0 ? '2px' : _ref6$height,
    _ref6$style = _ref6.style,
    style = _ref6$style === void 0 ? 'solid' : _ref6$style,
    _ref6$color = _ref6.color,
    color = _ref6$color === void 0 ? _data__WEBPACK_IMPORTED_MODULE_7__.primaryColor300 : _ref6$color;
  var styles = "\n\t\t".concat(isValidCSS('width', width), "\n\t\t").concat(0 === parseInt(height) ? '' : "border-top: ".concat(height, " ").concat(style, " ").concat(color, ";"), "\n\t");
  return styles;
};
var getShadowCSS = function getShadowCSS(shadow) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'box';
  var _ref7 = shadow || {},
    _ref7$hOffset = _ref7.hOffset,
    hOffset = _ref7$hOffset === void 0 ? '0px' : _ref7$hOffset,
    _ref7$vOffset = _ref7.vOffset,
    vOffset = _ref7$vOffset === void 0 ? '0px' : _ref7$vOffset,
    _ref7$blur = _ref7.blur,
    blur = _ref7$blur === void 0 ? '0px' : _ref7$blur,
    _ref7$spreed = _ref7.spreed,
    spreed = _ref7$spreed === void 0 ? '0px' : _ref7$spreed,
    _ref7$color = _ref7.color,
    color = _ref7$color === void 0 ? '#7090b0' : _ref7$color,
    _ref7$isInset = _ref7.isInset,
    isInset = _ref7$isInset === void 0 ? false : _ref7$isInset;
  var inset = isInset ? 'inset' : '';
  var offsetBlur = "".concat(hOffset, " ").concat(vOffset, " ").concat(blur);
  var styles = 'text' === type ? "".concat(offsetBlur, " ").concat(color) : "".concat(offsetBlur, " ").concat(spreed, " ").concat(color, " ").concat(inset);
  return styles || 'none';
};
var getSpaceCSS = function getSpaceCSS(space) {
  var _ref8 = space || {},
    _ref8$side = _ref8.side,
    side = _ref8$side === void 0 ? 2 : _ref8$side,
    _ref8$vertical = _ref8.vertical,
    vertical = _ref8$vertical === void 0 ? '0px' : _ref8$vertical,
    _ref8$horizontal = _ref8.horizontal,
    horizontal = _ref8$horizontal === void 0 ? '0px' : _ref8$horizontal,
    _ref8$top = _ref8.top,
    top = _ref8$top === void 0 ? '0px' : _ref8$top,
    _ref8$right = _ref8.right,
    right = _ref8$right === void 0 ? '0px' : _ref8$right,
    _ref8$bottom = _ref8.bottom,
    bottom = _ref8$bottom === void 0 ? '0px' : _ref8$bottom,
    _ref8$left = _ref8.left,
    left = _ref8$left === void 0 ? '0px' : _ref8$left;
  var styles = 2 === side ? "".concat(vertical, " ").concat(horizontal) : "".concat(top, " ").concat(right, " ").concat(bottom, " ").concat(left);
  return styles;
};
var getTypoCSS = function getTypoCSS(selector, typo) {
  var isFamily = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var _ref9 = typo || {},
    _ref9$fontFamily = _ref9.fontFamily,
    fontFamily = _ref9$fontFamily === void 0 ? 'Default' : _ref9$fontFamily,
    _ref9$fontCategory = _ref9.fontCategory,
    fontCategory = _ref9$fontCategory === void 0 ? 'sans-serif' : _ref9$fontCategory,
    _ref9$fontVariant = _ref9.fontVariant,
    fontVariant = _ref9$fontVariant === void 0 ? 400 : _ref9$fontVariant,
    fontWeight = _ref9.fontWeight,
    _ref9$isUploadFont = _ref9.isUploadFont,
    isUploadFont = _ref9$isUploadFont === void 0 ? true : _ref9$isUploadFont,
    _ref9$fontSize = _ref9.fontSize,
    fontSize = _ref9$fontSize === void 0 ? {
      desktop: null,
      tablet: null,
      mobile: null
    } : _ref9$fontSize,
    fontStyle = _ref9.fontStyle,
    textTransform = _ref9.textTransform,
    textDecoration = _ref9.textDecoration,
    lineHeight = _ref9.lineHeight,
    letterSpace = _ref9.letterSpace;
  var isEmptyFamily = !isFamily || !fontFamily || 'Default' === fontFamily;
  var desktopFontSize = (fontSize === null || fontSize === void 0 ? void 0 : fontSize.desktop) || fontSize;
  var tabletFontSize = (fontSize === null || fontSize === void 0 ? void 0 : fontSize.tablet) || desktopFontSize;
  var mobileFontSize = (fontSize === null || fontSize === void 0 ? void 0 : fontSize.mobile) || tabletFontSize;
  var checkUnit = function checkUnit(size) {
    var value = String(size);
    var units = ['px', 'em', 'rem', '%', 'vh', 'vw'];
    if (units.some(function (unit) {
      return value.endsWith(unit);
    })) {
      return value;
    } else if (typeof size === 'number') {
      return "".concat(value, "px");
    }
    return '';
  };
  var styles = "\n\t\t".concat(isEmptyFamily ? '' : "font-family: '".concat(fontFamily, "', ").concat(fontCategory, ";"), "\n\t\t").concat(isValidCSS('font-weight', fontWeight), "\n\t\t").concat(isValidCSS('font-size', checkUnit(desktopFontSize)), "\n\t\t").concat(isValidCSS('font-style', fontStyle), "\n\t\t").concat(isValidCSS('text-transform', textTransform), "\n\t\t").concat(isValidCSS('text-decoration', textDecoration), "\n\t\t").concat(isValidCSS('line-height', lineHeight), "\n\t\t").concat(isValidCSS('letter-spacing', letterSpace), "\n\t");

  // Google font link
  var linkQuery = !fontVariant || 400 === fontVariant ? '' : '400i' === fontVariant ? ':ital@1' : fontVariant !== null && fontVariant !== void 0 && fontVariant.includes('00i') ? ": ital, wght@1, ".concat(fontVariant === null || fontVariant === void 0 ? void 0 : fontVariant.replace('00i', '00'), " ") : ": wght@".concat(fontVariant, " ");
  var link = isEmptyFamily ? '' : "https://fonts.googleapis.com/css2?family=".concat(fontFamily === null || fontFamily === void 0 ? void 0 : fontFamily.split(' ').join('+')).concat(linkQuery.replace(/ /g, ''), "&display=swap");
  return {
    googleFontLink: !isUploadFont || isEmptyFamily ? '' : "@import url(".concat(link, ");"),
    styles: "".concat(selector, "{\n\t\t\t").concat(styles, "\n\t\t}\n\t\t").concat(_data__WEBPACK_IMPORTED_MODULE_7__.tabBreakpoint, " {\n\t\t\t").concat(selector, "{\n\t\t\t\t").concat(isValidCSS('font-size', checkUnit(tabletFontSize)), "\n\t\t\t}\n\t\t}\n\t\t").concat(_data__WEBPACK_IMPORTED_MODULE_7__.mobileBreakpoint, " {\n\t\t\t").concat(selector, "{\n\t\t\t\t").concat(isValidCSS('font-size', checkUnit(mobileFontSize)), "\n\t\t\t}\n\t\t}").replace(/\s+/g, ' ').trim()
  };
};
var getBoxCSS = function getBoxCSS(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (_typeof(val) === 'object' && !Array.isArray(val)) {
    var order = ['top', 'right', 'bottom', 'left'];
    var values = order.map(function (side) {
      return val[side] || '';
    });
    var allEmpty = values.every(function (value) {
      return !value;
    });
    return allEmpty ? '' : order.map(function (side) {
      return val[side] || '0';
    }).join(' ');
  }
  return '';
};

// Murad Wahid
var getGradientCSS = function getGradientCSS(gradient) {
  var _ref10 = gradient || {},
    _ref10$type = _ref10.type,
    type = _ref10$type === void 0 ? 'linear' : _ref10$type,
    _ref10$radialType = _ref10.radialType,
    radialType = _ref10$radialType === void 0 ? 'ellipse' : _ref10$radialType,
    _ref10$colors = _ref10.colors,
    colors = _ref10$colors === void 0 ? [] : _ref10$colors,
    _ref10$centerPosition = _ref10.centerPositions,
    centerPositions = _ref10$centerPosition === void 0 ? {
      x: 0,
      y: 0
    } : _ref10$centerPosition,
    _ref10$angel = _ref10.angel,
    angel = _ref10$angel === void 0 ? 0 : _ref10$angel;
  if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(gradient)) {
    var gradientColors = colors === null || colors === void 0 ? void 0 : colors.map(function (_ref11) {
      var color = _ref11.color,
        position = _ref11.position;
      return "".concat(color, " ").concat(position, "%");
    });
    var liner = "linear-gradient(".concat(angel, "deg, ").concat(gradientColors, ")");
    var radial = "radial-gradient(".concat(radialType, " at ").concat(centerPositions === null || centerPositions === void 0 ? void 0 : centerPositions.x, "% ").concat(centerPositions === null || centerPositions === void 0 ? void 0 : centerPositions.y, "%,").concat(gradientColors, ")");
    return isValidCSS('background', type === 'radial' ? radial : liner);
  }
  return '';
};
var getImagePosition = function getImagePosition(img) {
  var _ref12 = img || {},
    _ref12$position = _ref12.position,
    position = _ref12$position === void 0 ? 'center center' : _ref12$position,
    _ref12$xPosition = _ref12.xPosition,
    xPosition = _ref12$xPosition === void 0 ? 0 : _ref12$xPosition,
    _ref12$yPosition = _ref12.yPosition,
    yPosition = _ref12$yPosition === void 0 ? 0 : _ref12$yPosition,
    _ref12$attachment = _ref12.attachment,
    attachment = _ref12$attachment === void 0 ? '' : _ref12$attachment,
    _ref12$repeat = _ref12.repeat,
    repeat = _ref12$repeat === void 0 ? 'no-repeat' : _ref12$repeat,
    _ref12$size = _ref12.size,
    size = _ref12$size === void 0 ? 'cover' : _ref12$size,
    _ref12$customSize = _ref12.customSize,
    customSize = _ref12$customSize === void 0 ? '0px' : _ref12$customSize;
  var cd = function cd(v) {
    return 'initial' !== v || (0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(v);
  };
  return "\n\t\t".concat(cd(position) ? "background-position: ".concat('custom' === position ? "".concat(xPosition, " ").concat(yPosition) : position, ";") : '', "\n\t\t").concat(attachment && cd(attachment) ? "background-attachment: ".concat(attachment, ";") : '', "\n\t\t").concat(cd(repeat) ? "background-repeat: ".concat(repeat, ";") : '', "\n\t\t").concat(cd(size) ? "background-size: ".concat('custom' === size ? "".concat(customSize, " auto") : size, ";") : '', "\n\t");
};
var getImageCSS = function getImageCSS() {
  var img = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (img) {
    return {
      desktop: (0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(img.url) ? "background-image: url(".concat(img.url, "); ").concat(getImagePosition(img === null || img === void 0 ? void 0 : img.desktop)) : '',
      tablet: (0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(img.url) ? getImagePosition(img === null || img === void 0 ? void 0 : img.tablet) : '',
      mobile: (0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(img.url) ? getImagePosition(img === null || img === void 0 ? void 0 : img.mobile) : ''
    };
  }
  return '';
};
var getVideoCSS = function getVideoCSS(video, selector) {
  var _ref13 = video || {},
    url = _ref13.url,
    loop = _ref13.loop;
  var parentEl = document.querySelector(selector);
  var el = parentEl === null || parentEl === void 0 ? void 0 : parentEl.querySelector('.bPlVideo');
  var videoEl = document.createElement('video');
  videoEl.muted = true;
  videoEl.autoplay = true;
  videoEl.classList.add('bPlVideo');
  if (!el) {
    if (parentEl && url) {
      videoEl.innerHTML = "<source src=".concat(url, "></source>");
      parentEl.appendChild(videoEl);
    }
  }
  videoEl.loop = loop;
  videoEl.play();
  return "".concat(selector, " .bPlVideo{\n\t\tleft: 0;\n\t\tmin-height: 100%;\n\t\tmin-width: 100%;\n\t\tposition: absolute;\n\t\twidth: -webkit-fill-available;\n\t\ttop: 0;\n\t\tz-index: 0;\n\t}");
};
var getAdvBGCSS = function getAdvBGCSS(background, selector) {
  var isHover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _ref14 = background || {},
    _ref14$type = _ref14.type,
    type = _ref14$type === void 0 ? 'color' : _ref14$type,
    color = _ref14.color,
    gradient = _ref14.gradient,
    img = _ref14.img,
    video = _ref14.video;
  var bgCSS = type === 'color' ? isValidCSS('background', color) : type === 'gradient' ? getGradientCSS(gradient) : type === 'image' ? getImageCSS(img).desktop : '';
  var tablet = type === 'image' ? getImageCSS(img).tablet : '';
  var mobile = type === 'image' ? getImageCSS(img).mobile : '';
  var sl = isHover ? "".concat(selector, ":hover") : selector;
  return "\n\t\t".concat(type === 'video' ? getVideoCSS(video, selector) : '', "\n\n\t\t").concat(bgCSS ? "".concat(sl, "{\n\t\t\t").concat(bgCSS, "\n\t\t}") : '', "\n\n\t\t").concat(tablet ? "".concat(_data__WEBPACK_IMPORTED_MODULE_7__.tabBreakpoint, " {\n\t\t\t").concat(sl, "{\n\t\t\t\t").concat(tablet, "\n\t\t\t}\n\t\t}") : '', "\n\n\t\t").concat(mobile ? "".concat(_data__WEBPACK_IMPORTED_MODULE_7__.mobileBreakpoint, " {\n\t\t\t").concat(sl, "{\n\t\t\t\t").concat(mobile, "\n\t\t\t}\n\t\t}") : '', "\n\t").replace(/\s+/g, ' ').trim();
};
var getOverlayCSS = function getOverlayCSS(overlay, selector) {
  var isHover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _ref15 = overlay || {},
    isEnabled = _ref15.isEnabled,
    colors = _ref15.colors,
    _ref15$opacity = _ref15.opacity,
    opacity = _ref15$opacity === void 0 ? 1 : _ref15$opacity,
    blend = _ref15.blend,
    _ref15$filter = _ref15.filter,
    filter = _ref15$filter === void 0 ? '' : _ref15$filter,
    _ref15$blur = _ref15.blur,
    blur = _ref15$blur === void 0 ? 0 : _ref15$blur,
    _ref15$brightness = _ref15.brightness,
    brightness = _ref15$brightness === void 0 ? 100 : _ref15$brightness,
    _ref15$contrast = _ref15.contrast,
    contrast = _ref15$contrast === void 0 ? 100 : _ref15$contrast,
    _ref15$saturation = _ref15.saturation,
    saturation = _ref15$saturation === void 0 ? 100 : _ref15$saturation,
    _ref15$hue = _ref15.hue,
    hue = _ref15$hue === void 0 ? 0 : _ref15$hue,
    _ref15$position = _ref15.position,
    position = _ref15$position === void 0 ? {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    } : _ref15$position,
    _ref15$zIndex = _ref15.zIndex,
    zIndex = _ref15$zIndex === void 0 ? -1 : _ref15$zIndex;
  var filterCSSValue = "".concat(100 !== brightness ? "brightness(".concat(brightness, "%)") : '', " ").concat(100 !== contrast ? "contrast(".concat(contrast, "%)") : '', " ").concat(100 !== saturation ? "saturate(".concat(saturation, "%)") : '', " ").concat(0 !== blur ? "blur(".concat(blur, "px)") : '', " ").concat(0 !== hue ? "hue-rotate(".concat(hue, "deg)") : '');
  var filterCSS = "".concat(filter, ": ").concat(filter ? filterCSSValue : '', "; -webkit-").concat(filter, ": ").concat(filter ? filterCSSValue : '', ";");
  var sl = isHover ? "".concat(selector, ":hover::after") : "".concat(selector, "::after");
  return isEnabled ? "\n\t\t".concat(selector, "{\n\t\t\tposition:relative;\n\t\t\tz-index:1;\n\t\t}\n\t\t").concat(selector, "::after{\n\t\t\tcontent: '';\n\t\t\tposition: absolute;\n\t\t\ttop:").concat((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(position.top) ? position.top : 0, ";\n\t\t\tright:").concat((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(position.right) ? position.right : 0, ";\n\t\t\tbottom:").concat((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(position.bottom) ? position.bottom : 0, ";\n\t\t\tleft:").concat((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(position.left) ? position.left : 0, ";\n\t\t\tz-index:").concat(zIndex, ";\n\t\t}\n\t\t").concat(getAdvBGCSS(colors, sl, false), "\n\t\t").concat(sl, "{\n\t\t\t").concat(isValidCSS('opacity', opacity), "\n\t\t\t").concat(isValidCSS('mix-blend-mode', blend), "\n\t\t\t").concat(filterCSS, "\n\t\t}\n\t").replace(/\s+/g, ' ').trim() : '';
};
var getTransformCSS = function getTransformCSS(transform, selector) {
  var isHover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var generateTransformCSS = function generateTransformCSS(value) {
    var device = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desktop';
    if (!(0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(value)) return '';
    var skew = value.skew,
      scale = value.scale,
      rotate = value.rotate,
      offset = value.offset,
      flipX = value.flipX,
      flipY = value.flipY;
    var _ref16 = rotate || {},
      threeDRotate = _ref16.threeDRotate;
    var _ref17 = scale || {},
      isProportion = _ref17.isProportion;
    var transforms = [];
    //skew
    if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(skew)) {
      var _skew$device, _skew$device2;
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(skew === null || skew === void 0 || (_skew$device = skew[device]) === null || _skew$device === void 0 ? void 0 : _skew$device.x)) transforms.push("skewX(".concat(skew[device].x, "deg)"));
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(skew === null || skew === void 0 || (_skew$device2 = skew[device]) === null || _skew$device2 === void 0 ? void 0 : _skew$device2.y)) transforms.push("skewY(".concat(skew[device].y, "deg)"));
    }
    //scale
    if (isProportion) {
      var _scale$device;
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(scale === null || scale === void 0 || (_scale$device = scale[device]) === null || _scale$device === void 0 ? void 0 : _scale$device.scale)) transforms.push("scale(".concat(scale[device].scale, ")"));
    } else {
      var _scale$device2, _scale$device3;
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(scale === null || scale === void 0 || (_scale$device2 = scale[device]) === null || _scale$device2 === void 0 ? void 0 : _scale$device2.x)) transforms.push("scaleX(".concat(scale[device].x, ")"));
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(scale === null || scale === void 0 || (_scale$device3 = scale[device]) === null || _scale$device3 === void 0 ? void 0 : _scale$device3.y)) transforms.push("scaleY(".concat(scale[device].y, ")"));
    }

    //rotate
    if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(rotate)) {
      var _rotate$device;
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(rotate === null || rotate === void 0 || (_rotate$device = rotate[device]) === null || _rotate$device === void 0 ? void 0 : _rotate$device.z)) transforms.push("rotateZ(".concat(rotate[device].z, "deg)"));
      if (threeDRotate) {
        var _rotate$device2, _rotate$device3;
        if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(rotate === null || rotate === void 0 || (_rotate$device2 = rotate[device]) === null || _rotate$device2 === void 0 ? void 0 : _rotate$device2.x)) transforms.push("rotateX(".concat(rotate[device].x, "deg)"));
        if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(rotate === null || rotate === void 0 || (_rotate$device3 = rotate[device]) === null || _rotate$device3 === void 0 ? void 0 : _rotate$device3.y)) transforms.push("rotateY(".concat(rotate[device].y, "deg)"));
      }
    }

    //offset
    if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(offset)) {
      var _offset$device, _offset$device2;
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(offset === null || offset === void 0 || (_offset$device = offset[device]) === null || _offset$device === void 0 ? void 0 : _offset$device.x)) transforms.push("translateX(".concat(offset[device].x, ")"));
      if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(offset === null || offset === void 0 || (_offset$device2 = offset[device]) === null || _offset$device2 === void 0 ? void 0 : _offset$device2.y)) transforms.push("translateY(".concat(offset[device].y, ")"));
    }

    //flip
    if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(flipX)) transforms.push(flipX ? 'scaleX(-1)' : '');
    if ((0,_common__WEBPACK_IMPORTED_MODULE_6__.isExist)(flipY)) transforms.push(flipY ? 'scaleY(-1)' : '');
    if (transforms.length === 0) return '';
    return isValidCSS('transform', transforms.join(' '));
  };
  var sl = isHover ? "".concat(selector, ":hover") : selector;
  // ${isExist(hover?.transition)?`transition:transform ${hover.transition}ms ease-in-out`:'' }

  return "\n\t\t".concat(sl, " {\n\t\t\t").concat(generateTransformCSS(transform, 'desktop'), "\n\t\t}\n\t\t").concat(_data__WEBPACK_IMPORTED_MODULE_7__.tabBreakpoint, "{\n\t\t\t").concat(sl, " {\n\t\t\t\t").concat(generateTransformCSS(transform, 'tablet'), "\n\t\t\t}\n\t\t}\n\t\t").concat(_data__WEBPACK_IMPORTED_MODULE_7__.mobileBreakpoint, "{\n\t\t\t").concat(sl, " {\n\t\t\t\t").concat(generateTransformCSS(transform, 'mobile'), "\n\t\t\t}\n\t\t}\n\t");
};
var getMaskCSS = function getMaskCSS(mask) {
  var _ref18 = mask || {},
    _ref18$isMask = _ref18.isMask,
    isMask = _ref18$isMask === void 0 ? false : _ref18$isMask,
    _ref18$shape = _ref18.shape,
    shape = _ref18$shape === void 0 ? {
      type: 'circle'
    } : _ref18$shape,
    _ref18$size = _ref18.size,
    size = _ref18$size === void 0 ? {
      type: 'contain',
      scale: '100%'
    } : _ref18$size,
    _ref18$position = _ref18.position,
    position = _ref18$position === void 0 ? {
      type: 'center center',
      x: 50,
      y: 50
    } : _ref18$position,
    _ref18$repeat = _ref18.repeat,
    repeat = _ref18$repeat === void 0 ? 'no-repeat' : _ref18$repeat;
  var svgShape = [{
    svg: _Components_Mask_assets_shapes_circle_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
    type: 'circle'
  }, {
    svg: _Components_Mask_assets_shapes_flower_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
    type: 'flower'
  }, {
    svg: _Components_Mask_assets_shapes_sketch_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    type: 'sketch'
  }, {
    svg: _Components_Mask_assets_shapes_triangle_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    type: 'triangle'
  }, {
    svg: _Components_Mask_assets_shapes_blob_svg__WEBPACK_IMPORTED_MODULE_0__["default"],
    type: 'blob'
  }, {
    svg: _Components_Mask_assets_shapes_hexagon_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
    type: 'hexagon'
  }];
  var getShape = function getShape(type) {
    return svgShape.find(function (e) {
      return e.type === type;
    });
  };
  return isMask ? "-webkit-mask-image: url(".concat(shape.type === 'custom' ? shape.url : getShape(shape.type).svg, ");\n\t\t-webkit-mask-size: ").concat(size.type === 'custom' ? size.scale : size.type, ";\n\t\t").concat(position.type === 'custom' ? "".concat(isValidCSS('-webkit-mask-position-x', position.x), "\n\t\t\t").concat(isValidCSS('-webkit-mask-position-y', position.y)) : "".concat(isValidCSS('-webkit-mask-position', position.type)), "\n\t\t").concat(size.type !== 'cover' ? "-webkit-mask-repeat: ".concat(repeat, ";") : '') : '';
};

/***/ }),

/***/ "./src/blocks/gutenberg-block/Components/Common/Style.js":
/*!***************************************************************!*\
  !*** ./src/blocks/gutenberg-block/Components/Common/Style.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../bpl-tools/utils/getCSS */ "../bpl-tools/utils/getCSS.js");
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\gutenberg-block\\Components\\Common\\Style.js",
  _this = undefined;

var Style = function Style(_ref) {
  var attributes = _ref.attributes,
    id = _ref.id;
  var _ref2 = attributes || {},
    panoType = _ref2.panoType,
    alignment = _ref2.alignment,
    width = _ref2.width,
    height = _ref2.height,
    buttonColors = _ref2.buttonColors,
    buttonHoverColors = _ref2.buttonHoverColors;
  var blockSl = "#".concat(id, " .bBlocksViewer");
  var panoramaSl = "".concat(blockSl, " .bpgbPanorama");
  var buttonSl = "".concat(blockSl, " .motionBtn");
  var initialBtnSl = "".concat(panoramaSl, " .setInitialViewButton");
  return /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "\n\n\t\t\t".concat(blockSl, "{\n\t\t\t  align-items: ").concat(alignment, ";\n\t\t\t}\n\n\t\t\t").concat(panoramaSl, "{\n\t\t\t  width: ").concat(width, ";\n\t\t\t  height: ").concat(height, ";\n\t\t\t}\n\n\t\t\t").concat(buttonSl, "{").concat((0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_0__.getColorsCSS)(buttonColors), "}\n    \t\t").concat(buttonSl, ":hover{").concat((0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_0__.getColorsCSS)(buttonHoverColors), "}\n\t\t\t  \n\t\t\t").concat(initialBtnSl, "{\n\t\t\t  ").concat(panoType === "image" ? "bottom: 0;" : "top: 0;", "\n\t\t\t}\n\t\t\t\n\t\t  ")
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ }),

/***/ "./src/blocks/gutenberg-block/Components/Common/ViewerOfImage.js":
/*!***********************************************************************!*\
  !*** ./src/blocks/gutenberg-block/Components/Common/ViewerOfImage.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/index.mjs");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\gutenberg-block\\Components\\Common\\ViewerOfImage.js",
  _this = undefined;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var ViewerOfImage = function ViewerOfImage(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes,
    _ref$isButton = _ref.isButton,
    isButton = _ref$isButton === void 0 ? false : _ref$isButton,
    _ref$device = _ref.device,
    device = _ref$device === void 0 ? "desktop" : _ref$device;
  var panoImage = attributes.panoImage,
    autoRotate = attributes.autoRotate,
    rotateSpeed = attributes.rotateSpeed,
    autoRotateInactivityDelay = attributes.autoRotateInactivityDelay,
    isDeviceMotion = attributes.isDeviceMotion,
    hideControl = attributes.hideControl,
    initialView = attributes.initialView,
    initialPosition = attributes.initialPosition;
  var _ref2 = panoImage || {},
    url = _ref2.url;
  var imageContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDeviceMotionActive = _useState2[0],
    setIsDeviceMotionActive = _useState2[1];
  var viewerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _window = window,
      PANOLENS = _window.PANOLENS;
    var panorama = new PANOLENS.ImagePanorama(url);
    viewerRef.current = new PANOLENS.Viewer({
      container: imageContainerRef.current,
      autoRotate: autoRotate,
      autoRotateSpeed: rotateSpeed,
      controlButtons: hideControl ? ["setting", "fullscreen"] : [],
      autoRotateActivationDuration: autoRotateInactivityDelay
    });
    viewerRef.current.add(panorama);
    window.viewer = viewerRef.current;
    window.panorama = panorama;
    if (initialPosition) {
      var x = initialPosition.x,
        y = initialPosition.y,
        z = initialPosition.z;
      viewerRef.current.camera.position.set(x, y, z);
    }
    var onControlChange = function onControlChange() {
      setIsDeviceMotionActive(viewerRef.current.getControl().id !== "orbit");
    };
    viewerRef.current.addUpdateCallback(function () {
      if (viewerRef.current.getControl() !== viewerRef.current.previousControl) {
        onControlChange();
        viewerRef.current.previousControl = viewerRef.current.getControl();
      }
    });
    if (buttonRef.current && imageContainerRef.current) {
      imageContainerRef.current.appendChild(buttonRef.current);
    }
    return function () {
      viewerRef.current.dispose();
    };
  }, [url, autoRotate, rotateSpeed, autoRotateInactivityDelay, isDeviceMotion, hideControl, initialView, initialPosition]);
  var handleDeviceMotionToggle = function handleDeviceMotionToggle() {
    setIsDeviceMotionActive(function (prev) {
      return !prev;
    });
  };
  var handleDeviceOrientation = function handleDeviceOrientation(event) {
    var alpha = event.alpha,
      beta = event.beta,
      gamma = event.gamma;
    if (viewerRef.current && viewerRef.current.camera) {
      viewerRef.current.camera.rotation.set(THREE.Math.degToRad(beta), THREE.Math.degToRad(alpha), THREE.Math.degToRad(-gamma));
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (isDeviceMotionActive) {
      var _viewerRef$current, _window$DeviceOrienta;
      (_viewerRef$current = viewerRef.current) === null || _viewerRef$current === void 0 || _viewerRef$current.enableControl(window.PANOLENS.CONTROLS.DEVICEORIENTATION);
      if (typeof ((_window$DeviceOrienta = window.DeviceOrientationEvent) === null || _window$DeviceOrienta === void 0 ? void 0 : _window$DeviceOrienta.requestPermission) === "function") {
        var _window$DeviceOrienta2;
        (_window$DeviceOrienta2 = window.DeviceOrientationEvent) === null || _window$DeviceOrienta2 === void 0 || _window$DeviceOrienta2.requestPermission().then(function (response) {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        })["catch"](console.error);
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    } else {
      var _viewerRef$current2;
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      (_viewerRef$current2 = viewerRef.current) === null || _viewerRef$current2 === void 0 || _viewerRef$current2.enableControl(window.PANOLENS.CONTROLS.ORBIT);
    }
    window.viewerRef = viewerRef;
    return function () {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [isDeviceMotionActive]);
  var handleSetInitialView = function handleSetInitialView() {
    try {
      if (viewerRef.current && viewerRef.current.camera) {
        var camera = viewerRef.current.camera;
        var _camera$position = camera.position,
          x = _camera$position.x,
          y = _camera$position.y,
          z = _camera$position.z;
        setAttributes({
          initialPosition: {
            x: x,
            y: y,
            z: z
          }
        });
        react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("Initial view set successfully", {
          position: "bottom-center"
        });
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("VR view not initialized!", {
          position: "top-right"
        });
      }
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("Failed to set initial view ⚠️", {
        position: "top-right"
      });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 4
    }
  }), isDeviceMotion && device !== "desktop" && /*#__PURE__*/React.createElement("button", {
    className: "motionBtn",
    onClick: handleDeviceMotionToggle,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 9
    }
  }, isDeviceMotionActive ? "Stop Device Motion" : "Start Device Motion"), /*#__PURE__*/React.createElement("div", {
    ref: imageContainerRef,
    className: "bpgbPanorama",
    key: "".concat(url, "-").concat(autoRotate, "-").concat(rotateSpeed, "-").concat(autoRotateInactivityDelay, "-").concat(initialView, "-").concat(initialPosition, "-").concat(hideControl, "-").concat(isDeviceMotion),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 5
    }
  }, isButton && initialView && /*#__PURE__*/React.createElement("button", {
    ref: buttonRef,
    onClick: handleSetInitialView,
    className: "setInitialViewButton",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 9
    }
  }, "Set as Initial View")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerOfImage);

/***/ }),

/***/ "./src/blocks/gutenberg-block/Components/Common/ViewerOfVideo.js":
/*!***********************************************************************!*\
  !*** ./src/blocks/gutenberg-block/Components/Common/ViewerOfVideo.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/index.mjs");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\gutenberg-block\\Components\\Common\\ViewerOfVideo.js",
  _this = undefined;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }



var ViewerOfVideo = function ViewerOfVideo(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes,
    _ref$isButton = _ref.isButton,
    isButton = _ref$isButton === void 0 ? false : _ref$isButton;
  var panoVideo = attributes.panoVideo,
    hideControl = attributes.hideControl,
    initialView = attributes.initialView,
    _attributes$initialPo = attributes.initialPosition,
    initialPosition = _attributes$initialPo === void 0 ? {} : _attributes$initialPo,
    autoPlay = attributes.autoPlay,
    videoMute = attributes.videoMute,
    videoLoop = attributes.videoLoop,
    fullscreen = attributes.fullscreen,
    setting = attributes.setting,
    video = attributes.video;
  var _ref2 = panoVideo || {},
    url = _ref2.url;
  var videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var viewerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _window = window,
      PANOLENS = _window.PANOLENS,
      THREE = _window.THREE;
    if (!PANOLENS || !THREE) return;
    var controlButtons = [].concat(_toConsumableArray(fullscreen ? ["fullscreen"] : []), _toConsumableArray(setting ? ["setting"] : []), _toConsumableArray(video ? ["video"] : []));
    var panorama = new PANOLENS.VideoPanorama(url, {
      autoplay: autoPlay,
      loop: videoLoop,
      muted: videoMute
    });
    viewerRef.current = new PANOLENS.Viewer({
      container: videoRef.current,
      controlBar: hideControl,
      controlButtons: controlButtons
    });
    viewerRef.current.add(panorama);
    if (initialPosition) {
      var x = initialPosition.x,
        y = initialPosition.y,
        z = initialPosition.z;
      viewerRef.current.camera.position.set(x, y, z);
    }
    if (buttonRef.current && videoRef.current) {
      videoRef.current.appendChild(buttonRef.current);
    }
  }, [url, hideControl, initialView, initialPosition, autoPlay, videoMute, videoLoop, fullscreen, setting, video]);
  var handleSetInitialView = function handleSetInitialView() {
    try {
      if (viewerRef.current && viewerRef.current.camera) {
        var camera = viewerRef.current.camera;
        var _camera$position = camera.position,
          x = _camera$position.x,
          y = _camera$position.y,
          z = _camera$position.z;
        setAttributes({
          initialPosition: {
            x: x,
            y: y,
            z: z
          }
        });
        react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("Initial view set successfully", {
          position: "bottom-center"
        });
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("VR view not initialized!", {
          position: "top-right"
        });
      }
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("Failed to set initial view ⚠️", {
        position: "top-right"
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: videoRef,
    className: "bpgbPanorama",
    key: "".concat(url, "-").concat(autoPlay, "-").concat(videoLoop, "-").concat(initialView, "-").concat(initialPosition, "-").concat(videoMute, "-").concat(hideControl, "-").concat(setting, "-").concat(fullscreen, "-").concat(video),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 7
    }
  }), isButton && initialView && /*#__PURE__*/React.createElement("button", {
    ref: buttonRef,
    onClick: handleSetInitialView,
    className: "setInitialViewButton",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 9
    }
  }, "Set as Initial View"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerOfVideo);

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/blob.svg":
/*!***********************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/blob.svg ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/blob.svg");

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/circle.svg":
/*!*************************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/circle.svg ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/circle.svg");

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/flower.svg":
/*!*************************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/flower.svg ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/flower.svg");

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/hexagon.svg":
/*!**************************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/hexagon.svg ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/hexagon.svg");

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/sketch.svg":
/*!*************************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/sketch.svg ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/sketch.svg");

/***/ }),

/***/ "../bpl-tools/Components/Mask/assets/shapes/triangle.svg":
/*!***************************************************************!*\
  !*** ../bpl-tools/Components/Mask/assets/shapes/triangle.svg ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "_/bpl-tools/Components/Mask/assets/shapes/triangle.svg");

/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/gutenberg-block/style.scss":
/*!***********************************************!*\
  !*** ./src/blocks/gutenberg-block/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.mjs":
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/react-toastify/dist/index.mjs":
/*!****************************************************!*\
  !*** ./node_modules/react-toastify/dist/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bounce: () => (/* binding */ lt),
/* harmony export */   Flip: () => (/* binding */ uo),
/* harmony export */   Icons: () => (/* binding */ W),
/* harmony export */   Slide: () => (/* binding */ mo),
/* harmony export */   ToastContainer: () => (/* binding */ Lt),
/* harmony export */   Zoom: () => (/* binding */ po),
/* harmony export */   collapseToast: () => (/* binding */ Z),
/* harmony export */   cssTransition: () => (/* binding */ $),
/* harmony export */   toast: () => (/* binding */ y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
"use client";
function Mt(t){if(!t||typeof document=="undefined")return;let o=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",o.firstChild?o.insertBefore(e,o.firstChild):o.appendChild(e),e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}Mt(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);var L=t=>typeof t=="number"&&!isNaN(t),N=t=>typeof t=="string",P=t=>typeof t=="function",mt=t=>N(t)||L(t),B=t=>N(t)||P(t)?t:null,pt=(t,o)=>t===!1||L(t)&&t>0?t:o,z=t=>(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)||N(t)||P(t)||L(t);function Z(t,o,e=300){let{scrollHeight:r,style:s}=t;requestAnimationFrame(()=>{s.minHeight="initial",s.height=r+"px",s.transition=`all ${e}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(o,e)})})}function $({enter:t,exit:o,appendPosition:e=!1,collapse:r=!0,collapseDuration:s=300}){return function({children:a,position:d,preventExitTransition:c,done:T,nodeRef:g,isIn:v,playToast:x}){let C=e?`${t}--${d}`:t,S=e?`${o}--${d}`:o,E=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{let f=g.current,p=C.split(" "),b=n=>{n.target===g.current&&(x(),f.removeEventListener("animationend",b),f.removeEventListener("animationcancel",b),E.current===0&&n.type!=="animationcancel"&&f.classList.remove(...p))};(()=>{f.classList.add(...p),f.addEventListener("animationend",b),f.addEventListener("animationcancel",b)})()},[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{let f=g.current,p=()=>{f.removeEventListener("animationend",p),r?Z(f,T,s):T()};v||(c?p():(()=>{E.current=1,f.className+=` ${S}`,f.addEventListener("animationend",p)})())},[v]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,a)}}function J(t,o){return{content:tt(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:o}}function tt(t,o,e=!1){return (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)&&!N(t.type)?(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(t,{closeToast:o.closeToast,toastProps:o,data:o.data,isPaused:e}):P(t)?t({closeToast:o.closeToast,toastProps:o,data:o.data,isPaused:e}):t}function yt({closeToast:t,theme:o,ariaLabel:e="close"}){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:r=>{r.stopPropagation(),t(!0)},"aria-label":e},react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function gt({delay:t,isRunning:o,closeToast:e,type:r="default",hide:s,className:l,controlledProgress:a,progress:d,rtl:c,isIn:T,theme:g}){let v=s||a&&d===0,x={animationDuration:`${t}ms`,animationPlayState:o?"running":"paused"};a&&(x.transform=`scaleX(${d})`);let C=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__progress-bar",a?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${r}`,{["Toastify__progress-bar--rtl"]:c}),S=P(l)?l({rtl:c,type:r,defaultClassName:C}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(C,l),E={[a&&d>=1?"onTransitionEnd":"onAnimationEnd"]:a&&d<1?null:()=>{T&&e()}};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":v},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${r}`}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{role:"progressbar","aria-hidden":v?"true":"false","aria-label":"notification timer",className:S,style:x,...E}))}var Xt=1,at=()=>`${Xt++}`;function _t(t,o,e){let r=1,s=0,l=[],a=[],d=o,c=new Map,T=new Set,g=i=>(T.add(i),()=>T.delete(i)),v=()=>{a=Array.from(c.values()),T.forEach(i=>i())},x=({containerId:i,toastId:n,updateId:u})=>{let h=i?i!==t:t!==1,m=c.has(n)&&u==null;return h||m},C=(i,n)=>{c.forEach(u=>{var h;(n==null||n===u.props.toastId)&&((h=u.toggle)==null||h.call(u,i))})},S=i=>{var n,u;(u=(n=i.props)==null?void 0:n.onClose)==null||u.call(n,i.removalReason),i.isActive=!1},E=i=>{if(i==null)c.forEach(S);else{let n=c.get(i);n&&S(n)}v()},f=()=>{s-=l.length,l=[]},p=i=>{var m,_;let{toastId:n,updateId:u}=i.props,h=u==null;i.staleId&&c.delete(i.staleId),i.isActive=!0,c.set(n,i),v(),e(J(i,h?"added":"updated")),h&&((_=(m=i.props).onOpen)==null||_.call(m))};return{id:t,props:d,observe:g,toggle:C,removeToast:E,toasts:c,clearQueue:f,buildToast:(i,n)=>{if(x(n))return;let{toastId:u,updateId:h,data:m,staleId:_,delay:k}=n,M=h==null;M&&s++;let A={...d,style:d.toastStyle,key:r++,...Object.fromEntries(Object.entries(n).filter(([D,Y])=>Y!=null)),toastId:u,updateId:h,data:m,isIn:!1,className:B(n.className||d.toastClassName),progressClassName:B(n.progressClassName||d.progressClassName),autoClose:n.isLoading?!1:pt(n.autoClose,d.autoClose),closeToast(D){c.get(u).removalReason=D,E(u)},deleteToast(){let D=c.get(u);if(D!=null){if(e(J(D,"removed")),c.delete(u),s--,s<0&&(s=0),l.length>0){p(l.shift());return}v()}}};A.closeButton=d.closeButton,n.closeButton===!1||z(n.closeButton)?A.closeButton=n.closeButton:n.closeButton===!0&&(A.closeButton=z(d.closeButton)?d.closeButton:!0);let R={content:i,props:A,staleId:_};d.limit&&d.limit>0&&s>d.limit&&M?l.push(R):L(k)?setTimeout(()=>{p(R)},k):p(R)},setProps(i){d=i},setToggle:(i,n)=>{let u=c.get(i);u&&(u.toggle=n)},isToastActive:i=>{var n;return(n=c.get(i))==null?void 0:n.isActive},getSnapshot:()=>a}}var I=new Map,F=[],st=new Set,Vt=t=>st.forEach(o=>o(t)),bt=()=>I.size>0;function Qt(){F.forEach(t=>nt(t.content,t.options)),F=[]}var vt=(t,{containerId:o})=>{var e;return(e=I.get(o||1))==null?void 0:e.toasts.get(t)};function X(t,o){var r;if(o)return!!((r=I.get(o))!=null&&r.isToastActive(t));let e=!1;return I.forEach(s=>{s.isToastActive(t)&&(e=!0)}),e}function ht(t){if(!bt()){F=F.filter(o=>t!=null&&o.options.toastId!==t);return}if(t==null||mt(t))I.forEach(o=>{o.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let o=I.get(t.containerId);o?o.removeToast(t.id):I.forEach(e=>{e.removeToast(t.id)})}}var Ct=(t={})=>{I.forEach(o=>{o.props.limit&&(!t.containerId||o.id===t.containerId)&&o.clearQueue()})};function nt(t,o){z(t)&&(bt()||F.push({content:t,options:o}),I.forEach(e=>{e.buildToast(t,o)}))}function xt(t){var o;(o=I.get(t.containerId||1))==null||o.setToggle(t.id,t.fn)}function rt(t,o){I.forEach(e=>{(o==null||!(o!=null&&o.containerId)||(o==null?void 0:o.containerId)===e.id)&&e.toggle(t,o==null?void 0:o.id)})}function Et(t){let o=t.containerId||1;return{subscribe(e){let r=_t(o,t,Vt);I.set(o,r);let s=r.observe(e);return Qt(),()=>{s(),I.delete(o)}},setProps(e){var r;(r=I.get(o))==null||r.setProps(e)},getSnapshot(){var e;return(e=I.get(o))==null?void 0:e.getSnapshot()}}}function Pt(t){return st.add(t),()=>{st.delete(t)}}function Wt(t){return t&&(N(t.toastId)||L(t.toastId))?t.toastId:at()}function U(t,o){return nt(t,o),o.toastId}function V(t,o){return{...o,type:o&&o.type||t,toastId:Wt(o)}}function Q(t){return(o,e)=>U(o,V(t,e))}function y(t,o){return U(t,V("default",o))}y.loading=(t,o)=>U(t,V("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...o}));function Gt(t,{pending:o,error:e,success:r},s){let l;o&&(l=N(o)?y.loading(o,s):y.loading(o.render,{...s,...o}));let a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},d=(T,g,v)=>{if(g==null){y.dismiss(l);return}let x={type:T,...a,...s,data:v},C=N(g)?{render:g}:g;return l?y.update(l,{...x,...C}):y(C.render,{...x,...C}),v},c=P(t)?t():t;return c.then(T=>d("success",r,T)).catch(T=>d("error",e,T)),c}y.promise=Gt;y.success=Q("success");y.info=Q("info");y.error=Q("error");y.warning=Q("warning");y.warn=y.warning;y.dark=(t,o)=>U(t,V("default",{theme:"dark",...o}));function qt(t){ht(t)}y.dismiss=qt;y.clearWaitingQueue=Ct;y.isActive=X;y.update=(t,o={})=>{let e=vt(t,o);if(e){let{props:r,content:s}=e,l={delay:100,...r,...o,toastId:o.toastId||t,updateId:at()};l.toastId!==t&&(l.staleId=t);let a=l.render||s;delete l.render,U(a,l)}};y.done=t=>{y.update(t,{progress:1})};y.onChange=Pt;y.play=t=>rt(!0,t);y.pause=t=>rt(!1,t);function It(t){var a;let{subscribe:o,getSnapshot:e,setProps:r}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(Et(t)).current;r(t);let s=(a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore)(o,e,e))==null?void 0:a.slice();function l(d){if(!s)return[];let c=new Map;return t.newestOnTop&&s.reverse(),s.forEach(T=>{let{position:g}=T.props;c.has(g)||c.set(g,[]),c.get(g).push(T)}),Array.from(c,T=>d(T[0],T[1]))}return{getToastToRender:l,isToastActive:X,count:s==null?void 0:s.length}}function At(t){let[o,e]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[r,s]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:d,pauseOnHover:c,closeToast:T,onClick:g,closeOnClick:v}=t;xt({id:t.toastId,containerId:t.containerId,fn:e}),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{if(t.pauseOnFocusLoss)return x(),()=>{C()}},[t.pauseOnFocusLoss]);function x(){document.hasFocus()||p(),window.addEventListener("focus",f),window.addEventListener("blur",p)}function C(){window.removeEventListener("focus",f),window.removeEventListener("blur",p)}function S(m){if(t.draggable===!0||t.draggable===m.pointerType){b();let _=l.current;a.canCloseOnClick=!0,a.canDrag=!0,_.style.transition="none",t.draggableDirection==="x"?(a.start=m.clientX,a.removalDistance=_.offsetWidth*(t.draggablePercent/100)):(a.start=m.clientY,a.removalDistance=_.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function E(m){let{top:_,bottom:k,left:M,right:A}=l.current.getBoundingClientRect();m.nativeEvent.type!=="touchend"&&t.pauseOnHover&&m.clientX>=M&&m.clientX<=A&&m.clientY>=_&&m.clientY<=k?p():f()}function f(){e(!0)}function p(){e(!1)}function b(){a.didMove=!1,document.addEventListener("pointermove",n),document.addEventListener("pointerup",u)}function i(){document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",u)}function n(m){let _=l.current;if(a.canDrag&&_){a.didMove=!0,o&&p(),t.draggableDirection==="x"?a.delta=m.clientX-a.start:a.delta=m.clientY-a.start,a.start!==m.clientX&&(a.canCloseOnClick=!1);let k=t.draggableDirection==="x"?`${a.delta}px, var(--y)`:`0, calc(${a.delta}px + var(--y))`;_.style.transform=`translate3d(${k},0)`,_.style.opacity=`${1-Math.abs(a.delta/a.removalDistance)}`}}function u(){i();let m=l.current;if(a.canDrag&&a.didMove&&m){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance){s(!0),t.closeToast(!0),t.collapseAll();return}m.style.transition="transform 0.2s, opacity 0.2s",m.style.removeProperty("transform"),m.style.removeProperty("opacity")}}let h={onPointerDown:S,onPointerUp:E};return d&&c&&(h.onMouseEnter=p,t.stacked||(h.onMouseLeave=f)),v&&(h.onClick=m=>{g&&g(m),a.canCloseOnClick&&T(!0)}),{playToast:f,pauseToast:p,isRunning:o,preventExitTransition:r,toastRef:l,eventHandlers:h}}var Ot=typeof window!="undefined"?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;var G=({theme:t,type:o,isLoading:e,...r})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...r});function ao(t){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(G,{...t},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function so(t){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(G,{...t},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function no(t){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(G,{...t},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function ro(t){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(G,{...t},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function io(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"Toastify__spinner"})}var W={info:so,warning:ao,success:no,error:ro,spinner:io},lo=t=>t in W;function Nt({theme:t,type:o,isLoading:e,icon:r}){let s=null,l={theme:t,type:o};return r===!1||(P(r)?s=r({...l,isLoading:e}):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(r)?s=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(r,l):e?s=W.spinner():lo(o)&&(s=W[o](l))),s}var wt=t=>{let{isRunning:o,preventExitTransition:e,toastRef:r,eventHandlers:s,playToast:l}=At(t),{closeButton:a,children:d,autoClose:c,onClick:T,type:g,hideProgressBar:v,closeToast:x,transition:C,position:S,className:E,style:f,progressClassName:p,updateId:b,role:i,progress:n,rtl:u,toastId:h,deleteToast:m,isIn:_,isLoading:k,closeOnClick:M,theme:A,ariaLabel:R}=t,D=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast",`Toastify__toast-theme--${A}`,`Toastify__toast--${g}`,{["Toastify__toast--rtl"]:u},{["Toastify__toast--close-on-click"]:M}),Y=P(E)?E({rtl:u,position:S,type:g,defaultClassName:D}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(D,E),ft=Nt(t),dt=!!n||!c,j={closeToast:x,type:g,theme:A},H=null;return a===!1||(P(a)?H=a(j):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(a)?H=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(a,j):H=yt(j)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(C,{isIn:_,done:m,position:S,preventExitTransition:e,nodeRef:r,playToast:l},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{id:h,tabIndex:0,onClick:T,"data-in":_,className:Y,...s,style:f,ref:r,..._&&{role:i,"aria-label":R}},ft!=null&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast-icon",{["Toastify--animate-icon Toastify__zoom-enter"]:!k})},ft),tt(d,t,!o),H,!t.customProgressBar&&react__WEBPACK_IMPORTED_MODULE_0__.createElement(gt,{...b&&!dt?{key:`p-${b}`}:{},rtl:u,theme:A,delay:c,isRunning:o,isIn:_,closeToast:x,hide:v,type:g,className:p,controlledProgress:dt,progress:n||0})))};var K=(t,o=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:o}),lt=$(K("bounce",!0)),mo=$(K("slide",!0)),po=$(K("zoom")),uo=$(K("flip"));var _o={position:"top-right",transition:lt,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function Lt(t){let o={..._o,...t},e=t.stacked,[r,s]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),{getToastToRender:a,isToastActive:d,count:c}=It(o),{className:T,style:g,rtl:v,containerId:x,hotKeys:C}=o;function S(f){let p=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast-container",`Toastify__toast-container--${f}`,{["Toastify__toast-container--rtl"]:v});return P(T)?T({position:f,rtl:v,defaultClassName:p}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(p,B(T))}function E(){e&&(s(!0),y.play())}return Ot(()=>{var f;if(e){let p=l.current.querySelectorAll('[data-in="true"]'),b=12,i=(f=o.position)==null?void 0:f.includes("top"),n=0,u=0;Array.from(p).reverse().forEach((h,m)=>{let _=h;_.classList.add("Toastify__toast--stacked"),m>0&&(_.dataset.collapsed=`${r}`),_.dataset.pos||(_.dataset.pos=i?"top":"bot");let k=n*(r?.2:1)+(r?0:b*m);_.style.setProperty("--y",`${i?k:k*-1}px`),_.style.setProperty("--g",`${b}`),_.style.setProperty("--s",`${1-(r?u:0)}`),n+=_.offsetHeight,u+=.025})}},[r,c,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{function f(p){var i;let b=l.current;C(p)&&((i=b.querySelector('[tabIndex="0"]'))==null||i.focus(),s(!1),y.pause()),p.key==="Escape"&&(document.activeElement===b||b!=null&&b.contains(document.activeElement))&&(s(!0),y.play())}return document.addEventListener("keydown",f),()=>{document.removeEventListener("keydown",f)}},[C]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("section",{ref:l,className:"Toastify",id:x,onMouseEnter:()=>{e&&(s(!1),y.pause())},onMouseLeave:E,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":o["aria-label"]},a((f,p)=>{let b=p.length?{...g}:{...g,pointerEvents:"none"};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{tabIndex:-1,className:S(f),"data-stacked":e,style:b,key:`c-${f}`},p.map(({content:i,props:n})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(wt,{...n,stacked:e,collapseAll:E,isIn:d(n.toastId,n.containerId),key:`t-${n.key}`},i)))}))}
//# sourceMappingURL=index.mjs.map

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/blocks/gutenberg-block/view.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _Components_Common_ViewerOfImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Common/ViewerOfImage */ "./src/blocks/gutenberg-block/Components/Common/ViewerOfImage.js");
/* harmony import */ var _Components_Common_ViewerOfVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Common/ViewerOfVideo */ "./src/blocks/gutenberg-block/Components/Common/ViewerOfVideo.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/gutenberg-block/style.scss");
/* harmony import */ var _Components_Common_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/Common/Style */ "./src/blocks/gutenberg-block/Components/Common/Style.js");
var _jsxFileName = "C:\\Users\\Shamim bPlugins\\Local Sites\\free-plugins-dev\\app\\public\\wp-content\\plugins\\panorama\\src\\blocks\\gutenberg-block\\view.js",
  _this = undefined;





document.addEventListener("DOMContentLoaded", function () {
  var panoramaEls = document.querySelectorAll(".wp-block-bpgb-panorama");
  panoramaEls.forEach(function (panoramaEl) {
    var attributes = JSON.parse(panoramaEl.dataset.attributes);
    var device = window.innerWidth < 768 ? "mobile" : "desktop";
    (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(panoramaEl).render(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Components_Common_Style__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      id: panoramaEl.id,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 9
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "bBlocksViewer",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }
    }, attributes.panoType === "image" ? /*#__PURE__*/React.createElement(_Components_Common_ViewerOfImage__WEBPACK_IMPORTED_MODULE_1__["default"], {
      attributes: attributes,
      device: device,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 13
      }
    }) : /*#__PURE__*/React.createElement(_Components_Common_ViewerOfVideo__WEBPACK_IMPORTED_MODULE_2__["default"], {
      attributes: attributes,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 13
      }
    }))));
    panoramaEl === null || panoramaEl === void 0 || panoramaEl.removeAttribute("data-attributes");
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map