function rep_init() {
    var repository = {
        class: {},
        instances: {},
        add_class: function (item) {
            this.class[item] = {
                name: item,
                superclass: [],
                subclass: [],
                has_instance: [],
                type: "class"
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
            this.instances[instance_name] = {
                name: instance_name,
                link: [],
                link_to: [],
                instance_of: [],
                type: "instance"
            };
        },
        delete_instance: function (instance_name) {
            delete this.instances[instance_name];
            
        },
        exists_instance: function (instance_name) {
            return instance_name in this.instances;
        },
        add_link: function (first_instance, link_name, second_instance) {
            this.instances[first_instance]["link"].push(link_name);
            this.instances[first_instance]["link_to"].push(second_instance);

    
            this.instances[second_instance]["link"].push(link_name);
            this.instances[second_instance]["link_to"].push(second_instance);

        },
        exists_link: function (first_instance, link_name, second_instance) {
            if (_.indexOf(this.instances[first_instance]["link"], link_name) != -1) {
                if (_.indexOf(this.instances[first_instance]["link_to"], second_instance) != -1) {
                    if (_.indexOf(this.instances[second_instance]["link"], link_name) != -1) {
                        if (_.indexOf(this.instances[second_instance]["link_to"], second_instance) != -1) {
                            return true;
                        }
                    }
                }
            }
            return false;

        },
        delete_link: function (first_instance, link_name, second_instance) {
        delete this.instances[first_instance]["link"][_.indexOf(this.instances[first_instance]["link"], link_name)];
        delete this.instances[first_instance]["link_to"][_.indexOf(this.instances[first_instance]["link"], link_name)];

        delete this.instances[second_instance]["link"][_.indexOf(this.instances[second_instance]["link"], link_name)];
        delete this.instances[second_instance]["link_to"][_.indexOf(this.instances[second_instance]["link"], link_name)];
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

            this.class[class_name]["has_instance"].push(instance_name);
            this.instances[instance_name]["instance_of"].push(class_name);

        },
        delete_instance_of: function (class_name, instance_name) {

            delete this.class[class_name]["has_instance"][_.indexOf(this.class[class_name]["has_instance"], instance_name)];
            delete this.instances[instance_name]["instance_of"][_.indexOf(this.instances[instance_name]["instance_of"], class_name)];

        },
        exists_instance_of: function (class_name, instance_name) {

            if (_.indexOf(this.class[class_name]["has_instance"], instance_name) != -1) {
                if (_.indexOf(this.instances[instance_name]["instance_of"], class_name) != -1) {
                    return true;
                }
            }
            return false;
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
        },
        select_all_classes: function () {
                var m = [];
                for(var key in this.class) {
                    m.push(this.class[key]);
                }
                return m;
        },
        get_all_class_names: function () {
            var m = [];
                for(var key in this.class) {
                    m.push(key);
                }
                return m;
        },
        select_all_generalizations: function () {
            var sub = [];
            var m = [];
            for(var key in this.class) {
                    m.push(key);
                }
            for(var star in this.class) {
                for(var end in this.class[star]["subclass"]) {
                    sub.push({
                        source: _.indexOf(m, star),
                        target: _.indexOf(m, this.class[star]["subclass"][end]),
                        type: "class"
                    });
                }
            }
            return sub;
        },
        select_all_instances: function () {
            var inst = [];
            for(var key in this.instances) {
                inst.push(this.instances[key]);
            }
            return inst;
        },
        select_all_instances_of: function () {
            var inst = [];
            var k = [];
            var m = [];
            for(var key in this.class) {
                    m.push(key);
                }
            for(var oh in this.instances) {
                    k.push(oh);
                }

             for(var star in this.instances) {
                for(var end in this.instances[star]["instance_of"]) {
                    var i = this.instances[star]["instance_of"][end];
                    inst.push({
                        source: _.indexOf(m, this.instances[star]["instance_of"][end]),
                        target: m.length + _.indexOf(k, star),
                        type: "instance"
                    });
                }
            }
            return inst;
        }

    };
    return repository;
}