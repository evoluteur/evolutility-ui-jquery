// Original code and blog post by Steve Hall http://www.delimited.io/blog/2013/12/19/force-bubble-charts-in-d3
// Modified for Evolutility by Olivier Giulieri http://evoluteur.github.io/evolutility/

var Evol=Evol||{};

Evol.Bubbles = function(){

var Bubbles = function(opts){
    _.extend(this, opts);
    this.fieldsH={};
    for(var i in this.fields){
      var f=this.fields[i];
        this.fieldsH[f.id]=f;
    }
    return this;
};

Bubbles.prototype._initialize = function(){
  if(!this.graphInitialized){
  //var fill = d3.scale.ordinal().range(['#827d92','#827354','#523536','#72856a','#2a3285','#383435'])
    this.svg = d3.select(this.elem).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.force = d3.layout.force();
    this.graphInitialized=true;
  }
};

Bubbles.prototype.fixData = function(data){
  return _.map(data, function(d){
    return d;
  });
};

Bubbles.prototype.setData = function(data){
  var that=this,
      len=data.length,
      defaultSize=len<17 ? 20 : (len<100 ? 16 : 10);

  this.defaultSize=defaultSize;

  if(this.sizeFieldId){
    var sizes = _.map(data, function(d){
        var v= d[that.sizeFieldId];
        if(v===null || _.isNaN(v)){
          v=0;
        }
        return v;
      });
    this.plotScale = d3.scale.log().domain([ _.min(sizes), _.max(sizes)]).range([defaultSize, defaultSize+20]);
  }else{
    this.plotScale = function(d){ return defaultSize;};
  }

  this.fill = len<11?d3.scale.category10():d3.scale.category20();

  this.data = data;
  for (var j = 0; j < data.length; j++) {
    data[j].radius = defaultSize;
    data[j].x = Math.random() * this.width;
    data[j].y = Math.random() * this.height;
  }

  this._initialize();

  this.maxRadius = d3.max(_.pluck(data, 'radius'));

  this.nodes = this.svg.selectAll("circle")
    .data(data);

  this.nodes.enter().append("circle")
    .attr("class", "node")
    .attr("cx", function (d) { 
      return d.x;
    })
    .attr('data-mid', function (d) { return d.id;})
    .attr("cy", function (d) { return d.y; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return that.fill(d[that.colorFieldId]); })
    .on("mouseenter", showPopover)
    .on("mouseleave", removePopovers)
    .on("click", removePopovers);

  this.nodes
    .attr('data-mid', function (d) { return d.id;});


  this.nodes.exit().remove();

  this.changeBubblesGroup(this.groupFieldId);

  function removePopovers () {
    $('.popover').each(function() {
      $(this).remove();
    }); 
  }

  function showPopover (d) {
    $(this).popover({
      animation: true,
      placement: 'auto top',
      container: 'body',
      trigger: 'manual',
      html : true,
      content: that.tooltip(d)
    });
    $(this).popover('show', 500);
    if(d3){
      d3.select('.popover').style('opacity', 0)
        .transition().duration(500)
        .style('opacity', 1);
    }
  }

};

Bubbles.prototype.getCenters = function (fId, size, data) {
  var f=this.fieldsH[fId],
      centers, 
      map,
      na='N/A';

  centers = _.uniq(_.pluck(data, fId)).map(function (d) {
    return {name: d, value: 1};
  });

  if(f){
    if(f.type==='lov'){
      var lovH={};
      _.forEach(f.list, function(c){
        lovH[c.id]=c.text;
      });
      _.forEach(centers, function(c){
        c.label=lovH[c.name]||na;
      });
      centers=centers.sort(Evol.Dico.sortingText('label'));
    }else if(f.type==='boolean'){
      _.forEach(centers, function(c){
        if(c.name===true){
          c.label = f.labelTrue || Evol.i18n.yes;
        }else if(c.name===false){
          c.label = f.labelFalse || Evol.i18n.no;
        }else{
          c.label=na;
        }
      });
    }else if(Evol.Def.fieldIsNumber(f)){
      centers = centers.sort(Evol.Dico.sortingNumber('name'));
      var c=_.findWhere(centers, {'name': null});
      if(c){
        c.label = na;
      }
    }/*else{
      centers = _.sortBy(centers, 'name');
    }*/
  }
  map = d3.layout.treemap().size(size).ratio(1/1);
  map.nodes({children: centers});

  return centers;
};

Bubbles.prototype.changeBubblesGroup = function(groupFieldId){
  var centers = this.getCenters(groupFieldId, [800, 600], this.data);

  this.groupFieldId = groupFieldId;
  this.force.on("tick", this.tick(centers, groupFieldId, this.data));
  this.labels(centers);
  this.force.start();
};

Bubbles.prototype.changeBubblesColor = function (colorFieldId){
  var that=this;
  this.colorFieldId=colorFieldId;
  this.fill = d3.scale.category10();
  this.svg.selectAll('circle')
    .transition().duration(500)
    .style('fill', function(d){
      return colorFieldId?that.fill(d[colorFieldId]):'rgb(31, 119, 180)';
    });
};

Bubbles.prototype.changeBubblesSize = function (sizeFieldId){
  var that=this;

  this.sizeFieldId=sizeFieldId;
  var cs=this.svg.selectAll('circle');
  if(sizeFieldId){
    var sizes = _.map(this.data, function(d){
      var v=d[sizeFieldId];
      return (v===null || v===isNaN || _.isUndefined(v))?0:v;
    });
    this.plotScale = d3.scale.log().domain([ _.min(sizes), _.max(sizes)]).range([10, 25]);
    cs.transition().duration(500)
      .attr('r', function(d){
        var v=sizeFieldId?that.plotScale(d[sizeFieldId]||0):10;
        if(v===null || _.isNaN(v)){
          v=that.defaultSize;
        }
        return v;
      });
      //.ease("elastic");
  }else{
    cs.transition().duration(500)
      .attr('r', that.defaultSize);
      //.ease("elastic");
  }
  //this.force.start();
};

Bubbles.prototype.tick = function (centers, varname) {
  var that=this,
      foci = {};

  for (var i = 0; i < centers.length; i++) {
    foci[centers[i].name] = centers[i];
  }
  return function (e) {
    for (var i = 0; i < that.data.length; i++) {
      var o = that.data[i];
      var f = foci[o[varname]];
      o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
      o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
    }
    that.nodes.each(that.collide(0.12, that.data))
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });
  };
};

Bubbles.prototype.labels = function(centers) {
  this.svg.selectAll(".label").remove();
  this.svg.selectAll(".label")
    .data(centers)
    .enter().append("text")
      .attr("class", "label")
      .text(function (d) { 
        return d.label || d.name ;
      })
      .attr("transform", function (d) {
        return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + 20) + ")";
      });
};

Bubbles.prototype.collide = function(alpha, data) {
  var quadtree = d3.geom.quadtree(data),
      maxRadius=this.maxRadius,
      padding=2;
  return function (d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
};

return Bubbles;

}();
