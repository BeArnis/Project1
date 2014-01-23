function rep_init() {
    var repository = {
        class: {},
        add_class: function (item) {
            this.class[item] = {

        };
    }
    };
    return repository;
}