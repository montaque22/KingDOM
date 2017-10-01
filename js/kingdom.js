"use strict";
/**
 * Created by mmontaque on 5/7/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Kingdom = /** @class */ (function () {
    /**
     * @constructor
     * Create an empty kingdom. If data is supplied then it is made the root node.
     * @param {Subject} subject - the given subject will initialize the kingdom and become king (root node)
     */
    function Kingdom(subject) {
        if (subject === void 0) { subject = { element: '', subjects: [] }; }
        if (typeof subject !== "object" || Array.isArray(subject))
            throw new Error("Constructor did not receive the expected type object");
        // Make sure the subject has its subjects initialized
        subject.subjects = subject.subjects || [];
        // sets the given subject as the king (root node)
        this.king = subject;
        // the delegate lord is also the king since the king has no subjects to be delegate lord
        this._delegateLord = this.king;
    }
    Object.defineProperty(Kingdom.prototype, "delegateLord", {
        /**
         * Retrieves the current node
         * @return {Subject}
         */
        get: function () {
            return this._delegateLord;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Internally moves the current node up one level. If the node is the parent then it does nothing
     * @return {Kingdom}
     */
    Kingdom.prototype.getLord = function () {
        var result;
        if (this._delegateLord === this.king)
            return this;
        else
            result = this.findParentOfChild(this._delegateLord, this.king);
        if (this.isSubject(result))
            this._delegateLord = result;
        return this;
    };
    /**
     * Adds data as a child to the current node. if makeLord is true then the given subject becomes the new current node
     * @param {Subject} subject - the element you want to add
     * @param {Boolean} makeLord - if true, sets the given subject as lord (current node) and subsequent calls to
     * addSubject will be assigned to this current subject
     * @return {Kingdom}
     */
    Kingdom.prototype.addSubject = function (subject, makeLord) {
        if (typeof subject !== "object" || Array.isArray(subject))
            throw new Error("addSubject did not receive the expected type object");
        subject.subjects = subject.subjects || [];
        // Add the subject to the list of subjects under the delegate lord
        if (!this._delegateLord.subjects)
            this._delegateLord.subjects = [subject];
        else
            this._delegateLord.subjects.push(subject);
        // if true, promote the given subject as delegate lord
        if (makeLord)
            this._delegateLord = subject;
        return this;
    };
    /**
     * Internally changes the current node to the child at the given index. The current node remains the same on failure
     * @param {Numbder} index - index of the subject you want to make current node
     * @return {Kingdom}
     */
    Kingdom.prototype.makeSubjectLordAtIndex = function (index) {
        var youCanProceed = this.checkSubjectAtIndex(index);
        if (youCanProceed)
            this._delegateLord = this._delegateLord.subjects[index];
        return this;
    };
    /**
     * Internally changes the current node to the root node
     * @return {Kingdom}
     */
    Kingdom.prototype.gotoKing = function () {
        this._delegateLord = this.king;
        return this;
    };
    /**
     * Removes the {Subject} at the specified index. Returns false on failure.
     * @param {Number} index - index of the {Subject} you want to remove
     * @return {boolean} - returns true on success
     */
    Kingdom.prototype.banishSubjectAtIndex = function (index) {
        var youCanProceed = this.checkSubjectAtIndex(index);
        if (youCanProceed)
            this._delegateLord.subjects.splice(index, 1);
        return youCanProceed;
    };
    /**
     * Removes all the children of the current node.
     * @return {Kingdom}
     */
    Kingdom.prototype.banishSubjectsForCurrentLord = function () {
        this._delegateLord.subjects = [];
        return this;
    };
    /**
     * Removes all the nodes and internally resets the current node to point to the root.
     * @return {Kingdom}
     */
    Kingdom.prototype.destroyKingdom = function () {
        this.king = this.getSmallestSubject();
        this._delegateLord = this.king;
        return this;
    };
    /**
     * returns the DOM structure starting at the root node. If startAtCurrent is true then generates the DOM from
     * the current node instead.
     * @param {boolean} startAtCurrent - only renders from the current node down
     * @return {DocumentFragment} returns the DOM
     */
    Kingdom.prototype.buildKingdom = function (startAtCurrent) {
        // Keep reference to the current delegate lord
        var currentLord = this._delegateLord;
        // determine which point to start from
        var subject = startAtCurrent && this._delegateLord || this.gotoKing() && this._delegateLord;
        // return the delegate lord back to normal
        this._delegateLord = currentLord;
        // Build!!
        return this.build(subject);
    };
    /**
     * returns the virtual dom as a string.
     * It will not include functions or complex structures
     * not supported by JSON.stringify and JSON.parse
     *
     * @return {string} stringify version of the virtual DOM
     */
    Kingdom.prototype.createCensus = function () {
        return JSON.stringify(this.king, null, 4);
    };
    Kingdom.prototype.isSubject = function (subject) {
        return subject.element !== undefined;
    };
    Kingdom.prototype.findParentOfChild = function (child, delegateLord) {
        if (!!delegateLord && !!delegateLord.subjects) {
            if (delegateLord.subjects.indexOf(child) >= 0)
                return delegateLord;
            for (var _i = 0, _a = delegateLord.subjects; _i < _a.length; _i++) {
                var subject = _a[_i];
                var result = this.findParentOfChild(child, subject);
                if (result)
                    return result;
            }
        }
    };
    Kingdom.prototype.getSmallestSubject = function () {
        return { element: '', subjects: [] };
    };
    Kingdom.prototype.build = function (delegateLord) {
        // Create a tuple containing the HTML fragment and boolean indicating if fragment contains an element
        var elementTuple = this.createSelf(delegateLord);
        var fragment = elementTuple[0];
        var element;
        // determine which element to which to append
        if (elementTuple[1])
            element = fragment.firstElementChild;
        else
            element = fragment;
        if (!!delegateLord.subjects && !!element) {
            // Go through the subjects of the delegate lord and have each build a kingdom to add
            for (var _i = 0, _a = delegateLord.subjects; _i < _a.length; _i++) {
                var subject = _a[_i];
                element.appendChild(this.build(subject));
            }
        }
        return fragment;
    };
    Kingdom.prototype.createSelf = function (data) {
        var fragment = document.createDocumentFragment();
        // If there is no element to create then return a fragment
        if (!data.element)
            return [fragment, false];
        var element = document.createElement(data.element);
        if (!!data.textAsHTML)
            element.innerHTML = data.textAsHTML;
        else if (!!data.textAsString)
            element.innerText = data.textAsString;
        this.setPropertiesAndAttributes(element, data.properties, data.setAttributes);
        fragment.appendChild(element);
        return [fragment, true];
    };
    Kingdom.prototype.setPropertiesAndAttributes = function (el, prop, attr) {
        for (var key in attr) {
            var val = attr[key];
            el.setAttribute(key, val);
        }
        for (var key in prop) {
            // get the value for key in the property we are copying
            var val = prop[key];
            // if the type is an object recursively try again
            if (typeof val === 'object' && typeof val !== 'function')
                this.setPropertiesAndAttributes(el[key], val);
            else {
                el[key] = val;
            }
        }
    };
    Kingdom.prototype.checkSubjectAtIndex = function (index) {
        if (isNaN(index) || Array.isArray(index))
            throw new Error('The index given was not a number');
        else if (this._delegateLord.subjects && this._delegateLord.subjects.length > index)
            return true;
        else
            console.warn('There are no subjects at index = ', index);
        return false;
    };
    return Kingdom;
}());
exports.Kingdom = Kingdom;
