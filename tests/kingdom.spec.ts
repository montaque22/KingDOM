/**
 * Created by mmontaque on 5/10/17.
 */
/**
 * Created by mmontaque on 5/9/17.
 */
import {Kingdom} from '../../lib/kingdom'

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

describe('When testing the CONSTRUCTOR', function(){
    var params = {
        element: 'div',
        textAsString: 'Hello',
        properties: {
            className: 'wrapper',
            styles:{
                backgroundColor:'blue'
            }
        },
        subjects: [{
            element: 'h1',
            textAsString: 'it\'s me',
            properties: {
                className: 'heading',
                styles:{
                    color:'white'
                }
            }
        }]
    };

    describe("With no parameters", function(){
        var kingdom = new Kingdom();

        it("element must be empty", function() {
            expect(kingdom.delegateLord.element).toEqual('');
        });

        it("children must be initialized and empty", function() {
            expect(kingdom.delegateLord.subjects).toEqual([]);
        });

        it("properties must be undefined", function() {
            expect(kingdom.delegateLord.properties).toBeUndefined();
        });

        it("text must be undefined", function() {
            expect(kingdom.delegateLord.textAsHTML).toBeUndefined();
            expect(kingdom.delegateLord.textAsString).toBeUndefined();
        });
    })

    describe("With bad parameters such as:", function(){

        describe("a string", function(){

            it("it must throw an error", function() {
                expect(function(){
                    var kingdom = new Kingdom('kingdom rules');
                }).toThrowError();
            });

        })

        describe("an array", function(){

            it("it must throw an error", function() {
                expect(function(){
                    var kingdom = new Kingdom(['kingdom']);
                }).toThrowError();
            });

        })

        describe("a number", function(){

            it("it must throw an error", function() {
                expect(function(){
                    var kingdom = new Kingdom(321);
                }).toThrowError();
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
                expect(kingdom.delegateLord).toEqual(value);
            });

        })

    })

    describe("With good parameters", function(){

        var kingdom = new Kingdom(params);

        it("will be accepted", function() {
            expect(kingdom.delegateLord).toEqual(params);
        });
    })

});

describe('when calling .parent() of large data', function(){

    var kingdom;

    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    describe("when at root", function(){
        it("should give me the root", function() {
            var subjectAtLevelZero = kingdom.delegateLord;
            var subjectAtSubZero = kingdom.parent().delegateLord;

            expect(kingdom.delegateLord).toEqual(subjectAtLevelZero);
            expect(kingdom.delegateLord).toEqual(subjectAtSubZero);
            expect(subjectAtLevelZero).toEqual(subjectAtSubZero);
        });
    });

    describe("when TWO levels deep", function(){

        it("should give me data at level ONE", function() {
            var subjectAtLevelOne = kingdom.gotoSubjectAtIndex(2).delegateLord;
            var kingomAtLevelTwo = kingdom.gotoSubjectAtIndex(0);
            var kindgomAtLevelOne = kingomAtLevelTwo.parent();

            expect(kindgomAtLevelOne.delegateLord).toEqual(subjectAtLevelOne);
            expect(kingomAtLevelTwo.delegateLord).toEqual(subjectAtLevelOne);
            expect(kingdom.delegateLord).toEqual(subjectAtLevelOne);
        });


    })

    describe("when ONE level deep", function(){

        it("should give me data at level ZERO", function() {
            var subjectAtLevelZero = kingdom.delegateLord;
            var subjectAtLevelOne = kingdom.gotoSubjectAtIndex(0).delegateLord;
            var kindgomAtLevelOne = kingdom.parent();

            expect(kindgomAtLevelOne.delegateLord).toEqual(subjectAtLevelZero);
            expect(kingdom.delegateLord).toEqual(subjectAtLevelZero);
            expect(subjectAtLevelOne).not.toEqual(subjectAtLevelZero);
        });


    })


});

describe('when calling .gotoKing() of large data', function(){

    var kingdom;

    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    describe("at root", function(){
        it("should give me the root", function() {
            var atLevelZero = kingdom.delegateLord;
            var atSubZero = kingdom.gotoKing().delegateLord;
            expect(kingdom.delegateLord).toEqual(atLevelZero);
            expect(kingdom.delegateLord).toEqual(atSubZero);
        });
    });

    describe("when TWO levels deep", function(){

        it("should give me data at ROOT", function() {
            var subjectAtLevelZero = kingdom.delegateLord;
            var subjectAtLevelOne = kingdom.gotoSubjectAtIndex(2).delegateLord;
            var kingomAtLevelTwo = kingdom.gotoSubjectAtIndex(0);
            var kindgomAtLevelZero = kingomAtLevelTwo.gotoKing();

            expect(kindgomAtLevelZero.delegateLord).toEqual(subjectAtLevelZero);
            expect(kingomAtLevelTwo.delegateLord).toEqual(subjectAtLevelZero);
            expect(kingdom.delegateLord).toEqual(subjectAtLevelZero);
            expect(subjectAtLevelOne).not.toEqual(subjectAtLevelZero);
        });


    })

    describe("when ONE level deep", function(){

        it("should give me data at level ZERO", function() {
            var subjectAtLevelZero = kingdom.delegateLord;
            var subjectAtLevelOne = kingdom.gotoSubjectAtIndex(0).delegateLord;
            var kingdomAtLevelZero = kingdom.gotoKing();

            expect(kingdomAtLevelZero.delegateLord).toEqual(subjectAtLevelZero);
            expect(kingdom.delegateLord).toEqual(subjectAtLevelZero);
            expect(subjectAtLevelOne).not.toEqual(subjectAtLevelZero);
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
                expect(kingdom.delegateLord).toEqual(fromRoot);
            });
        });

        describe("with makeLord = true", function(){
            it("should add child to the root and become current node", function() {
                kingdom.addSubject(smallParams, true);
                expect(kingdom.delegateLord).toEqual(smallParams);
            });
        });

        describe("with the subject === {}", function(){
            it("it will add {subjects: []} as a child", function() {
                kingdom.addSubject({});
                expect(kingdom.delegateLord.subjects[0]).toEqual({subjects: []});
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

                expect(kingdom.delegateLord.subjects.length).toBe(5);
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
                }).toThrowError();
            });
        });

        describe("with an subject === array && makeLord === true", function(){
            it("should through an error", function() {
                expect(function(){
                    kingdom.addSubject(null, true);
                }).toThrowError();
            });
        });

    });


});

