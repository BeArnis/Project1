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
});