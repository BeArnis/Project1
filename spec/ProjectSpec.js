/*global describe, it, expect, rep_init*/

describe ("Class diagramm", function () {
	var myrep = rep_init;
	it("should return something after we initiate the creation of our repository", function () {
		expect(typeof (rep_init())).toEqual("object");
	});
});