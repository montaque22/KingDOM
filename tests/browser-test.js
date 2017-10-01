/**
 * Created by mmontaque on 5/10/17.
 */
/**
 * Created by mmontaque on 5/9/17.
 */



(function(){'use strict';function m(a,b){for(var c in a)if(h(a,c)&&!1===b.call(a,a[c],c,a))break}function I(a){function b(a,b,c){g(d,a,function(a,f,l){a=C(a,f,l);X(d,a.methods,b,c,a.a);return d})}var c="Object"===a,d=K(a);b("defineStatic",1);b("defineInstance",2);b("defineInstanceAndStatic",3);b("defineStaticWithArguments",1,!0);b("defineInstanceWithArguments",2,!0);g(d,"defineStaticPolyfill",function(b,c,k){b=C(b,c,k);v(p[a],b.methods,!0,b.a);return d});g(d,"defineInstancePolyfill",function(b,c,k){b=C(b,c,k);
    v(p[a].prototype,b.methods,!0,b.a);m(b.methods,function(a,b){w(d,b,a)});return d});g(d,"alias",function(a,b){var c=d,f="string"===typeof b?d[b]:b;c[a]=f;f.instance&&w(c,a,f.instance);return d});g(d,"extend",function(b){function f(a,c){var d=b[a];if(d)for(var f=0,l;l=d[f];f++)if(l===c)return!0;return!1}function k(a,c,d){if(!c[a]||!d)return!1;for(a=0;a<d.length;a++)if(!1===b[d[a]])return!0}var e=p[a],t=e.prototype,J={},n={};b=b||{};var q=b.methods;if(!f("except",e)&&(!b.namespaces||f("namespaces",e)))return c&&
"boolean"===typeof b.objectPrototype&&(D=b.objectPrototype),m(q||d,function(a,b){q&&(b=a,a=d[b]);!h(a,"instance")||c&&t===t&&(!D||"get"===b||"set"===b)||k(b,t,a.flags)||f("except",b)||(n[b]=a.instance);!h(a,"static")||c&&e===t&&(!D||"get"===b||"set"===b)||k(b,e,a.flags)||f("except",b)||(J[b]=a)}),v(e,J),v(t,n),q||g(d,"active",!0),d});x[a]=d;L["[object "+a+"]"]=d;E(a);Y(d);return e[a]=d}function Z(){return"Sugar"}function X(a,b,c,d,f){m(b,function(b,k){var l=b;d&&(l=M(b));f&&(l.flags=f);if(c&2&&!b.instance){var e=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d?M(b,!0):aa(b);g(l,"instance",e)}c&1&&g(l,"static",!0);e=l;a[k]=e;e.instance&&w(a,k,e.instance);a.active&&a.extend(k)})}function C(a,b,c){if("string"===typeof a){var d={};d[a]=b;a=c}else d=a,a=b;return{a:a,methods:d}}function M(a,b){var c=a.length-1-(b?1:0);return function(){var d=[],f=[];b&&d.push(this);var l=Math.max(arguments.length,c);for(var e=0;e<l;e++)e<c?d.push(arguments[e]):f.push(arguments[e]);d.push(f);return a.apply(this,d)}}function aa(a){switch(a.length){case 0:case 1:return function(){return a(this)};
    case 2:return function(b){return a(this,b)};case 3:return function(b,c){return a(this,b,c)};case 4:return function(b,c,d){return a(this,b,c,d)};case 5:return function(b,c,d,f){return a(this,b,c,d,f)}}}function v(a,b,c,d){m(b,function(b,e){c&&!d&&a[e]||g(a,e,b)})}function K(a){function b(a,d){if(!(this instanceof b))return new b(a,d);this.constructor!==b&&(a=this.constructor.apply(a,arguments));this.raw=a}g(b,"toString",function(){return"Sugar"+a});g(b.prototype,"valueOf",function(){return this.raw});
    return b}function w(a,b,c){c=ba(c);var d;var f=N.prototype;var l=(d=f[b])&&d!==Object.prototype[b];d&&d.b||(f[b]=l?ca(b):c);a.prototype[b]=c;a===e.Object&&da(b,c)}function Y(a){m(e.Object&&e.Object.prototype,function(b,c){if("function"===typeof b){var d=a.prototype;h(d,c)||(d[c]=b)}})}function da(a,b){m(x,function(c){c=c.prototype;h(c,a)||(c[a]=b)})}function ba(a){return function(){return new N(a.apply(this.raw,arguments))}}function ca(a){function b(){var b=this.raw,d;null!=b&&(d=L[u(b)]);d||(d=e.Object);
    return(new d(b))[a].apply(this,arguments)}b.b=!0;return b}function E(a,b){var c=x[a],d=p[a].prototype;!b&&O&&(b=O(d));m(b,function(a){if("constructor"!==a&&"valueOf"!==a&&"__proto__"!==a){try{var b=d[a];if("function"!==typeof b)return}catch(k){return}w(c,a,b)}})}function ea(a,b,c){a[b]=c.value}function g(a,b,c,d){y(a,b,{value:c,enumerable:!!d,configurable:!0,writable:!0})}function u(a){return fa.call(a)}function h(a,b){return!!a&&ha.call(a,b)}function F(a,b){if(h(a,b))return a[b]}function z(a,b,c){c||
(c=u(a));return c==="[object "+b+"]"}function A(a){var b=b||typeof a;return null==a||"string"===b||"number"===b||"boolean"===b}function ia(a){A(a)&&(a=Object(a));if(ja&&P(a))for(var b=a,c=0,d;d=b.charAt(c);)b[c++]=d;return a}function ka(a,b){var c=[],d;for(d in a)d>>>0==d&&4294967295!=d&&d>=b&&c.push(+d);c.sort(function(a,c){var d=a>b;return d!==c>b?d?-1:1:a-c});return c}function la(a){for(var b="Int8 Uint8 Uint8Clamped Int16 Uint16 Int32 Uint32 Float32 Float64".split(" "),c=0,d=b.length;c<d;c++){if(!(c in
        b)){d=ka(b,c);for(var f=0,e=d.length;f<e;f++)c=d[f],a.call(b,b[c],c,b);break}a(b[c],c)}}function ma(a){function b(a,b){if(a||-1<d.indexOf(b))c+=b}var c="";var d=d||"";b(a.global,"g");b(a.ignoreCase,"i");b(a.multiline,"m");b(a.f,"y");return c}function na(a,b,c){G&&a?Q(G,b,c,a):m(b,c);R&&Q(R,b,c,a)}function Q(a,b,c,d){a=a(b);for(var f,e=0,k;k=a[e];e++)f=S(b,k),(f.enumerable||d)&&c(b[k],k)}function T(a,b,c,d,f,l){var k=U(d),g=!1!==d;void 0===a?a=V(b):g&&B(a)&&B(b)&&a.setTime(b.getTime());if(A(a))return b;
    A(b)&&(b=ia(b));na(f,b,function(m,h){var n=b[h];var q=F(a,h);if(k){var p=d(h,q,n,a,b);if(void 0===p)return;if(void 0!==p&&p!==e){n=p;var r=!0}}else if(void 0===n)return;if((r=!r&&c&&!!n&&"object"===typeof n&&!H(n))||g||void 0===q)r&&(n=T(q,n,c,d,f,l)),G&&l?(q=a,r=S(b,h),void 0!==r.value&&(r.value=n),y(q,h,r)):a[h]=n});return a}function V(a){var b=u(a);if(W(a,b))return[];var c;if(c=!!a&&"object"===typeof a&&z(a,"Object",b))c="constructor"in a,c=!c&&!("toString"in a)||c&&!h(a,"constructor")&&h(a.constructor.prototype,
    "isPrototypeOf");if(c)a:{c=Object.prototype;for(var d in a){var f=a[d];if(!h(a,d)&&f!==c[d]){c=!1;break a}}c=!0}if(c)return{};if(B(a,b))return new Date(a.getTime());if(H(a,b))return RegExp(a.source,ma(a));if(A(a&&a.valueOf()))return a;throw new TypeError("Must be a basic data type");}var e,p="undefined"!==typeof global&&global.Object===Object?global:this,oa="undefined"!==typeof module&&module.c,D=!1,x={},L={},y=Object.defineProperty&&Object.defineProperties?Object.defineProperty:ea,N=K("Chainable"),
                                                                                                                                                                                                                                                                                                     O=Object.getOwnPropertyNames,fa=Object.prototype.toString,ha=Object.prototype.hasOwnProperty;(function(){e=p.Sugar;if(!e){e=function(a){m(e,function(b,c){h(x,c)&&b.extend(a)});return e};if(oa)module.c=e;else try{p.Sugar=e}catch(a){}m("Object Number String Array Date RegExp Function".split(" "),function(a){I(a)});g(e,"extend",e);g(e,"toString",Z);g(e,"createNamespace",I);g(e,"util",{hasOwn:h,getOwn:F,setProperty:g,classToString:u,defineProperty:y,forEachProperty:m,mapNativeToChainable:E})}})();var ja=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               !("0"in Object("a")),pa=e.Object;h=e.util.hasOwn;F=e.util.getOwn;g=e.util.setProperty;u=e.util.classToString;y=e.util.defineProperty;m=e.util.forEachProperty;E=e.util.mapNativeToChainable;var P,B,H,U,W,qa=function(a){return function(b,c,d){b[a](c,d)}}("defineInstanceAndStatic");(function(){function a(a,d){return d&&z(new d,"Object")?b(d):c(a)}function b(a){var b=String(a);return function(a){return String(a.constructor)===b}}function c(a){return function(b,c){return z(b,a,c)}}function d(a){var b=a.toLowerCase();
    return function(c){var d=typeof c;return d===b||"object"===d&&z(c,a)}}(function(){var b="Boolean Number String Date RegExp Function Array Error Set Map".split(" ");P=d(b[2]);B=a(b[3]);H=a(b[4]);U=a(b[5]);W=Array.isArray||a(b[6]);a(b[7]);a(b[8],"undefined"!==typeof Set&&Set);a(b[9],"undefined"!==typeof Map&&Map)})();(function(){la(function(){})})()})();var G=Object.getOwnPropertyNames,R=Object.getOwnPropertySymbols,S=Object.getOwnPropertyDescriptor;qa(pa,{clone:function(a,b){var c=V(a);return T(c,
    a,b,!0,!0,!0)}})}).call(this);
