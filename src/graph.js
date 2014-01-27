function visual (cola_lib) {
    var width = 960,
        height = 500;

    var color = d3.scale.category20();
    
    var cola = cola_lib.d3adaptor()
        .linkDistance(120)
        .avoidOverlaps(true)
        .size([width, height]);


    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    graph = {
        "nodes":[
          {"name":"a","width":60,"height":40},
          {"name":"b","width":60,"height":40},
          {"name":"c","width":60,"height":40},
          {"name":"d","width":60,"height":40},
          {"name":"e","width":60,"height":40}
        ],
        "links":[
          {"source":0,"target":1},
          {"source":1,"target":2},
          {"source":2,"target":0},
          {"source":2,"target":3}
        ]
    };
    cola
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(graph.nodes)
      .enter().append("rect")
        .attr("class", "node")
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
        .attr("rx", 5).attr("ry", 5)
        .style("fill", function (d) { return color(1); })
        .call(cola.drag);

    var label = svg.selectAll(".label")
        .data(graph.nodes)
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

};