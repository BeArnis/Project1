function rep_init() {
    var repository = {
        class: {},
        instances: {},
        add_class: function (item) {
            this.class[item] = {};
        },
        exists_class: function (class_name) {
            return class_name in this.class;
        },
        delete_class: function (class_name) {
            delete this.class[class_name];
        },
        add_atribute: function (class_name, atribute) {
            this.class[class_name][atribute] = {};
        },
        exists_atribute: function (class_name, atribute) {
            return atribute in this.class[class_name];
        },
        delete_atribute: function (class_name, atribute) {
            delete this.class[class_name][atribute];
        },
        add_generalization: function (super_class, sub_class) {
            this.class[super_class]["subclass"] = {
                subcl: sub_class
            };
            this.class[sub_class]["superclass"] = {
                supcl: super_class
            };
        },
        generalization_of: function (super_class, sub_class) {
            if((this.class[super_class]["subclass"]["subcl"] == sub_class) && (this.class[sub_class]["superclass"]["supcl"] === super_class)) {
                return true;
            }
            else return false;

        },
        delete_generalization: function (super_class, sub_class) {
            if((this.class[super_class]["subclass"]["subcl"] == sub_class) && (this.class[sub_class]["superclass"]["supcl"] === super_class)) {
                delete this.class[super_class]["subclass"]["subcl"];
                delete this.class[sub_class]["superclass"]["supcl"];
            }
        },
        add_instance: function (instance_name) {
            this.instances[instance_name] = {};
        },
        delete_instance: function (instance_name) {
            delete this.instances[instance_name];
            
        },
        exists_instance: function (instance_name) {
            return instance_name in this.instances;
        },
        add_link: function (first_instance, link_name, second_instance) {
            this.instances[first_instance]["link_id"] = link_name;
            this.instances[first_instance]["linked_to"] = second_instance;

            this.instances[second_instance]["link_id"] = link_name;
            this.instances[second_instance]["linked_to"] = second_instance;
        },
        exists_link: function (first_instance, link_name, second_instance) {
            if((this.instances[first_instance]["link_id"] === link_name) && (this.instances[second_instance]["link_id"] === link_name) && (this.instances[first_instance]["linked_to"] === second_instance) && (this.instances[second_instance]["linked_to"] === second_instance)) {
                return true;
            }
            else return false;
        },
        delete_link: function () {}

    };
    return repository;
}