function visual (cola_lib, graph) {
    
    var width = 3060,
        height = 2200;

    var color = d3.scale.category20();
    
    var cola_a = cola_lib.d3adaptor()
        .linkDistance(330)
        .avoidOverlaps(true)
        .flowLayout()
        .size([width, height]);


    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events", "all");


    cola_a
        .nodes(graph.nodes)
        .links(graph.links)
        .groups(graph.groups)
        .start(20, 20);

    var group = svg.selectAll(".groups")
        .data(graph.groups)
      .enter().append("rect")
        .attr("rx", 18).attr("ry", 18)
        .attr("class", "group")
        .style("fill", function (d, i) { return color(i);});




    svg.append("defs").selectAll("marker")
        .data(["class", "instance"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 9)
        .attr("markerWidth", 9)
        .attr("markerHeight", 12)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");



    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("g")
            .attr("class", "g_links")
            .call(cola_a.drag)
            .each( function (d) {
                var m = d3.select(this);
                //console.log(d);
                var id;
                var line = m.append("line")
                        .attr("id", function (d) {
                            if(d.type === "association") {
                                id = d.assoc["role"];
                                return d.assoc["role"];
                            }
                        })
                        .attr("class", function(d) { return "link " + d.type; })
                        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });


                m.append("text")
                    .each(function (d) {
                        s = d3.select(this);


                        s.append("textline")
                        .attr("class", "path_id")
                        .attr("xlink:href", function (d) {
                            if(d.type === "association") {
                                return "#" + id;
                            }
                        })
                        .attr("startoffset", "50%")
                        .text(function (d) {
                            return "this is a line";
                        });
                    });
        
            });
      

    /*var assoc_lable = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("text")
             .attr("class", "aso")
             .each( function (d) {
                 assoc_text = d3.select(this);
             });*/


    var margin = 50, pad = 12;


    function render_class (g, d) {

        var wi = [];
        var height = 0;
        var rect = g.append("rect")
            .style("fill", "red")
            .call(cola_a.drag)
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 10).attr("ry", 10);

        g.append("text")
            .attr("class", "name")
            .attr("transform", "translate("+ margin/2 +"," + (20 + margin/2) + ")")
            .text(function (d) { return d.name; })
            .each(function (d) {
                var w = this.getBBox().width;
                wi.push(w);
                height += this.getBBox().height;
            })
            .attr("x", 0)
            .attr("y", 0)
            .call(cola_a.drag);

        g.selectAll(".atribute")
            .data(d.atribute)
            .enter()
             .append("text")
             .attr("class", "atribute")
             .attr("transform", "translate("+ margin/2 +"," + (20 + margin/2) + ")")
             .text(function (d, i) { return "Atribute" + (i+1) + ": " + d;})
             .call(cola_a.drag)
            .attr("x", 0)
             .each(function (d) {
                var text = d3.select(this);
                var w = this.getBBox().width;
                var h = this.getBBox().height;

                text.attr("y", height);
                wi.push(w);
                height += this.getBBox().height;
            });
            d.width = Math.max.apply(Math, wi) + margin;
            d.height = height + margin;
            rect.attr("height", d.height);
            rect.attr("width", d.width);
    }
    
    function render_instance (g, d) {
        var wi = [];
        var height = 0;
        var rect = g.append("rect")
            .style("fill", "orange")
            .call(cola_a.drag)
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 10).attr("ry", 10);

        g.append("text")
            .attr("class", "name")
            .attr("transform", "translate("+ margin/2 +"," + (20 + margin/2) + ")")
            .text(function (d) { return d.name; })
            .each(function (d) {
                var w = this.getBBox().width;
                wi.push(w);
                height += this.getBBox().height;
            })
            .attr("x", 0)
            .attr("y", 0)
            .call(cola_a.drag);


        var deep_atr = d.atribute;
        g.selectAll(".atribute")
            .data(deep_atr)
            .enter()
             .append("text")
             .attr("class", "atribute")
             .attr("transform", "translate("+ margin/2 +"," + (20 + margin/2) + ")")
             .text(function (d) {
                return d + ": " + deep_atr[d];})
             .call(cola_a.drag)
            .attr("x", 0)
             .each(function (d) {
                var text = d3.select(this);
                var w = this.getBBox().width;
                var h = this.getBBox().height;

                text.attr("y", height);
                wi.push(w);
                height += this.getBBox().height;
            });
            d.width = Math.max.apply(Math, wi) + margin;
            d.height = height + margin;
            rect.attr("height", d.height);
            rect.attr("width", d.width);
    }

    var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "g")
            .call(cola_a.drag)
            .each(function (d) {
                
                var g = d3.select(this);
                
                if(d.type === "class") {
                    render_class(g, d);
                }
                else render_instance(g, d);
                    
            });
              

    cola_a.on("tick", function () {
        node.each(function (d)

            { d.innerBounds = d.bounds.inflate(0); })
            .attr("transform", function (d) {
                return "translate(" + d.innerBounds.x + "," + d.innerBounds.y + " )";
            });
        group.attr("x", function (d) { return d.bounds.x; })
                 .attr("y", function (d) { return d.bounds.y; })
                .attr("width", function (d) { return d.bounds.width(); })
                .attr("height", function (d) { return d.bounds.height(); });

       

        link.selectAll(".link")
        .each(function (d) {
            if (d.source === d.target) {
                    d.sourceIntersection = { x: d.source.x, y: d.source.y };
                    d.arrowStart = { x: d.target.x, y: d.target.y };
                    return;
                }
                vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, -2);
            })
            .attr("x1", function (d) { return d.arrowStart.x; })
            .attr("y1", function (d) { return d.arrowStart.y; })
            .attr("x2", function (d) { return d.sourceIntersection.x; })
            .attr("y2", function (d) { return d.sourceIntersection.y; });
    });
}
