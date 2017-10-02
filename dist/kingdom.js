(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by mmontaque on 5/7/17.
 * @description
 * Creates an virtual DOM to minimize expensive DOM interactions.
 */
var Kingdom = exports.Kingdom = function () {
    /**
     * @constructor
     * Create an empty kingdom. If data is supplied then it is made the root node.
     * @param {Subject} subject - the given subject will initialize the kingdom and become king (root node)
     */
    function Kingdom() {
        var subject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { element: '', subjects: [] };

        _classCallCheck(this, Kingdom);

        if ((typeof subject === "undefined" ? "undefined" : _typeof(subject)) !== "object" || Array.isArray(subject)) throw new Error("Constructor did not receive the expected type object");
        // Make sure the subject has its subjects initialized
        subject.subjects = subject.subjects || [];
        // sets the given subject as the king (root node)
        this.king = subject;
        // the delegate lord is also the king since the king has no subjects to be delegate lord
        this._delegateLord = this.king;
    }
    /**
     * Retrieves the current node
     * @return {Subject}
     */


    _createClass(Kingdom, [{
        key: "getLord",

        /**
         * Internally moves the current node up one level. If the node is the parent then it does nothing
         * @return {Kingdom}
         */
        value: function getLord() {
            var result = void 0;
            if (this._delegateLord === this.king) return this;else result = this.findParentOfChild(this._delegateLord, this.king);
            if (this.isSubject(result)) this._delegateLord = result;
            return this;
        }
        /**
         * Adds data as a child to the current node. if makeLord is true then the given subject becomes the new current node
         * @param {Subject} subject - the element you want to add
         * @param {Boolean} makeLord - if true, sets the given subject as lord (current node) and subsequent calls to
         * addSubject will be assigned to this current subject
         * @return {Kingdom}
         */

    }, {
        key: "addSubject",
        value: function addSubject(subject, makeLord) {
            if ((typeof subject === "undefined" ? "undefined" : _typeof(subject)) !== "object" || Array.isArray(subject)) throw new Error("addSubject did not receive the expected type object");
            subject.subjects = subject.subjects || [];
            // Add the subject to the list of subjects under the delegate lord
            if (!this._delegateLord.subjects) this._delegateLord.subjects = [subject];else this._delegateLord.subjects.push(subject);
            // if true, promote the given subject as delegate lord
            if (makeLord) this._delegateLord = subject;
            return this;
        }
        /**
         * Internally changes the current node to the child at the given index. The current node remains the same on failure
         * @param {Numbder} index - index of the subject you want to make current node
         * @return {Kingdom}
         */

    }, {
        key: "makeSubjectLordAtIndex",
        value: function makeSubjectLordAtIndex(index) {
            var youCanProceed = this.checkSubjectAtIndex(index);
            if (youCanProceed) this._delegateLord = this._delegateLord.subjects[index];
            return this;
        }
        /**
         * Internally changes the current node to the root node
         * @return {Kingdom}
         */

    }, {
        key: "gotoKing",
        value: function gotoKing() {
            this._delegateLord = this.king;
            return this;
        }
        /**
         * Removes the {Subject} at the specified index. Returns false on failure.
         * @param {Number} index - index of the {Subject} you want to remove
         * @return {boolean} - returns true on success
         */

    }, {
        key: "banishSubjectAtIndex",
        value: function banishSubjectAtIndex(index) {
            var youCanProceed = this.checkSubjectAtIndex(index);
            if (youCanProceed) this._delegateLord.subjects.splice(index, 1);
            return youCanProceed;
        }
        /**
         * Removes all the children of the current node.
         * @return {Kingdom}
         */

    }, {
        key: "banishSubjectsForCurrentLord",
        value: function banishSubjectsForCurrentLord() {
            this._delegateLord.subjects = [];
            return this;
        }
        /**
         * Removes all the nodes and internally resets the current node to point to the root.
         * @return {Kingdom}
         */

    }, {
        key: "destroyKingdom",
        value: function destroyKingdom() {
            this.king = this.getSmallestSubject();
            this._delegateLord = this.king;
            return this;
        }
        /**
         * returns the DOM structure starting at the root node. If startAtCurrent is true then generates the DOM from
         * the current node instead.
         * @param {boolean} startAtCurrent - only renders from the current node down
         * @return {DocumentFragment} returns the DOM
         */

    }, {
        key: "buildKingdom",
        value: function buildKingdom(startAtCurrent) {
            // Keep reference to the current delegate lord
            var currentLord = this._delegateLord;
            // determine which point to start from
            var subject = startAtCurrent && this._delegateLord || this.gotoKing() && this._delegateLord;
            // return the delegate lord back to normal
            this._delegateLord = currentLord;
            // Build!!
            return this.build(subject);
        }
        /**
         * returns the virtual dom as a string.
         * It will not include functions or complex structures
         * not supported by JSON.stringify and JSON.parse
         *
         * @return {string} stringify version of the virtual DOM
         */

    }, {
        key: "createCensus",
        value: function createCensus() {
            return JSON.stringify(this.king, null, 4);
        }
    }, {
        key: "isSubject",
        value: function isSubject(subject) {
            return subject.element !== undefined;
        }
    }, {
        key: "findParentOfChild",
        value: function findParentOfChild(child, delegateLord) {
            if (!!delegateLord && !!delegateLord.subjects) {
                if (delegateLord.subjects.indexOf(child) >= 0) return delegateLord;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = delegateLord.subjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var subject = _step.value;

                        var result = this.findParentOfChild(child, subject);
                        if (result) return result;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: "getSmallestSubject",
        value: function getSmallestSubject() {
            return { element: '', subjects: [] };
        }
    }, {
        key: "build",
        value: function build(delegateLord) {
            // Create a tuple containing the HTML fragment and boolean indicating if fragment contains an element
            var elementTuple = this.createSelf(delegateLord);
            var fragment = elementTuple[0];
            var element = void 0;
            // determine which element to which to append
            if (elementTuple[1]) element = fragment.firstElementChild;else element = fragment;
            if (!!delegateLord.subjects && !!element) {
                // Go through the subjects of the delegate lord and have each build a kingdom to add
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = delegateLord.subjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var subject = _step2.value;

                        element.appendChild(this.build(subject));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return fragment;
        }
    }, {
        key: "createSelf",
        value: function createSelf(data) {
            var fragment = document.createDocumentFragment();
            // If there is no element to create then return a fragment
            if (!data.element) return [fragment, false];
            var element = document.createElement(data.element);
            if (!!data.textAsHTML) element.innerHTML = data.textAsHTML;else if (!!data.textAsString) element.innerText = data.textAsString;
            this.setPropertiesAndAttributes(element, data.properties, data.setAttributes);
            fragment.appendChild(element);
            return [fragment, true];
        }
    }, {
        key: "setPropertiesAndAttributes",
        value: function setPropertiesAndAttributes(el, prop, attr) {
            for (var key in attr) {
                var val = attr[key];
                el.setAttribute(key, val);
            }
            for (var _key in prop) {
                // get the value for key in the property we are copying
                var val = prop[_key];
                // if the type is an object recursively try again
                if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object' && typeof val !== 'function') this.setPropertiesAndAttributes(el[_key], val);else {
                    el[_key] = val;
                }
            }
        }
    }, {
        key: "checkSubjectAtIndex",
        value: function checkSubjectAtIndex(index) {
            if (isNaN(index) || Array.isArray(index)) throw new Error('The index given was not a number');else if (this._delegateLord.subjects && this._delegateLord.subjects.length > index) return true;else console.warn('There are no subjects at index = ', index);
            return false;
        }
    }, {
        key: "delegateLord",
        get: function get() {
            return this._delegateLord;
        }
    }]);

    return Kingdom;
}();

/***/ })
/******/ ]);
});