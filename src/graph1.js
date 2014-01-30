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
        .start(10, 10);

    var group = svg.selectAll(".group")
        .data(graph.groups)
      .enter().append("rect")
        .attr("rx", 8).attr("ry", 8)
        .attr("class", "group")
        .style("fill", function (d, i) { return color(i); });




    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
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
      .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", function(d) { return "url(#suit)"; });


    var margin = 6, pad = 12;


    var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("rect")
            .attr("class", "node")
            .attr("rx", 15).attr("ry", 15)
            .style("fill", function (d) { if(d.type === "instance") {return "red";} else { return "blue";} })

            .call(cola_a.drag);



    var label = svg.selectAll(".label")
        .data(graph.nodes)
       .enter().append("text")
        .attr("class", "label")
        .text(function (d) { return d.name; })
        .call(cola_a.drag)
        .each(function (d) {
                    var b = this.getBBox();
                    var extra = 2 * margin + 2 * pad;
                    d.width = b.width + extra;
                    d.height = b.height + extra;
                });


    node.append("title")
        .text(function (d) { return d.name; });

    

    cola_a.on("tick", function () {
        node.each(function (d) { d.innerBounds = d.bounds.inflate(-margin); })
            .attr("x", function (d) { return d.innerBounds.x; })
            .attr("y", function (d) { return d.innerBounds.y; })
            .attr("width", function (d) { return d.innerBounds.width(); })
            .attr("height", function (d) { return d.innerBounds.height(); });


        link.each(function (d) {
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

        label
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y + (margin + pad) / 2;});
    });
}

