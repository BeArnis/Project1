function rep_init() {
    var repository = {
        class: {},
        instances: {},
        add_class: function (item) {
            this.class[item] = {
                superclass: [],
                subclass: []
            };
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

            this.class[super_class]["subclass"].push(sub_class);   
            this.class[sub_class]["superclass"].push(super_class);
            
        },
        generalization_of: function (super_class, sub_class) {

            if (_.indexOf(this.class[super_class]["subclass"], sub_class) != -1) {
                if (_.indexOf(this.class[sub_class]["superclass"], super_class) != -1) {
                    return true;
                }
            }
            return false;
        },
        delete_generalization: function (super_class, sub_class) {

            delete this.class[super_class]["subclass"][_.indexOf(this.class[super_class]["subclass"], sub_class)];
            delete this.class[sub_class]["subclass"][_.indexOf(this.class[sub_class]["subclass"], super_class)];
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
        delete_link: function (first_instance, link_name, second_instance) {
            if((this.instances[first_instance]["link_id"] === link_name) && (this.instances[second_instance]["link_id"] === link_name) && (this.instances[first_instance]["linked_to"] === second_instance) && (this.instances[second_instance]["linked_to"] === second_instance)) {
                delete this.instances[first_instance]["link_id"];
                delete this.instances[first_instance]["linked_to"];
                delete this.instances[second_instance]["link_id"];
                delete this.instances[second_instance]["linked_to"];
            }
        },
        add_atribute_value: function (instance_name, atribute_name, value) {
            this.instances[instance_name][atribute_name] = value;
        },
        exists_atribute_value: function (instance_name, atribute_name, value) {
            if(this.instances[instance_name][atribute_name] === value) {
                return true;
            }
            else return false;
        },
        delete_atribute_value: function (instance_name, atribute_name, value) {
            if(this.instances[instance_name][atribute_name] === value) {
                delete this.instances[instance_name][atribute_name];
            }
        },
        add_instance_of: function (class_name, instance_name) {
            this.class[class_name]["has_instance"] = instance_name;
            this.instances[instance_name]["instance_of"] = class_name;
        },
        delete_instance_of: function (class_name, instance_name) {
            if((this.class[class_name]["has_instance"] === instance_name) && (this.instances[instance_name]["instance_of"] = class_name)) {
                delete this.class[class_name]["has_instance"];
                delete this.instances[instance_name]["instance_of"];
            }
        },
        exists_instance_of: function (class_name, instance_name) {
            if((this.class[class_name]["has_instance"] === instance_name) && (this.instances[instance_name]["instance_of"] = class_name)) {
                return true;
            }
            else return false;
        },
        add_association: function (begin_class, begin_role, begin_kard, end_class, end_role, end_kard) {
            this.class[begin_class]["assoc"] = { role: begin_role };
            this.class[begin_class]["assoc"]["kard"] = begin_kard;
            this.class[begin_class]["assoc"]["to_class"] = end_class;

            this.class[end_class]["assoc"] = { role: end_role };
            this.class[end_class]["assoc"]["kard"] = end_kard;
            this.class[end_class]["assoc"]["to_class"] = begin_class;

        },
        delete_association: function () {},
        exists_association: function (begin_class, begin_role, begin_kard, end_class, end_role, end_kard) {
            if((this.class[begin_class]["assoc"]["role"] === begin_role) && (this.class[begin_class]["assoc"]["kard"] === begin_kard) && (this.class[begin_class]["assoc"]["to_class"] === end_class) &&
                (this.class[end_class]["assoc"]["role"] === end_role) && (this.class[end_class]["assoc"]["kard"] === end_kard) && (this.class[end_class]["assoc"]["to_class"] === begin_class)) {
                return true;
            }
            else return false;
        }

    };
    return repository;
}