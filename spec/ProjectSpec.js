/*global describe, it, expect, rep_init*/

describe('Class diagramm', function() {
    var myrep;
    beforeEach(function() {
        myrep = rep_init();
    });
    it(' should return something after we initiate the creation of our repository',
        function() {
            expect(typeof (rep_init())).toEqual('object');
        });
    it(' should have a method that allows to add a new class', function() {
        expect(typeof (myrep.add_class)).toEqual('function');
    });
    it(' should have a method that checks if class exists', function() {
        expect(typeof (myrep.exists_class)).toEqual('function');
    });
    it(' should have a method that deletes a class', function() {
        expect(typeof (myrep.delete_class)).toEqual('function');
    });
    it(' should have a method add atribute a class', function() {
        expect(typeof (myrep.add_atribute)).toEqual('function');
    });
    it(' should have a method check if atribute exists', function() {
        expect(typeof (myrep.exists_atribute)).toEqual('function');
    });
    it(' should have a method that deletes an atribute', function() {
        expect(typeof (myrep.delete_atribute)).toEqual('function');
    });
    it(' should have a method that adds generalizations', function() {
        expect(typeof (myrep.add_generalization)).toEqual('function');
    });
    it(' should have a method that tells us if class1 has a generalization with class2', function() {
        expect(typeof (myrep.exists_generalization_of)).toEqual('function');
    });
    it(' should have a method that deletes a generalization', function() {
        expect(typeof (myrep.delete_generalization)).toEqual('function');
    });
    it(' should have a method that adds an instance', function() {
        expect(typeof (myrep.add_instance)).toEqual('function');
    });
    it(' should have a method that deletas an instance', function() {
        expect(typeof (myrep.delete_instance)).toEqual('function');
    });
    it(' should have a method that checks if an instance exists', function() {
        expect(typeof (myrep.exists_instance)).toEqual('function');
    });
    it(' should have a method that adds a link between instances', function() {
        expect(typeof (myrep.add_link)).toEqual('function');
    });
    it(' should have a method that checks if there is a link between instances', function() {
        expect(typeof (myrep.exists_link)).toEqual('function');
    });
    it(' should have a method that deletes a link between instances', function() {
        expect(typeof (myrep.delete_link)).toEqual('function');
    });
    it(' should have a method that adds an atribute to an instances', function() {
        expect(typeof (myrep.add_atribute_value)).toEqual('function');
    });
    it(' should have a method that checks if there is an atribute in an instances', function() {
        expect(typeof (myrep.exists_atribute_value)).toEqual('function');
    });
    it(' should have a method that deletes an atribute in an instances', function() {
        expect(typeof (myrep.delete_atribute_value)).toEqual('function');
    });
    it(' should have a method that adds a links from an instances to a class', function() {
        expect(typeof (myrep.add_instance_of)).toEqual('function');
    });
    it(' should have a method that deletes a links from an instances to a class', function() {
        expect(typeof (myrep.delete_instance_of)).toEqual('function');
    });
    it(' should have a method that checks if there is a links from an instances to a class', function() {
        expect(typeof (myrep.exists_instance_of)).toEqual('function');
    });
    it(' should have a method that adds an association between classes', function() {
        expect(typeof (myrep.add_association)).toEqual('function');
    });
    it(' should have a method that deletes an association between classes', function() {
        expect(typeof (myrep.delete_association)).toEqual('function');
    });
    it(' should have a method that checks if there is an association between classes', function() {
        expect(typeof (myrep.exists_association)).toEqual('function');
    });
    it(' should return true if checked if a class exists that has been added', function() {
        myrep.add_class('human');
        expect(myrep.exists_class('human')).toEqual(true);
    });
    it(' should return false if checked if a class exists that has not been added', function() {
        myrep.add_class('cat');
        expect(myrep.exists_class('person')).toEqual(false);
    });
    it(' should return false if checked a class that has been added and then deleted', function() {
        myrep.add_class('human');
        myrep.delete_class('human');
        expect(myrep.exists_class('human')).toEqual(false);
    });
    it(' should return true if check an atribute that has been added', function() {
        myrep.add_class('human');
        myrep.add_atribute('human', 'janis');
        expect(myrep.exists_atribute('human', 'janis')).toEqual(true);
    });
    it(' should return false if check an atribute that has not been added', function() {
        myrep.add_class('human');
        myrep.add_atribute('human', 'toms');
        expect(myrep.exists_atribute('human', 'janis')).toEqual(false);
    });
    it(' should return false if check an atribute that has been added but then deleted', function() {
        myrep.add_class('human');
        myrep.add_atribute('human', 'toms');
        myrep.delete_atribute('human', 'toms');
        expect(myrep.exists_atribute('human', 'toms')).toEqual(false);
    });
    it(' should return true if we add a generalization and check it', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_generalization('animal', 'human');
        expect(myrep.exists_generalization_of('animal', 'human')).toEqual(true);
    });
    it(' should return false if we add a generalization, delete it and then check it', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_generalization('animal', 'human');
        myrep.delete_generalization('animal', 'human');
        expect(myrep.exists_generalization_of('animal', 'human')).toEqual(false);
    });
    it(' should return true if we add two generalization and then check if they both exist', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_class('bird');
        myrep.add_generalization('animal', 'human');
        myrep.add_generalization('animal', 'bird');
        expect(myrep.exists_generalization_of('animal', 'human')).toEqual(true);
        expect(myrep.exists_generalization_of('animal', 'bird')).toEqual(true);
    });
    it(' should return true if instance is created and checked if this instance exists in our repository', function() {
        myrep.add_instance('darbinieks');
        expect(myrep.exists_instance('darbinieks')).toEqual(true);
    });
    it(' should return false if instance is created, deleted and checked if this instance exists in our repository', function() {
        myrep.add_instance('darbinieks');
        myrep.delete_instance('darbinieks');
        expect(myrep.exists_instance('darbinieks')).toEqual(false);
    });
    it(' should return true if there is a link between instances', function() {
        myrep.add_instance('darbinieks');
        myrep.add_instance('saimnieks');
        myrep.add_link('darbinieks', 'atbildigais', 'saimnieks');
        expect(myrep.exists_link('darbinieks', 'atbildigais', 'saimnieks')).toEqual(true);
    });
    it(' should return false if there is a link between instances and it is deleted and we check if there is a link between these instances', function() {
        myrep.add_instance('darbinieks');
        myrep.add_instance('saimnieks');
        myrep.add_link('darbinieks', 'atbildigais', 'saimnieks');
        myrep.delete_link('darbinieks', 'atbildigais', 'saimnieks');
        expect(myrep.exists_link('darbinieks', 'atbildigais', 'saimnieks')).toEqual(false);
    });
    it(' should return true if there are two links between instances', function() {
        myrep.add_instance('darbinieks');
        myrep.add_instance('saimnieks');
        myrep.add_instance('vadītājs');
        myrep.add_link('darbinieks', 'atbildigais', 'saimnieks');
        myrep.add_link('vadītājs', 'uzrauga', 'saimnieks');
        expect(myrep.exists_link('vadītājs', 'uzrauga', 'saimnieks')).toEqual(true);
        expect(myrep.exists_link('darbinieks', 'atbildigais', 'saimnieks')).toEqual(true);
    });
    it(' should return true when atribute is added to an instances and checked if it is there', function() {
        myrep.add_class('maja');
        myrep.add_atribute('maja', 'Iedzīvotājs');
        myrep.add_instance('dzīvoklis');
        myrep.add_instance_of('maja', 'dzīvoklis');
        myrep.add_atribute_value('dzīvoklis', 'Iedzīvotājs', 'baiba');
        myrep.instance_error('dzīvoklis');
        expect(myrep.exists_atribute_value('dzīvoklis', 'Iedzīvotājs', 'baiba')).toEqual(true);
    });
    it(' should return false when atribute is added to an instances, atribute is deleted and checked if it is there', function() {
        myrep.add_class('maja');
        myrep.add_atribute('maja', 'Iedzīvotājs');
        myrep.add_instance('dzīvoklis');
        myrep.add_atribute_value('dzīvoklis', 'Iedzīvotājs', 'baiba');
        myrep.delete_atribute_value('dzīvoklis', 'Iedzīvotājs', 'baiba');
        expect(myrep.exists_atribute_value('dzīvoklis', 'Iedzīvotājs', 'baiba')).toEqual(false);
    });
    it(' should return true when we add an instance_of link and check if it is there', function() {
        myrep.add_class('person');
        myrep.add_instance('andris');
        myrep.add_instance_of('person', 'andris');
        expect(myrep.exists_instance_of('person', 'andris')).toEqual(true);
    });
    it(' should return false when we add an instance_of link, delete it and check if it is still there', function() {
        myrep.add_class('person');
        myrep.add_instance('andris');
        myrep.add_instance_of('person', 'andris');
        myrep.delete_instance_of('person', 'andris');
        expect(myrep.exists_instance_of('person', 'andris')).toEqual(false);
    });
    it(' should return true if association is added between two classes and checked if it is there', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_association('building', '2', '3', '4', 'land', '5', '3', '6');

        expect(myrep.exists_association('building', '2', '3', '4', 'land', '5', '3', '6')).toEqual(true);
    });
    it(' should return false if association is added between two classes and deleted and checked if it is there', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_association('building', '2', '3', '4', 'land', '5', '3', '6');
        myrep.delete_association('building', '2', '3', '4', 'land', '5', '3', '6');
        expect(myrep.exists_association('building', '2', '3', '4', 'land', '5', '3', '6')).toEqual(false);
    });
    it(' should return all superclasses of a class if we check it', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_class('nation');
        myrep.add_generalization('nation', 'land');
        myrep.add_generalization('land', 'building');
        var supercl = myrep.get_super_class('building');
        var v1 = supercl.pop();
        var v2 = supercl.pop();
        expect(myrep.exists_class(v1.name)).toEqual(true);
        expect(myrep.exists_class(v2.name)).toEqual(true);
        expect(v1.name).toEqual('nation');
        expect(v2.name).toEqual('land');
    });
    it(' should retur a class if we ask for one', function() {
        var class1 = myrep.get_class('tree');
        expect(myrep.exists_class(class1.name)).toEqual(true);
    });
    it(' should return an array of all atributes if we ask a class for its atributes', function() {
        myrep.add_class('animal');
        myrep.add_class('bear');
        myrep.add_atribute('animal', 'Legs');
        myrep.add_atribute('animal', 'Head_something');
        myrep.add_atribute('animal', 'Tail');
        var atribut_array = myrep.get_atribute('animal');
        expect(atribut_array[0]).toEqual('Legs');
        expect(atribut_array[1]).toEqual('Head_something');
        expect(atribut_array[2]).toEqual('Tail');
    });
    it(' should add all the atributes we give to a class', function() {
        myrep.add_class('bear');
        var atribut_array = ['big', 'strong', 'lazy', 'slow'];
        myrep.add_atribute('bear', atribut_array);
        var attr1 = myrep.class.bear.atribute[0];
        var attr2 = myrep.class.bear.atribute[1];
        var attr3 = myrep.class.bear.atribute[2];
        var attr4 = myrep.class.bear.atribute[3];
        expect(attr1).toEqual('big');
        expect(attr2).toEqual('strong');
        expect(attr3).toEqual('lazy');
        expect(attr4).toEqual('slow');
    });
    it(' should add all the atributes we give to a class', function() {
        myrep.add_class('animal');
        myrep.add_class('bear');
        myrep.add_class('baby_bear');
        myrep.add_class('embrio');
        myrep.add_generalization('animal', 'bear');
        myrep.add_generalization('bear', 'baby_bear');
        myrep.add_generalization('baby_bear', 'embrio');
        var atribut_array = ['big', 'strong', 'lazy', 'slow'];
        myrep.add_atribute('bear', atribut_array);
        myrep.transitive_closure_get_atributes_all_classes();
        var attr1 = myrep.class.embrio.atribute[0];
        var attr2 = myrep.class.embrio.atribute[1];
        var attr3 = myrep.class.embrio.atribute[2];
        var attr4 = myrep.class.embrio.atribute[3];
        expect(myrep.class.baby_bear.atribute[0]).toEqual('big');
        expect(myrep.class.baby_bear.atribute[1]).toEqual('strong');
        expect(myrep.class.baby_bear.atribute[2]).toEqual('lazy');
        expect(myrep.class.baby_bear.atribute[3]).toEqual('slow');

        expect(myrep.class.embrio.atribute[0]).toEqual('big');
        expect(myrep.class.embrio.atribute[1]).toEqual('strong');
        expect(myrep.class.embrio.atribute[2]).toEqual('lazy');
        expect(myrep.class.embrio.atribute[3]).toEqual('slow');

        expect(attr1).toEqual('big');
        expect(attr2).toEqual('strong');
        expect(attr3).toEqual('lazy');
        expect(attr4).toEqual('slow');
    });
    it(' should add an error to the instance if the instance has a kardinality and does not have as many links as the cardinality says', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_association('building', 'floor', '2', '4', 'land', 'people', '3', '6');
        myrep.add_instance('room1');
        myrep.add_instance('room2');
        myrep.add_instance('room3');
        myrep.add_link('room1', 'floor', 'room2');
        myrep.add_instance_of('building', 'room1');
        myrep.instance_gets_assoc_info('room1');
        console.log(myrep.instances['room1']['assoc_from_class']);
        expect(myrep.instance_link_validation_end('room1')).toEqual(false); //nepadod vertibu
    });
    it(' should add an error to the instance if the instance has a kardinality and does not have as many links as the cardinality says', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_association('building', 'floor', '2', '4', 'land', 'people', '3', '6');
        myrep.add_instance('room1');
        myrep.add_instance_of('building', 'room1');
        myrep.instance_gets_assoc_info('room1');
        var other_class = myrep.instances.room1.assoc_from_class[0].class_to;
        var role = myrep.instances.room1.assoc_from_class[0].role;
        var min = myrep.instances.room1.assoc_from_class[0].min;
        var max = myrep.instances.room1.assoc_from_class[0].max;
        expect(other_class).toEqual('land');
        expect(role).toEqual('floor');
        expect(min).toEqual('2');
        expect(max).toEqual('4');
    });
    it(' should return true if the instance has a kardinality and does have as many links as the cardinality says', function() {
        myrep.add_class('building');
        myrep.add_class('land');
        myrep.add_association('building', 'floor', '2', '4', 'land', 'people', '3', '6');
        myrep.add_instance('room1');
        myrep.add_instance('room2');
        myrep.add_instance('room3');
        myrep.add_link('room1', 'floor', 'room2');
        myrep.add_link('room1', 'floor', 'room3');
        myrep.add_instance_of('building', 'room1');
        myrep.instance_gets_assoc_info('room1');
        expect(myrep.instance_link_validation('room1')).toEqual(true);
    });
    it(' should return fasle if we check if an instance is the instance of a class or its subclasses and it is not', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_class('child');
        myrep.add_generalization('animal', 'human');
        myrep.add_generalization('human', 'child');
        myrep.add_instance('Janis');
        myrep.add_instance_of('human', 'Janis');
        expect(myrep.is_instance_of('Janis', 'child')).toEqual(false);
    });
    it(' should return true if we check if an instance is the instance of a class or its subclasses', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_class('child');
        myrep.add_generalization('animal', 'human');
        myrep.add_generalization('human', 'child');
        myrep.add_instance('Janis');
        myrep.add_instance_of('human', 'Janis');
        expect(myrep.is_instance_of('Janis', 'animal')).toEqual(true);
    });
    it(' should return true if there is a loop between classes if we check a class for it', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_class('child');
        myrep.add_generalization('animal', 'human');
        myrep.add_generalization('human', 'child');
        myrep.add_generalization('child', 'animal');
        expect(myrep.is_cycle('animal')).toEqual(true);
    });
    it(' should return false if we look for a loop in classes generalization but there is none', function() {
        myrep.add_class('animal');
        myrep.add_class('human');
        myrep.add_class('child');
        myrep.add_generalization('animal', 'human');
        myrep.add_generalization('human', 'child');
        expect(myrep.is_cycle('animal')).toEqual(false);
    });
});
