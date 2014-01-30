function visual (cola_lib) {
    var width = 960,
        height = 500;

    var color = d3.scale.category20();
    
    var cola = cola_lib.d3adaptor()
        .linkDistance(120)
        .avoidOverlaps(true)
        .flowLayout()
        .size([width, height]);


    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    graph = {
        "class":[
          {"name":"a","width":60,"height":40},
          {"name":"w","width":60,"height":40},
          {"name":"e","width":60,"height":40},
          {"name":"t","width":60,"height":40},
          {"name":"u","width":60,"height":40},
          {"name":"p","width":60,"height":40},
          {"name":"h","width":60,"height":40},
          {"name":"r","width":60,"height":40},
          {"name":"b","width":60,"height":40}
        ],
        "links":[
          {"source":0,"target":1},
          {"source":0,"target":2},
          {"source":0,"target":3},
          {"source":0,"target":4},
          {"source":0,"target":5},
          {"source":0,"target":6},
          {"source":0,"target":7},
          {"source":0,"target":8}
        ]
    }
;    cola
        .nodes(graph.class)
        .links(graph.links)
        .start(30, 30, 30);

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".classs")
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

};
