function visual (cola_lib, graph) {
    var width = 1360,
        height = 700;

    var color = d3.scale.category20();
    
    var cola = cola_lib.d3adaptor()
        .linkDistance(120)
        .avoidOverlaps(true)
        .size([width, height])
        .linkDistance(150);


    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);


    cola
        .nodes(graph.class)
        .links(graph.links)
        .start();

    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 16)
        .attr("markerHeight", 16)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", function(d) { return "url(#suit)"; });





    var node = svg.selectAll(".class")
            .data(graph.class)
            .enter().append("rect")
            .attr("class", "class")
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .attr("rx", 5).attr("ry", 5)
            .style("fill", function (d) { return color(1); })
            .call(cola.drag);

    var label = svg.selectAll(".label")
        .data(graph.class)
       .enter().append("text")
        .attr("class", "label")
        .text(function (d) { return d.name; })
        .call(cola.drag);


    node.append("title")
        .text(function (d) { return d.name; });

    cola.on("tick", function () {
        link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node.attr("x", function (d) { return d.x - d.width / 2; })
            .attr("y", function (d) { return d.y - d.height / 2; });

        label.attr("x", function (d) { return d.x; })
             .attr("y", function (d) {
                 var h = this.getBBox().height;
                 return d.y + h/4;
             });
    });

}

