function rep_init() {
    var repository = {
        class: {},
        add_class: function (item) {
            this.class[item] = {

        };
        },
        exists_class: function (class_name) {
            return class_name in this.class;
        },
        delete_class: function (class_name) {
            
        }

    };
    return repository;
}