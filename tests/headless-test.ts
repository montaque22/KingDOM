
import  Kingdom  from "../js/kingdom";
// import {expect} from "chai"




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


    });


});



