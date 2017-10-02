/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import {Kingdom, Subject} from "../js/kingdom";
import {expect} from "chai"
import {JSDOM} from 'jsdom'
import * as Sugar from 'sugar'
const {window} = new JSDOM(``);

global['document'] = window.document;

function getParams(): Subject{
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
    return <Subject>Sugar.Object.clone(params, true)
}

describe('KingDOM Tests', function(){

    describe('When testing the Constructor', function(){

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