describe('when calling .gotoSubjectAtIndex()', function(){

    var kingdom;

    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    it("the current node will stay the same when the index === 3 out of bounds ", function() {
        var before = kingdom.delegateLord;
        var after = kingdom.gotoSubjectAtIndex(3).delegateLord;
        expect(before).toEqual(after);
    });

    it("the current node will change to item 3 when index === 2", function() {
        var after = kingdom.gotoSubjectAtIndex(2).delegateLord
        expect(after).toEqual(params.subjects[2]);
    });

    it("the current node will change to item 2 when index === '1'", function() {
        var after = kingdom.gotoSubjectAtIndex('1').delegateLord
        expect(after).toEqual(params.subjects[1]);
    });

    it("should throw error when given an array", function(){
        expect(function(){
            kingdom.gotoSubjectAtIndex(['king'])
        }).toThrowError();
    });

    it("should throw error when given an object", function(){
        expect(function(){
            kingdom.gotoSubjectAtIndex({ play: 'king'})
        }).toThrowError();
    });

    it("should throw error when given an non number string", function(){
        expect(function(){
            kingdom.gotoSubjectAtIndex('subjects')
        }).toThrowError();
    });

})

describe('when calling .detachSubjectAtIndex()', function(){

    var kingdom;

    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    it("return false when empty ", function() {
        kingdom = new Kingdom();
        var response = kingdom.detachSubjectAtIndex(0);
        expect(response).toBeFalsy();
    });

    it("return true when child exists at index 2 ", function() {
        var goingToDelete = kingdom.delegateLord.subjects[2];
        var response = kingdom.detachSubjectAtIndex(2);
        expect(response).toBeTruthy();
        expect(kingdom.delegateLord.subjects).not.toContain(goingToDelete)
    });

    it("return true when child exists @ index ===  '1'", function() {
        var goingToDelete = kingdom.delegateLord.subjects[1];
        var response = kingdom.detachSubjectAtIndex('1');
        expect(response).toBeTruthy();
        expect(kingdom.delegateLord.subjects).not.toContain(goingToDelete)
    });

    it("return false when index === []", function() {
        expect(function(){
            var response = kingdom.detachSubjectAtIndex([]);
        }).toThrowError()
    });

    it("return false when index === {}", function() {
        expect(function(){
            var response = kingdom.detachSubjectAtIndex({});
        }).toThrowError()
    });

});

describe('when calling .detachAllSubjectsForCurrentLord()', function(){

    var kingdom;

    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    it("subjects remain empty when empty ", function() {
        kingdom = new Kingdom();
        kingdom.detachAllSubjectsForCurrentLord();
        expect(kingdom.delegateLord.subjects).toEqual([]);
    });

    it("subjects become empty when current node at root and subjects exists", function() {
        var response = kingdom.detachAllSubjectsForCurrentLord();
        expect(kingdom.delegateLord.subjects).toEqual([])
    });

    it("subjects become empty when current node at root and subjects exists", function() {
        var before = kingdom.delegateLord;
        kingdom.detachAllSubjectsForCurrentLord();
        before.subjects = [];
        expect(kingdom.delegateLord.subjects).toEqual([]);
        expect(kingdom.delegateLord).toEqual(before)
    });

});

describe('when calling .destroyKingdom()', function(){

    var kingdom;
    var root = {element:'', subjects: []};
    beforeEach(function() {
        kingdom = new Kingdom(params);
    });

    it("nothing happens when kingdom is empty", function() {
        kingdom = new Kingdom();
        var before = kingdom.delegateLord;
        kingdom.destroyKingdom();
        var after = kingdom.delegateLord;
        expect(before).toEqual(after);
    });

    it("everything is destroyed and current node stays at root", function() {
        var response = kingdom.destroyKingdom();
        var newKingdom = new Kingdom();
        expect(kingdom.delegateLord).toEqual(root)
        expect(kingdom.delegateLord).toEqual(newKingdom.delegateLord)

    });

    it("Everything is destroyed and current node goes to root when 2 levels deep", function() {
        var before = kingdom
            .gotoSubjectAtIndex(2)
            .gotoSubjectAtIndex(0)
            .delegateLord;
        var newKingdom = new Kingdom();
        kingdom.destroyKingdom();

        expect(before).not.toEqual(kingdom.delegateLord);
        expect(kingdom.delegateLord).toEqual(newKingdom.delegateLord)
    });

});

describe('when calling .buildKingdomForDelegateLord()', function(){

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
        // element = $('<div class="good" id="times" > <span> awesome </span> </div>')
        outer = $(frag)
        inner = $(e)

    });

    it("return empty document fragment when empty", function() {
        kingdom = new Kingdom();
        var frag = kingdom.buildKingdomForDelegateLord();
        expect(frag).toEqual(document.createDocumentFragment());
    });


});
