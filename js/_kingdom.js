/**
 * Created by mmontaque on 4/28/17.
 */
// Polyfill
if (typeof Object.assign != 'function') {
    Object.assign = function(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

function Kingdom(_data, _parent, shouldDive) {
    var parent      = _parent;

    this.data       = !parent ? null : _data;
    this.children   = [];

    this.id         = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    this.addChild = this.addChild.bind(this);

    this.gotoChildAtIndex = this.gotoChildAtIndex.bind(this);

    this.generate = this.generate.bind(this);

    this.generateAsync = this.generateAsync.bind(this);

    this.gotoRoot = this.gotoRoot.bind(this);

    this.parent = function () {
        return parent;
    };

    this.hasParent = function () {
        return !!parent;
    };

    this.clean     = this.clean.bind(this);

    // Root node should push initial data into child, otherwise store data in itself
    if(!parent)
        return this.addChild(_data, shouldDive);

};

Kingdom.prototype.clean = function () {
    var root = this.gotoRoot();
    root.data = undefined;
    root.children = [];
    return root;
};

Kingdom.prototype.addChild = function (data, shouldDive) {
    var child = new Kingdom(data, this);
    this.children.push(child);
    return shouldDive ? child : this;
};

Kingdom.prototype.gotoChildAtIndex = function (index) {
    return this.children[index];
};

Kingdom.prototype.gotoRoot = function () {
    return this.hasParent() ? this.parent().gotoRoot() : this;
};

Kingdom.prototype.generate = function (gotoRoot) {

    if(gotoRoot){
        return this.gotoRoot().generate();
    }

    var fragment = document.createDocumentFragment();
    var element = !!this.data ? createSelf(this.data) : fragment;

    var idx = 0;
    var len = this.children.length

    for(; idx < len; idx++) {
        var child = this.children[idx];
        element.appendChild(child.generate())
    }

    if(!!this.data)
        fragment.appendChild(element);

    return fragment;


    function createSelf(data) {
        var element = document.createElement(data.element);

        if (typeof data.text === 'string') {
            element.appendChild(document.createTextNode(data.text));
        } else if (typeof data.text === 'function') {
            element.appendChild(data.text());
        }

        Object.assign(element, data.options);

        return data.customPropertyFunction
            && data.customPropertyFunction(element)
            || element;

    }
};

try{
    Kingdom.prototype.generateAsync = async function(gotoRoot) {

        // Go to the root then process
        if (gotoRoot)
            return await this.gotoRoot().generateAsync();


        var fragment = document.createDocumentFragment();
        var element = !!this.data ? await createSelf(this.data) : fragment;

        for(var index =  0, length = this.children.length; index < length; index++)
            element.appendChild(await this.children[index].generateAsync());

        if(!!this.data)
            fragment.appendChild(element);

        return fragment;


        function createSelf(data) {

            return new Promise(function(resolve){
                var timer = setTimeout(function(){
                    var element = document.createElement(data.element);

                    if (typeof data.text === 'string') {
                        element.appendChild(document.createTextNode(data.text));
                    } else if (typeof data.text === 'function') {
                        element.appendChild(data.text());
                    }

                    Object.assign(element, data.options);

                    var result =  data.customPropertyFunction
                        && data.customPropertyFunction(element)
                        || element;

                    resolve(result)

                    clearTimeout(timer)
                })
            })

        }

    };
} catch (e){
    console.log('Your browser does not support Async/Await');
    Kingdom.prototype.generateAsync = function(cb, gotoRoot) {

        // Go to the root then process
        if (gotoRoot)
            return this.gotoRoot().generate();


        var fragment = document.createDocumentFragment();
        var element = !!this.data ? createSelf(this.data) : fragment;

        for(var index =  0, length = this.children.length; index < length; index++)
            element.appendChild( this.children[index].generate());

        if(!!this.data)
            fragment.appendChild(element);

        return new Promise(function(resolve){
            resolve(fragment);
        });


        function createSelf(data) {

            return new Promise(function(resolve){
                var timer = setTimeout(function(){
                    var element = document.createElement(data.element);

                    if (typeof data.text === 'string') {
                        element.appendChild(document.createTextNode(data.text));
                    } else if (typeof data.text === 'function') {
                        element.appendChild(data.text());
                    }

                    Object.assign(element, data.options);

                    var result =  data.customPropertyFunction
                        && data.customPropertyFunction(element)
                        || element;

                    resolve(result)

                    clearTimeout(timer)
                })
            })

        }

    };
}


function Citizen (el, textStringOrFunction, _properties, scope){
    var type                = typeof _properties;
    var prop                = {};
    var propertyArray       = type === 'string' && _properties.split(',') || [];
    var propertyFunction    =  type === 'function' ? _properties.bind(scope || {}) : undefined;
    var propertyObject      =  type === 'object' && _properties || {}


    // Holds the element type (ie: div, span, img)
    prop.element    = el;

    // Can either be a string or a function that returns a text node
    prop.text       = textStringOrFunction;

    // used to  apply options to the node (ie: {className:'class-name', id:'element-id'})
    prop.options    = propertyObject;

    // function can be used to add or change attributes on nodes
    prop.customPropertyFunction = propertyFunction;

    for(var len = propertyArray.length -1; len >= 0; len--){
        var keyVal = propertyArray[len].split(':');
        prop.options[keyVal.shift()] = keyVal.shift();
    }

    return prop;
};
