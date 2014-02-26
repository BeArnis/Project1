function rep_init() {
    var repository = {
        class: {},
        instances: {},
        association: {},
        link: {},
        add_class: function(item) {
            this.class[item] = {
                name: item,
                atribute: [],
                superclass: [],
                subclass: [],
                has_instance: [],
                assoc: [],
                superclass: [],
                subclass: [],
                something_is_wrong: null,
                errors: [],
                type: 'class'
            };
        },
        exists_class: function(class_name) {
            return class_name in this.class;
        },
        delete_class: function(class_name) {
            delete this.class[class_name];
        },
        get_class: function(class_name) {
            if (this.exists_class(class_name)) {
                return this.class[class_name];
            } else {
                this.add_class(class_name);
                return this.class[class_name];
            }
        },
        add_atribute: function(class_name, atribute) {
            if (typeof(atribute) === 'object') {
                var long = atribute.length;
                for (var i = 0; i < long; i++) {
                    if (_.indexOf(this.class[class_name][
                        'atribute'], atribute[i]) == -1)
                    {
                        this.class[class_name]['atribute'].push(atribute[i]);
                    }
                }
            }else this.class[class_name]['atribute'].push(atribute);
        },
        exists_atribute: function(class_name, atribute) {
            if (_.indexOf(this.class[class_name]['atribute'], atribute) != -1) {
                return true;
            }
            else return false;
        },
        delete_atribute: function(class_name, atribute) {
            delete this.class[class_name]['atribute'][
            (_.indexOf(this.class[class_name]['atribute'], atribute))];
        },
        get_atribute: function(class_name) {
            if (this.class[class_name]['atribute'].length != 0) {
                return this.class[class_name]['atribute'];
            } else return [];
        },
        add_generalization: function(super_class, sub_class) {

            this.class[super_class]['subclass'].push(sub_class);
            this.class[sub_class]['superclass'].push(super_class);
        },
        exists_generalization_of: function(super_class, sub_class) {

            if (_.indexOf(this.class[super_class]['subclass'],
            sub_class) != -1) {
                if (_.indexOf(this.class[sub_class]['superclass'],
                super_class) != -1) {
                    return true;
                }
            }
            return false;
        },
        delete_generalization: function(super_class, sub_class) {

            delete this.class[super_class]['subclass'][
            _.indexOf(this.class[super_class]['subclass'], sub_class)];
            delete this.class[sub_class]['subclass'][
            _.indexOf(this.class[sub_class]['subclass'], super_class)];
        },
        add_instance: function(instance_name) {
            this.instances[instance_name] = {
                name: instance_name,
                atribute: [],
                atribute_form_class: [],
                link: [],
                link_to: [],
                instance_of: [],
                errors: [],
                something_is_wrong: null,
                type: 'instance'
            };
        },
        delete_instance: function(instance_name) {
            delete this.instances[instance_name];

        },
        exists_instance: function(instance_name) {
            return instance_name in this.instances;
        },
        add_link: function(first_instance, link_name, second_instance) {
            this.instances[first_instance]['link'].push(link_name);
            this.instances[first_instance]['link_to'].push(second_instance);


            this.instances[second_instance]['link'].push(link_name);
            this.instances[second_instance]['link_to'].push(first_instance);

            id = first_instance + second_instance + link_name;

            link = {
                instance1: first_instance,
                instance2: second_instance,
                name: link_name
            };

            this.link[id] = link;



        },
        exists_link: function(first_instance, link_name, second_instance) {
            if (_.indexOf(this.instances[first_instance]['link'],
                link_name) != -1) {
                if (_.indexOf(this.instances[first_instance]['link_to'],
                    second_instance) != -1) {
                    if (_.indexOf(this.instances[second_instance]['link'],
                        link_name) != -1) {
                        if (_.indexOf(this.instances[second_instance][
                            'link_to'], first_instance) != -1) {
                            return true;
                        }
                    }
                }
            }
            return false;

        },
        delete_link: function(first_instance, link_name, second_instance) {
        delete this.instances[first_instance]['link'][
        _.indexOf(this.instances[first_instance]['link'], link_name)];
        delete this.instances[first_instance]['link_to'][
        _.indexOf(this.instances[first_instance]['link_to'], second_instance)];

        delete this.instances[second_instance]['link'][
        _.indexOf(this.instances[second_instance]['link'], link_name)];
        delete this.instances[second_instance]['link_to'][
        _.indexOf(this.instances[second_instance]['link_to'], first_instance)];
        },
        add_atribute_value: function(instance_name, atribute_name, value) {

            this.instance_gets_atributes_from_instance_of_class(instance_name);

            var right_place = _.find(this.instances[instance_name]['atribute'], function(adding_atribute) {
                return adding_atribute == atribute_name;
            });

            if (right_place == undefined) {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                var error = {
                    error_type: '#1',
                    instance: instance_name,
                    atribute: atribute_name
                }

                //'No such ' + atribute_name + ' atribute exists, dont add atribute values to atributes that dont exist';
                this.instances[instance_name].errors.push(error);
            } else {

                this.instances[instance_name]['atribute_form_class'].push({
                    atribut: atribute_name,
                    value_name: value
                });
            }

        },
        exists_atribute_value: function(instance_name, atribute_name, value) {
            var atributes_name = _.pluck(this.instances[
                instance_name]['atribute_form_class'], 'atribut');
            console.log(atributes_name);
            if (_.indexOf(atributes_name,
                atribute_name) != -1) {
                return true;
            }
            else return false;
        },
        delete_atribute_value: function(instance_name, atribute_name, value) {

                delete this.instances[instance_name]['atribute'][(
                        _.indexOf(this.instances[instance_name]['atribute'],
                        atribute_name))];

        },
        add_instance_of: function(class_name, instance_name) {

            this.class[class_name]['has_instance'].push(instance_name);
            this.instances[instance_name]['instance_of'].push(class_name);

        },
        delete_instance_of: function(class_name, instance_name) {

            delete this.class[class_name]['has_instance'][
            _.indexOf(this.class[class_name]['has_instance'], instance_name)];
            delete this.instances[instance_name]['instance_of'][
            _.indexOf(this.instances[instance_name]['instance_of'],
                class_name)];

        },
        exists_instance_of: function(class_name, instance_name) {

            if (_.indexOf(this.class[class_name][
                'has_instance'], instance_name) != -1) {
                if (_.indexOf(this.instances[instance_name][
                    'instance_of'], class_name) != -1) {
                    return true;
                }
            }
            return false;
        },
        add_association: function(begin_class, begin_role, bmin, bmax,
                                end_class, end_role, emin, emax) {

            var begin_kard = bmin + '...' + bmax;
            var end_kard = emin + '...' + emax;
            var assoc = {
                start: {
                    from_class: begin_class,
                    class_to: end_class,
                    role: begin_role,
                    kard: begin_kard,
                    min: bmin,
                    max: bmax
                },
                end: {
                    from_class: end_class,
                    class_to: begin_class,
                    role: end_role,
                    kard: end_kard,
                    min: emin,
                    max: emax
            }};
            var id = begin_class + begin_role + begin_kard +
            end_class + end_role + end_kard;
            this.association[id] = assoc;



            this.class[begin_class]['assoc'].push(assoc.start);
            this.class[end_class]['assoc'].push(assoc.end);

        },
        delete_association: function(begin_class, begin_role, bmin, bmax,
                                    end_class, end_role, emin, emax) {

            var assoc1 = _.find(this.class[begin_class]['assoc'],
            function(assoc) { return assoc.class_to === end_class;});

                this.class[begin_class][
                'assoc'] = _.without(this.class[begin_class]['assoc'], assoc1);

            var assoc2 = _.find(this.class[end_class]['assoc'],
            function(assoc) { return assoc.class_to === begin_class;});

                this.class[end_class][
                'assoc'] = _.without(this.class[end_class]['assoc'], assoc2);
        },
        exists_association: function(begin_class, begin_role, bmin, bmax,
                                    end_class, end_role, emin, emax) {

            var b, e;

            for (var i = 0; i < this.class[begin_class]['assoc'].length; i++) {

                if (this.class[begin_class][
                    'assoc'][i]['class_to'] === end_class) {

                    b = true;
                }
            }

            for (var j = 0; j < this.class[end_class]['assoc'].length; j++) {

                if (this.class[end_class]['assoc'][j][
                    'class_to'] === begin_class) {

                     e = true;
                }
            }

            if (b && e) return true;

            return false;
        },
        select_all_classes: function() {
            var m = [];
            for (var key in this.class) {
                m.push(this.class[key]);
             }
            return m;
        },
        select_all_generalizations: function() {
            var sub = [];
            var m = [];
            for (var key in this.class) {
                    m.push(key);
                }
            for (var star in this.class) {
                for (var end in this.class[star]['subclass']) {
                    sub.push({
                        source: _.indexOf(m, star),
                        target: _.indexOf(m, this.class[star]['subclass'][end]),
                        type: 'generalization'
                    });
                }
            }
            return sub;
        },
        select_all_instances: function() {
            var inst = [];
            for (var key in this.instances) {
                inst.push(this.instances[key]);
            }
            return inst;
        },
        select_all_instances_of: function() {
            var inst = [];
            var k = [];
            var m = [];
            for (var key in this.class) {
                    m.push(key);
                }
            for (var oh in this.instances) {
                    k.push(oh);
                }

             for (var star in this.instances) {
                for (var end in this.instances[star]['instance_of']) {
                    var i = this.instances[star]['instance_of'][end];
                    inst.push({
                        source: _.indexOf(m, this.instances[star][
                            'instance_of'][end]),
                        target: m.length + _.indexOf(k, star),
                        type: 'instance'
                    });
                }
            }
            return inst;
        },
        select_all_assoc: function() {

            var m = [];
            for (var cl in this.class) {
                m.push(cl);
            }

            var assoc_arr = [];
            var sassoc_arr = [];

            for (var ass in this.association) {

                var begin_class = this.association[ass]['end']['class_to'];
                var end_class = this.association[ass]['start']['class_to'];


                    sassoc_arr.push({
                        source: _.indexOf(m, end_class),
                        target: _.indexOf(m, begin_class),
                        assoc: this.association[ass],
                        type: 'association_path'
                    });


                }


            return sassoc_arr;
        },
        select_all_links: function() {

            var links = [];
            var m = [];
            for (var cl in this.instances) {
                    m.push(cl);
                }
            var k = [];
            for (var am in this.class) {
                    k.push(am);
                }

            for (var link in this.link) {
                var obj = this.link[link];
                links.push({
                    source: k.length + _.indexOf(m, obj.instance1),
                    target: k.length + _.indexOf(m, obj.instance2),
                    name: obj.name,
                    type: 'inst_link'

                });
            }

            return links;
        },

        get_super_class: function(class_name, s, class_arr) {

            if (s === undefined) {
                var s = [];
            }
            if (class_arr === undefined) {
                var class_arr = [];
            }

            if (_.indexOf(class_arr, class_name) != -1) {
                return;
            }
            class_arr.push(class_name);
            var a;
            if (this.class[class_name]['superclass'].length == 0) {
                return;
            }
            _.filter(this.class[class_name][
                'superclass'], function(sup_cl) {
                    a = sup_cl;
                return sup_cl;
            });
            s.push(this.class[a]);
            var cl = this.get_super_class(a, s, class_arr);
            return s;
        },
        transitive_closure_get_atributes: function(class_name) {
            var supclass1 = this.get_super_class(class_name);
            var obj = this;
            _.filter(supclass1, function(clas) {
                var attr = obj.get_atribute(clas.name);
                    obj.add_atribute(class_name, attr);
            });
        },
        transitive_closure_get_atributes_all_classes: function() {
            var class_arr = this.select_all_classes();
            var obj = this;
            _.filter(class_arr, function(clas) {
                    obj.transitive_closure_get_atributes(clas.name);
            });
        },
        transitive_closure_is_cycle_all_classes: function() {
            var class_arr = this.select_all_classes();
            var obj = this;
            _.filter(class_arr, function(clas) {
                    obj.is_cycle(clas.name);
            });
        },
        is_cycle: function(class_name) {
            //this.class[class_name]['superclass'];
            //this.class[class_name]['subclass'];
            var a = false;
            var obj = this;
            var subper = this.get_super_class(class_name);
            var subcl = this.class[class_name]['subclass'];
            var wut = _.find(subper, function(does_match) {
                if (_.indexOf(subcl, does_match.name) != -1) {
                    obj.class[class_name]['something_is_wrong'] = 'error';
                    var error = {
                        error_type: '#2',
                        class_name: class_name
                    }

                    //'class ' + class_name + ' is in a cycle';
                    obj.class[class_name].errors.push(error);
                    a = true;
                }
            });
            return a;

        },
        get_assoc_info_for_subclass: function(class_name) {
            var superclass = this.get_super_class(class_name);
            var assoc_arr = [];
            _.each(superclass, function(class_obj) {
                if (class_obj.assoc.length != 0) {
                    assoc_arr.push(class_obj.assoc);
                }

            });
            assoc_arr.push(this.class[class_name]['assoc']);

            return assoc_arr;
        },
        instance_gets_assoc_info: function(instance_name) {
            var classes = this.instances[instance_name]['instance_of'];
            var obj = this;
            var class_assoc_arr = [];

            _.each(classes, function(class_name) {
                class_assoc_arr = _.union(class_assoc_arr, obj.get_assoc_info_for_subclass(class_name));
            });

            obj.instances[instance_name]['assoc_from_class'] = class_assoc_arr;

        },
        instance_link_validation_start: function(instance_name) {
            this.instance_gets_assoc_info(instance_name);

            var obj = this;
            _.each(this.instances[instance_name]['assoc_from_class'], function(assoc_arr) {
                obj.instance_link_validation_end(instance_name, assoc_arr[0]);

            
            });
        },
        instance_link_validation_end: function(instance_name, assoc_info) {
            var min = assoc_info['min'];
            var max = assoc_info['max'];
            var role = assoc_info['role'];
            var obj = this;
            var bool = true;
            var role_arr = _.filter(this.instances[instance_name]['link'], function(is_role) {
                return is_role == role;
            });
            var how_many_links_have_the_right_role = role_arr.length;


            if (how_many_links_have_the_right_role < min) {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                var error = {
                    error_type: '#3',
                    linstance: instance_name,
                    role_name: role
                }


                //'error: incstance ' + instance_name + ' has not the right count of links with linkname ' + role;
                this.instances[instance_name].errors.push(error);
                bool = false;
            }

            if (how_many_links_have_the_right_role > max) {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                var error = {
                    error_type: '#4',
                    linstance: instance_name,
                    role_name: role
                };
                this.instances[instance_name].errors.push(error);
                bool = false;
            }

            _.filter(this.instances[instance_name]['link_to'], function(link_to_instances) {
                if (!obj.is_instance_of(link_to_instances, assoc_info.from_class)) {
                    bool = false;
                }
            });
            if (bool) {
                return bool;
            }
            return true;
        },
        is_instance_of: function(instance_name, class_name) {
            var instance_to = this.instances[instance_name]['instance_of'];
            var obj = this;
            var all = [];
            var bool = false;

            _.each(instance_to, function(class_of) {
                all = _.union(all, obj.get_super_class(class_of));
            });
            _.each(all, function(class_objeckt) {
                if (class_objeckt.name == class_name) { bool = true;}
            });
            if (_.indexOf(this.instances[instance_name][
                'instance_of'], class_name) != -1 || bool == true) {
                return true;
            } else {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                var error = {
                    error_type: '#5',
                    class_name: class_name,
                    instance: instance_name
                };
                //'error: incstance ' + instance_name + ' is not under class ' + class_name;
                this.instances[instance_name].errors.push(error);
                return false;
            }
        },
        instance_gets_atributes_from_instance_of_class: function(instance_name) {
            var class_arr = this.instances[instance_name]['instance_of'];
            var obj = this;
            this.transitive_closure_get_atributes_all_classes();

            _.each(class_arr, function(class_n) {

                obj.instances[instance_name]['atribute'] = _.union(obj.instances[instance_name]['atribute'], obj.get_atribute(class_n));
            });
        },
        class_error: function(class_name) {
            var error_arr = this.class[class_name].errors;
            var obj = this;
            _.each(error_arr, function(error) {
                obj.error_handle(error);
            });
        },
        instance_error: function(instance_name) {
            var error_arr = this.instances[instance_name].errors;
            var obj = this;
            _.each(error_arr, function(error) {
                obj.error_handle(error);
            });
        },
        instance_atribute_error: function(instance_name) {
            var atributes = this.instances[instance_name]['atribute'];
            var atributes_with_values = _.pluck(this.instances[instance_name]['atribute_form_class'], 'atribut');
            var difference = _.difference(atributes, atributes_with_values);
            var obj = this;
            //var difference2 = _.difference(atributes_with_values, atributes);
            //console.log(difference1, difference2, atributes, atributes_with_values);
            _.each(difference, function(no_value) {
                obj.instances[instance_name]['something_is_wrong'] = 'error';
                var error = {
                    error_type: '#6',
                    instance: instance_name,
                    atribute: no_value
                }


                //'Instance ' + instance_name + ' has an atribute ' + no_value + ' with no value assigned to it, please give it an atribute';
                obj.instances[instance_name].errors.push(error);
            });
        },
        add_class_atributes_to_all_instances: function() {
            var instance_names = [];
            var obj = this;
            for (var cl in this.instances) {
                    instance_names.push(cl);
                }
            _.each(instance_names, function(instance) {
                obj.instance_gets_atributes_from_instance_of_class(instance);
            });
        },
        add_atribute_errors_to_all_instances: function() {
            var instance_names = [];
            var obj = this;
            for (var cl in this.instances) {
                    instance_names.push(cl);
                }
            _.each(instance_names, function(instance) {
                obj.instance_atribute_error(instance);
            });
        },
        error_handle: function(error_obj) {
            console.log(error_obj);
            if (error_obj.error_type == '#1') {
                console.warn('No such ' + error_obj.atribute + ' atribute exists in instance' + error_obj.instance + ' , dont add atribute values to atributes that dont exist');
            } else if (error_obj.error_type == '#2') {
                var cycle_classes = this.get_cycle_classes(error_obj.class_name);
                console.warn('Class ' + error_obj.class_name + ' is in a cycle' + ' in class cycle : ' + cycle_classes.join(', '));
            } else if (error_obj.error_type == '#3') {
                console.warn('Incstance ' + error_obj.instance + ' has not enough links with linkname ' + role);
            } else if (error_obj.error_type == '#4') {
                console.warn('Incstance ' + error_obj.instance + ' has not too many links with linkname ' + role);
            } else if (error_obj.error_type == '#5') {
                console.warn('Incstance ' + error_obj.instance + ' is not instance_of class ' + error_obj.class_name + ' or any of its subclasses');
            } else if (error_obj.error_type == '#6') {
                console.warn('Instance ' + error_obj.instance + ' has an atribute ' + error_obj.atribute + ' with no value assigned to it, please give it a value');
            }
        },
        get_cycle_classes: function(class_name) {
            if (this.is_cycle(class_name)) {
                var upper_class = this.get_super_class(class_name);
                var name_arr = [];
                var obj = this;

                _.each(upper_class, function(superclass_obj) {
                    name_arr.push(superclass_obj.name);
                })
                console.log(name_arr);
            }
            return name_arr;
        }
    };
    return repository;
}
