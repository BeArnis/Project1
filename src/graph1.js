function visual(cola_lib, graph) {

    var width = 3060,
        height = 3200;

    var color = d3.scale.category20();

    var cola_a = cola_lib.d3adaptor()
        .linkDistance(430)
        .avoidOverlaps(true)
        .flowLayout()
        .size([width, height]);


    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);


    cola_a
        .nodes(graph.nodes)
        .links(graph.links)
        .groups(graph.groups)
        .start(1, 1);

    var group = svg.selectAll('.groups')
        .data(graph.groups)
      .enter().append('rect')
        .attr('rx', 18).attr('ry', 18)
        .attr('class', 'group')
        .style('fill', function(d, i) { return color(i);});




    svg.append('defs').selectAll('marker')
        .data(['generalization', 'instance'])
      .enter().append('marker')
        .attr('id', function(d) { return d; })
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 9)
        .attr('markerWidth', 9)
        .attr('markerHeight', 12)
        .attr('orient', 'auto')
      .append('path')
        .attr('d', 'M0,-5L10,0L0,5');



    var link = svg.selectAll('.link')
        .data(graph.links)
      .enter().append('g')
        .attr('class', 'link')
        .call(cola_a.drag)
        .each(function(d) {
            var g = d3.select(this);
            var id;


            if (d.type === 'generalization' || d.type === 'instance') {
                render_subclass_line(d, g);
            } else if (d.type === 'association_path') {

                render_assoc(d, g);
            } else if (d.type === 'inst_link') {

                render_link(d, g);
            }

        });

    function render_subclass_line(d, g) {


        var id;
        var path = g.append('path')
            .attr('class', function(d) { return 'link ' + d.type; })
            .attr('marker-end', function(d) { return 'url(#' + d.type + ')'; });
    }



    function render_assoc(d, g) {
        var id = 'assoc_' + d.assoc['start']['role'];
        var path = g.append('path')
            .attr('id', id)
            .attr('class', d.type);

        g.classed('association', true);

        g.append('text')
            .attr('dy', -10)
            .attr('style', 'text-anchor:middle; font: 26px sans-serif;')
          .append('textPath')
            .attr('class', 'start_assoc')
            .attr('xlink:href', '#' + id)
            .attr('startOffset', '15%')
            .text(d.assoc.start.kard);

        g.append('text')
            .attr('dy', +30)
            .attr('style', 'text-anchor:middle; font: 16px sans-serif;')
          .append('textPath')
            .attr('class', 'start_assoc')
            .attr('xlink:href', '#' + id)
            .attr('startOffset', '15%')
            .text(d.assoc.start.role);

        g.append('text')
            .attr('dy', -10)
            .attr('style', 'text-anchor:middle; font: 16px sans-serif;')
          .append('textPath')
            .attr('class', 'end_assoc')
            .attr('xlink:href', '#' + id)
            .attr('startOffset', '75%')
            .text(d.assoc.end.kard);

        g.append('text')
            .attr('dy', +30)
            .attr('style', 'text-anchor:middle; font: 16px sans-serif;')
          .append('textPath')
            .attr('class', 'end_assoc')
            .attr('xlink:href', '#' + id)
            .attr('startOffset', '75%')
            .text(d.assoc.end.role);

    }


    function render_link(d, g) {

        var id = 'assoc';
        var path = g.append('path')
        .attr('id', 'a')
        .attr('class', d.type)
        .attr('marker-end', 'url(#' + d.type + ')');


        g.classed('instance_link', true);
        g.append('text')
            .attr('style',
            'text-anchor:middle; font: 26px sans-serif; fill: blue;')
          .append('textPath')
            .attr('class', 'instance_link')
            .attr('xlink:href', '#a')
            .attr('startOffset', '50%')
            .text(d.name);
    }

    var margin = 50, pad = 12;


    function render_class(g, d) {

        var wi = [];
        var height = 0;
        var rect = g.append('rect')
            .style('fill', '#00FFFF')
            .attr('class', function(d) {
                if (d.something_is_wrong == 'error') {
                    return 'error';
                } else return 'good';
            })
            .attr('x', 0)
            .attr('y', 0)

            .attr('rx', 10).attr('ry', 10)
            .call(cola_a.drag);

        g.append('text')
            .attr('class', 'name')
            .attr('transform', 'translate(' + margin / 2 +
                ',' + (20 + margin / 2) + ')')
            .text(d.name)
            .each(function(d) {
                var w = this.getBBox().width;
                wi.push(w);
                height += this.getBBox().height;
            })
            .attr('x', 0)
            .attr('y', 0)
            .call(cola_a.drag);

        g.selectAll('.atribute')
            .data(d.atribute)
            .enter()
             .append('text')
             .attr('class', 'atribute')
             .attr('transform', 'translate(' + margin / 2 + ',' +
                (20 + margin / 2) + ')')
             .text(function(d, i) { return 'Atribute' + (i + 1) + ': ' + d;})
             .call(cola_a.drag)
             .attr('x', 0)
             .each(function(d) {
                var text = d3.select(this);
                var w = this.getBBox().width;
                var h = this.getBBox().height;

                text.attr('y', height);
                wi.push(w);
                height += this.getBBox().height;
            });
            d.width = Math.max.apply(Math, wi) + margin;
            d.height = height + margin;
            rect.attr('height', d.height);
            rect.attr('width', d.width);
    }

    function render_instance(g, d) {
        var wi = [];
        var height = 0;
        var rect = g.append('rect')
            .style('fill', 'orange')
            .attr('class', function(d) {
                if (d.something_is_wrong == 'error') {
                    return 'error';
                } else return 'good';
            })
            .call(cola_a.drag)
            .attr('x', 0)
            .attr('y', 0)
            .attr('rx', 10).attr('ry', 10);

        g.append('text')
            .attr('class', 'name')
            .attr('transform', 'translate(' + margin / 2 + ',' +
                (20 + margin / 2) + ')')
            .text(function(d) { return d.name; })
            .each(function(d) {
                var w = this.getBBox().width;
                wi.push(w);
                height += this.getBBox().height;
            })
            .attr('x', 0)
            .attr('y', 0)
            .call(cola_a.drag);


        var deep_atr = d.atribute;

        g.selectAll('.atribute')
            .data(deep_atr)
            .enter()
             .append('text')
             .attr('class', 'atribute')
             .attr('transform', 'translate(' + margin / 2 + ',' +
                (20 + margin / 2) + ')')
             .text(function(d) {
                return d + ': ' + deep_atr[d];})
             .call(cola_a.drag)
             .attr('x', 0)
             .each(function(d) {
                var text = d3.select(this);
                var w = this.getBBox().width;
                var h = this.getBBox().height;

                text.attr('y', height);
                wi.push(w);
                height += this.getBBox().height;
            });
            d.width = Math.max.apply(Math, wi) + margin;
            d.height = height + margin;
            rect.attr('height', d.height);
            rect.attr('width', d.width);
    }

    var node = svg.selectAll('.node')
            .data(graph.nodes)
            .enter().append('g')
            .attr('class', 'g')
            .call(cola_a.drag)
            .each(function(d) {
                var g = d3.select(this);

                if (d.type === 'class') {
                    render_class(g, d);
                } else if (d.type === 'instance') {
                    render_instance(g, d);
                } else console.error('unknown node type, node type is' +
                    d.type);
            });


    cola_a.on('tick', function() {

        var sourceIntersection, arrowStart;

        node.each(function(d)

            { d.innerBounds = d.bounds.inflate(0); })
            .attr('transform', function(d) {
                return 'translate(' + d.innerBounds.x + ',' +
                    d.innerBounds.y + ' )';
            });


        group.attr('x', function(d) { return d.bounds.x; })
            .attr('y', function(d) { return d.bounds.y; })
            .attr('width', function(d) { return d.bounds.width(); })
            .attr('height', function(d) { return d.bounds.height(); });



        link.selectAll('.link')
            .each(function(d) {
                if (d.source === d.target) {
                        d.sourceIntersection = { x: d.source.x, y: d.source.y };
                        d.arrowStart = { x: d.target.x, y: d.target.y };
                        return;
                    }
                    vpsc.makeEdgeBetween(d, d.source.innerBounds,
                        d.target.innerBounds, -2);


            })

            .attr('d', function(d) {
                return arcPath(false, d);
            });


        link.filter('.association').selectAll('.start_assoc').attr(
            'startOffset', function(d) {

            if (d.source.x > d.target.x) {
                return '75%';
            } else {
                return '25%';
            }
        });


        link.filter('.association').selectAll('.end_assoc').attr(
            'startOffset', function(d) {

            if (d.source.x > d.target.x) {
                return '25%';
            } else {
                return '75%';
            }
        });

        link.selectAll('.association_path')
            .each(function(d) {
                if (d.source === d.target) {
                    d.sourceIntersection = { x: d.source.x, y: d.source.y };
                    d.arrowStart = { x: d.target.x, y: d.target.y };
                    return;
                }
                vpsc.makeEdgeBetween(d, d.source.innerBounds,
                    d.target.innerBounds, -2);

            })

            .attr('d', function(d) {
                return arcPath(d.source.x < d.target.x, d);
            });
        link.selectAll('.inst_link')
            .each(function(d) {
                if (d.source === d.target) {
                    d.sourceIntersection = { x: d.source.x, y: d.source.y };
                    d.arrowStart = { x: d.target.x, y: d.target.y };
                    return;
                }
                vpsc.makeEdgeBetween(d, d.source.innerBounds,
                    d.target.innerBounds, -2);

            })

            .attr('d', function(d) {
                return arcPath(d.source.x < d.target.x, d);
            });



    });

    function arcPath(leftHand, d) {

        var start = leftHand ? d.sourceIntersection : d.arrowStart,
        end = leftHand ? d.arrowStart : d.sourceIntersection;

        return 'M' + start.x + ',' + start.y + 'L' + end.x + ',' + end.y;
    }

}
