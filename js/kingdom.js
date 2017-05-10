/**
 * Created by mmontaque on 5/7/17.
 */
var Kingdom = (function () {
    /**
     * @constructor
     * Create an empty kingdom. If data is supplied then it is made the root node.
     * @param subject
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
    Kingdom.prototype.parent = function () {
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
     * @param subject
     * @param makeLord
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
     * @param index
     * @return {Kingdom}
     */
    Kingdom.prototype.gotoSubjectAtIndex = function (index) {
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
     * Removes the child at the specified index. Returns false on failure.
     * @param index
     * @return {boolean}
     */
    Kingdom.prototype.detachSubjectAtIndex = function (index) {
        var youCanProceed = this.checkSubjectAtIndex(index);
        if (youCanProceed)
            this._delegateLord.subjects.splice(index, 1);
        return youCanProceed;
    };
    /**
     * Removes all the children of the current node.
     * @return {Kingdom}
     */
    Kingdom.prototype.detachAllSubjectsForCurrentLord = function () {
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
     * @param startAtCurrent
     * @return {DocumentFragment}
     */
    Kingdom.prototype.buildKingdomForDelegateLord = function (startAtCurrent) {
        // Keep reference to the current delegate lord
        var currentLord = this._delegateLord;
        // determine which point to start from
        var subject = startAtCurrent && this._delegateLord || this.gotoKing() && this._delegateLord;
        // return the delegate lord back to normal
        this._delegateLord = currentLord;
        // Build!!
        return this.build(subject);
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
                console.log(element);
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
        this.recursivePropertyAccessCopy(element, data.properties);
        fragment.appendChild(element);
        return [fragment, true];
    };
    Kingdom.prototype.recursivePropertyAccessCopy = function (el, prop) {
        if (!prop || typeof prop !== 'object') {
            return;
        }
        for (var key in prop) {
            // get the value for key in the property we are copying
            var val = prop[key];
            // if the type is an object recursively try again
            if (typeof val === 'object')
                this.recursivePropertyAccessCopy(el[key], val);
            else if (typeof val !== 'object' && typeof val !== 'function') {
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
            console.error('There are no subjects at index = ', index);
        return false;
    };
    return Kingdom;
}());
//# sourceMappingURL=kingdom.js.map