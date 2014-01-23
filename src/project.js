function rep_init() {
    var repository = {
        class: {},
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
        add_instance: function () {

        },
        delete_instance: function () {
            
        }

    };
    return repository;
}