const expect    = chai.expect;

function getParams(){
    var params = {
        element: 'div',
        textAsString: 'Hello',
        properties: {
            className: 'wrapper',
            styles:{
                backgroundColor:'blue'
            }
        },
        subjects: [
            {
                element: 'h1',
                textAsString: 'it\'s me',
                properties: {
                    className: 'heading',
                    styles:{
                        color:'white'
                    }
                }
            },
            {
                element: 'h2',
                textAsString: 'How are you?',
                properties: {
                    className: 'subtitle',
                    styles:{
                        color:'white'
                    }
                }
            },
            {
                element: 'div',
                properties: {
                    className: 'subtitle',
                    styles: {
                        backgroundColor: 'black',
                        color: 'white'
                    }
                },
                subjects:[{
                    element: 'div',
                    properties: {
                        className: 'container',
                    },
                    subjects: [{
                        element: 'h3',
                        textAsString: 'Testing',
                        properties: {
                            className: 'minor-heading',
                            id: 'minor-heading'
                        }
                    }]
                }]
            }]
    };

    return Sugar.Object.clone(params, true)
}

describe('KingDOM Tests', function(){
    describe('When testing the CONSTRUCTOR', function(){

        describe("With no parameters", function(){
            var kingdom = new Kingdom();

            it("element must be empty", function() {
                expect(kingdom.delegateLord.element).to.equal('');
            });

            it("children must be initialized and empty", function() {
                expect(kingdom.delegateLord.subjects).to.eql([]);
            });

            it("properties must be undefined", function() {
                expect(kingdom.delegateLord.properties).to.be.undefined;
            });

            it("text must be undefined", function() {
                expect(kingdom.delegateLord.textAsHTML).to.be.undefined;
                expect(kingdom.delegateLord.textAsString).to.be.undefined;
            });
        })

        describe("With bad parameters such as:", function(){

            describe("a string", function(){

                it("it must throw an error", function() {
                    expect(function(){
                        var kingdom = new Kingdom('kingdom rules');
                    }).to.throw();
                });

            })

            describe("an array", function(){

                it("it must throw an error", function() {
                    expect(function(){
                        var kingdom = new Kingdom(['kingdom']);
                    }).to.throw();
                });

            })

            describe("a number", function(){

                it("it must throw an error", function() {
                    expect(function(){
                        var kingdom = new Kingdom(321);
                    }).to.throw();
                });

            })

            describe("an object with unexpected properties", function(){
                var value = {
                    name: 'King',
                    children: ['prince', 'princess'],
                    properties:['none'],
                    text: 321
                };
                var kingdom = new Kingdom(value);

                it("it will be unfortunately accepted", function() {
                    expect(kingdom.delegateLord).to.equal(value);
                });

            })

        })

        describe("With good parameters", function(){

            var kingdom = new Kingdom(getParams());

            it("will be accepted", function() {
                expect(kingdom.delegateLord).to.eql(getParams());
            });
        })

    });

    describe('when calling .getLord() of large data', function(){

        var kingdom;

        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        describe("when at root", function(){
            it("should give me the root", function() {
                var subjectAtLevelZero = kingdom.delegateLord;
                var subjectAtSubZero = kingdom.getLord().delegateLord;

                expect(kingdom.delegateLord).to.equal(subjectAtLevelZero);
                expect(kingdom.delegateLord).to.equal(subjectAtSubZero);
                expect(subjectAtLevelZero).to.equal(subjectAtSubZero);
            });
        });

        describe("when TWO levels deep", function(){

            it("should give me data at level ONE", function() {
                var subjectAtLevelOne = kingdom.makeSubjectLordAtIndex(2).delegateLord;
                var kingomAtLevelTwo = kingdom.makeSubjectLordAtIndex(0);
                var kindgomAtLevelOne = kingomAtLevelTwo.getLord();

                expect(kindgomAtLevelOne.delegateLord).to.equal(subjectAtLevelOne);
                expect(kingomAtLevelTwo.delegateLord).to.equal(subjectAtLevelOne);
                expect(kingdom.delegateLord).to.equal(subjectAtLevelOne);
            });


        })

        describe("when ONE level deep", function(){

            it("should give me data at level ZERO", function() {
                var subjectAtLevelZero = kingdom.delegateLord;
                var subjectAtLevelOne = kingdom.makeSubjectLordAtIndex(0).delegateLord;
                var kindgomAtLevelOne = kingdom.getLord();

                expect(kindgomAtLevelOne.delegateLord).to.equal(subjectAtLevelZero);
                expect(kingdom.delegateLord).to.equal(subjectAtLevelZero);
                expect(subjectAtLevelOne).not.to.equal(subjectAtLevelZero);
            });


        })


    });

    describe('when calling .gotoKing() of large data', function(){

        var kingdom;

        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        describe("at root", function(){
            it("should give me the root", function() {
                var atLevelZero = kingdom.delegateLord;
                var atSubZero = kingdom.gotoKing().delegateLord;
                expect(kingdom.delegateLord).to.equal(atLevelZero);
                expect(kingdom.delegateLord).to.equal(atSubZero);
            });
        });

        describe("when TWO levels deep", function(){

            it("should give me data at ROOT", function() {
                var subjectAtLevelZero = kingdom.delegateLord;
                var subjectAtLevelOne = kingdom.makeSubjectLordAtIndex(2).delegateLord;
                var kingomAtLevelTwo = kingdom.makeSubjectLordAtIndex(0);
                var kindgomAtLevelZero = kingomAtLevelTwo.gotoKing();

                expect(kindgomAtLevelZero.delegateLord).to.equal(subjectAtLevelZero);
                expect(kingomAtLevelTwo.delegateLord).to.equal(subjectAtLevelZero);
                expect(kingdom.delegateLord).to.equal(subjectAtLevelZero);
                expect(subjectAtLevelOne).not.to.equal(subjectAtLevelZero);
            });


        })

        describe("when ONE level deep", function(){

            it("should give me data at level ZERO", function() {
                var subjectAtLevelZero = kingdom.delegateLord;
                var subjectAtLevelOne = kingdom.makeSubjectLordAtIndex(0).delegateLord;
                var kingdomAtLevelZero = kingdom.gotoKing();

                expect(kingdomAtLevelZero.delegateLord).to.equal(subjectAtLevelZero);
                expect(kingdom.delegateLord).to.equal(subjectAtLevelZero);
                expect(subjectAtLevelOne).not.to.equal(subjectAtLevelZero);
            });


        })


    });

    describe('when calling .addSubject()', function(){

        var kingdom;

        var smallParams = {
            element: 'div',
            subjects:[]
        };

        var fromRoot = {
            element:'',
            subjects:[smallParams]
        }

        describe('using good data', function(){

            beforeEach(function() {
                kingdom = new Kingdom();
            });

            describe("with makeLord = false", function(){
                it("should add child to the root without updating current node", function() {
                    kingdom.addSubject(smallParams);
                    expect(kingdom.delegateLord).to.eql(fromRoot);
                });
            });

            describe("with makeLord = true", function(){
                it("should add child to the root and become current node", function() {
                    kingdom.addSubject(smallParams, true);
                    expect(kingdom.delegateLord).to.eql(smallParams);
                });
            });

            describe("with the subject === {}", function(){
                it("it will add {subjects: []} as a child", function() {
                    kingdom.addSubject({});
                    expect(kingdom.delegateLord.subjects[0]).to.eql({subjects: []});
                });
            });

            describe("multiple times (5x)", function(){
                it("there should be 5 subjects", function() {
                    kingdom
                        .addSubject(smallParams)
                        .addSubject(smallParams)
                        .addSubject(smallParams)
                        .addSubject(smallParams)
                        .addSubject(smallParams);

                    expect(kingdom.delegateLord.subjects.length).to.equal(5);
                });
            });

        });

        describe('using bad data', function(){

            beforeEach(function() {
                kingdom = new Kingdom();
            });

            describe("with subject === undefined", function(){
                it("should through an error", function() {
                    expect(function(){
                        kingdom.addSubject();
                    }).to.throw();
                });
            });

            describe("with an subject === array && makeLord === true", function(){
                it("should through an error", function() {
                    expect(function(){
                        kingdom.addSubject(null, true);
                    }).to.throw();
                });
            });

        });


    });

    describe('when calling .makeSubjectLordAtIndex()', function(){

        var kingdom;

        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        it("the current node will stay the same when the index === 3 out of bounds ", function() {
            var before = kingdom.delegateLord;
            var after = kingdom.makeSubjectLordAtIndex(3).delegateLord;
            expect(before).to.eql(after);
        });

        it("the current node will change to item 3 when index === 2", function() {
            var after = kingdom.makeSubjectLordAtIndex(2).delegateLord
            expect(after).to.eql(getParams().subjects[2]);
        });

        it("the current node will change to item 2 when index === '1'", function() {
            var after = kingdom.makeSubjectLordAtIndex('1').delegateLord
            expect(after).to.eql(getParams().subjects[1]);
        });

        it("should throw error when given an array", function(){
            expect(function(){
                kingdom.makeSubjectLordAtIndex(['king'])
            }).to.throw();
        });

        it("should throw error when given an object", function(){
            expect(function(){
                kingdom.makeSubjectLordAtIndex({ play: 'king'})
            }).to.throw();
        });

        it("should throw error when given an non number string", function(){
            expect(function(){
                kingdom.makeSubjectLordAtIndex('subjects')
            }).to.throw();
        });

    })

    describe('when calling .banishSubjectAtIndex()', function(){

        var kingdom;

        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        it("return false when empty ", function() {
            kingdom = new Kingdom();
            var response = kingdom.banishSubjectAtIndex(0);
            expect(response).to.be.false;
        });

        it("return true when child exists at index 2 ", function() {
            var goingToDelete = kingdom.delegateLord.subjects[2];
            var response = kingdom.banishSubjectAtIndex(2);
            expect(response).to.be.true;
            expect(kingdom.delegateLord.subjects).not.to.include(goingToDelete)
        });

        it("return true when child exists @ index ===  '1'", function() {
            var goingToDelete = kingdom.delegateLord.subjects[1];
            var response = kingdom.banishSubjectAtIndex('1');
            expect(response).to.be.true;
            expect(kingdom.delegateLord.subjects).not.to.include(goingToDelete)
        });

        it("return false when index === []", function() {
            expect(function(){
                var response = kingdom.banishSubjectAtIndex([]);
            }).to.throw()
        });

        it("return false when index === {}", function() {
            expect(function(){
                var response = kingdom.banishSubjectAtIndex({});
            }).to.throw()
        });

    });

    describe('when calling .banishSubjectsForCurrentLord()', function(){

        var kingdom;

        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        it("subjects remain empty when empty ", function() {
            kingdom = new Kingdom();
            kingdom.banishSubjectsForCurrentLord();
            expect(kingdom.delegateLord.subjects).to.eql([]);
        });

        it("subjects become empty when current node at root and subjects exists", function() {
            var response = kingdom.banishSubjectsForCurrentLord();
            expect(kingdom.delegateLord.subjects).to.eql([])
        });

        it("subjects become empty when current node at root and subjects exists", function() {
            var before = kingdom.delegateLord;
            kingdom.banishSubjectsForCurrentLord();
            before.subjects = [];
            expect(kingdom.delegateLord.subjects).to.eql([]);
            expect(kingdom.delegateLord).to.eql(before)
        });

    });

    describe('when calling .destroyKingdom()', function(){

        var kingdom;
        var root = {element:'', subjects: []};
        beforeEach(function() {
            kingdom = new Kingdom(getParams());
        });

        it("nothing happens when kingdom is empty", function() {
            kingdom = new Kingdom();
            var before = kingdom.delegateLord;
            kingdom.destroyKingdom();
            var after = kingdom.delegateLord;
            expect(before).to.eql(after);
        });

        it("everything is destroyed and current node stays at root", function() {
            var response = kingdom.destroyKingdom();
            var newKingdom = new Kingdom();
            expect(kingdom.delegateLord).to.eql(root)
            expect(kingdom.delegateLord).to.eql(newKingdom.delegateLord)

        });

        it("Everything is destroyed and current node goes to root when 2 levels deep", function() {
            var before = kingdom
                .makeSubjectLordAtIndex(2)
                .makeSubjectLordAtIndex(0)
                .delegateLord;
            var newKingdom = new Kingdom();
            kingdom.destroyKingdom();

            expect(before).not.to.equal(kingdom.delegateLord);
            expect(kingdom.delegateLord).to.eql(newKingdom.delegateLord)
        });

    });

    describe('when calling .buildKingdom()', function(){

        var kingdom;
        var root = {element:'', subjects: []};
        var outer, inner;

        beforeEach(function() {
            kingdom = new Kingdom();
            kingdom
                .addSubject({
                    element: 'div',
                    textAsHTML: '<span> awesome </span>',
                    properties:{
                        className:'good',
                        id:'times'
                    }
                }, true)
                .addSubject({
                    element:'span',
                    textAsString: 'nice'
                });

            var frag = document.createDocumentFragment()
            var d = document.createElement('div')
            var e = document.createElement('span')
            e.innerText = 'nice'
            d.className = 'good';
            d.id = 'times'
            d.innerHTML = '<span> awesome </span> <span> nice </span>'
            frag.appendChild(d);


        });

        it("return empty document fragment when empty", function() {
            kingdom = new Kingdom();
            var frag = kingdom.buildKingdom();
            expect(frag).to.eql(document.createDocumentFragment());
        });


    });
});


