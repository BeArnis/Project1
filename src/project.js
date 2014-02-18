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
                link: [],
                link_to: [],
                instance_of: [],
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

            this.instances[instance_name]['atribute'].push(atribute_name);
            this.instances[instance_name]['atribute'][atribute_name] = [];
            this.instances[instance_name]['atribute'][
            atribute_name].push(value);
        },
        exists_atribute_value: function(instance_name, atribute_name, value) {

            if (_.indexOf(this.instances[instance_name]['atribute'],
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
                    class_to: end_class,
                    role: begin_role,
                    kard: begin_kard,
                    min: bmin,
                    max: bmax
                },
                end: {
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
        get_class_kard: function() {
            var role = [];
            _.filter(this.association, function(kard) {
                var id1 = kard.end.class_to;
                var id2 = kard.start.class_to;
                role[id1] = kard.start.role;
                role[id2] = kard.end.role;
            });
            console.log(role);
            return role;
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
        is_cycle: function(class_name) {
            //this.class[class_name]['superclass'];
            //this.class[class_name]['subclass'];
            var a = false;
            var obj = this;
            var subper = this.get_super_class(class_name);
            var wut = _.find(subper, function(does_match) {
                if (_.indexOf(subper, does_match) != -1) {
                    obj.class[class_name]['something_is_wrong'] = 'error';
                    a = true;
                    
                }
                console.log(does_match);
            });
            //console.log(subper);
            return a;

        },
        instance_gets_assoc_info: function(instance_name) {
            var classes = this.instances[instance_name]['instance_of'];

            var obj = this;
            _.filter(classes, function(class_name) {
                obj.instances[instance_name][
                'assoc_from_class'] = obj.class[class_name]['assoc'];
            });
            //console.log(obj.instances[instance_name]);
        },
        instance_link_validation: function(instance_name) {
            var min = this.instances[instance_name]['assoc_from_class'][0]['min'];
            var max = this.instances[instance_name]['assoc_from_class'][0]['max'];

            if (this.instances[instance_name]['link'].length < min || this.instances[instance_name]['link'].length > max) {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                return false;
                console.log('error');
            }
            return true;
            //console.log(min);
        },
        is_instance_of: function(instance_name, class_name) {
            var instance_to = this.instances[instance_name]['instance_of'];
            var obj = this;
            var all = [];
            var bool = false;
            _.each(instance_to, function(class_of) {
                all = _.union(all, obj.get_super_class(class_of));
                //console.log(all);
            });
            _.each(all, function(class_objeckt) {
                if (class_objeckt.name == class_name) { bool = true;}
            });
            if (_.indexOf(this.instances[instance_name][
                'instance_of'], class_name) != -1 || bool == true) {
                return true;
            } else {
                this.instances[instance_name]['something_is_wrong'] = 'error';
                return false;
            }
        }
    };
    return repository;
}
