/*global describe, it, expect, rep_init*/

describe("Class diagramm", function () {
    var myrep;
    beforeEach(function () {
        myrep = rep_init();
    });
    it(" should return something after we initiate the creation of our repository", function () {
        expect(typeof (rep_init())).toEqual("object");
    });
    it(" should have a method that allows to add a new class", function () {
        expect(typeof (myrep.add_class)).toEqual("function");
    });
    it(" should have a method that checks if class exists", function () {
        expect(typeof (myrep.exists_class)).toEqual("function");
    });
    it(" should have a method that deletes a class", function () {
        expect(typeof (myrep.delete_class)).toEqual("function");
    });
    it(" should have a method add atribute a class", function () {
        expect(typeof (myrep.add_atribute)).toEqual("function");
    });
    it(" should have a method check if atribute exists", function () {
        expect(typeof (myrep.exists_atribute)).toEqual("function");
    });
    it(" should have a method that deletes an atribute", function () {
        expect(typeof (myrep.delete_atribute)).toEqual("function");
    });
    it(" should have a method that adds generalizations", function () {
        expect(typeof (myrep.add_generalization)).toEqual("function");
    });
    it(" should have a method that tells us if class1 has a generalizations with class2", function () {
        expect(typeof (myrep.generalization_of)).toEqual("function");
    });
    it(" should return true if checked if a class exists that has been added", function () {
        myrep.add_class("human");
        expect(myrep.exists_class("human")).toEqual(true);
    });
    it(" should return false if checked if a class exists that has not been added", function () {
        myrep.add_class("cat");
        expect(myrep.exists_class("person")).toEqual(false);
    });
    it(" should return false if checked a class that has been added and then deleted", function () {
        myrep.add_class("human");
        myrep.delete_class("human");
        expect(myrep.exists_class("human")).toEqual(false);
    });
    it(" should return true if check an atribute that has been added", function () {
        myrep.add_class("human");
        myrep.add_atribute("human", "janis");
        expect(myrep.exists_atribute("human", "janis")).toEqual(true);
    });
    it(" should return false if check an atribute that has not been added", function () {
        myrep.add_class("human");
        myrep.add_atribute("human", "toms");
        expect(myrep.exists_atribute("human", "janis")).toEqual(false);
    });
    it(" should return false if check an atribute that has been added but then deleted", function () {
        myrep.add_class("human");
        myrep.add_atribute("human", "toms");
        myrep.delete_atribute("human", "toms");
        expect(myrep.exists_atribute("human", "toms")).toEqual(false);
    });
});