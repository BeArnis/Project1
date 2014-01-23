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
    it(" should have a method that tells us if class1 has a generalization with class2", function () {
        expect(typeof (myrep.generalization_of)).toEqual("function");
    });
    it(" should have a method that deletes a generalization", function () {
        expect(typeof (myrep.delete_generalization)).toEqual("function");
    });
    it(" should have a method that adds an instance", function () {
        expect(typeof (myrep.add_instance)).toEqual("function");
    });
    it(" should have a method that deletas an instance", function () {
        expect(typeof (myrep.delete_instance)).toEqual("function");
    });
    it(" should have a method that checks if an instance exists", function () {
        expect(typeof (myrep.exists_instance)).toEqual("function");
    });
    it(" should have a method that adds a link between instances", function () {
        expect(typeof (myrep.add_link)).toEqual("function");
    });
    it(" should have a method that checks if there is a link between instances", function () {
        expect(typeof (myrep.exists_link)).toEqual("function");
    });
    it(" should have a method that deletes a link between instances", function () {
        expect(typeof (myrep.delete_link)).toEqual("function");
    });
    it(" should have a method that adds an atribute to an instances", function () {
        expect(typeof (myrep.add_atribute_value)).toEqual("function");
    });
    it(" should have a method that checks if there is an atribute in an instances", function () {
        expect(typeof (myrep.exists_atribute_value)).toEqual("function");
    });
    it(" should have a method that deletes an atribute in an instances", function () {
        expect(typeof (myrep.delete_atribute_value)).toEqual("function");
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
    it(" should return true if we add a generalization and check it", function () {
        myrep.add_class("animal");
        myrep.add_class("human");
        myrep.add_generalization("animal", "human");
        expect(myrep.generalization_of("animal", "human")).toEqual(true);
    });
    it(" should return false if we add a generalization, delete it and then check it", function () {
        myrep.add_class("animal");
        myrep.add_class("human");
        myrep.add_generalization("animal", "human");
        myrep.delete_generalization("animal", "human");
        expect(myrep.generalization_of("animal", "human")).toEqual(false);
    });
    it(" should return true if instance is created and checked if this instance exists in our repository", function () {
        myrep.add_instance("darbinieks");
        expect(myrep.exists_instance("darbinieks")).toEqual(true);
    });
    it(" should return false if instance is created, deleted and checked if this instance exists in our repository", function () {
        myrep.add_instance("darbinieks");
        myrep.delete_instance("darbinieks");
        expect(myrep.exists_instance("darbinieks")).toEqual(false);
    });
    it(" should return true if there is a link between instances", function () {
        myrep.add_instance("darbinieks");
        myrep.add_instance("saimnieks");
        myrep.add_link("darbinieks", "atbildigais", "saimnieks");
        expect(myrep.exists_link("darbinieks", "atbildigais", "saimnieks")).toEqual(true);
    });
    it(" should return false if there is a link between instances and it is deleted and we check if there is a link between these instances", function () {
        myrep.add_instance("darbinieks");
        myrep.add_instance("saimnieks");
        myrep.add_link("darbinieks", "atbildigais", "saimnieks");
        myrep.delete_link("darbinieks", "atbildigais", "saimnieks");
        expect(myrep.exists_link("darbinieks", "atbildigais", "saimnieks")).toEqual(false);
    });
});