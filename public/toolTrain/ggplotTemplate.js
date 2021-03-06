/**
Qualities of ggplot2 Multi-class Scatterplots
- Weird y and x limits
- Grey background
- White gridlines with bolder lines at major ticks
**/

//Gets a random integer between lower and upper limits and returns the class at the random integer index.
function getRandomClass(lower, upper) {
	console.assert(arguments.length === 2, "getRandomInteger() requires lower and upper parameters.");
  var randInt = Math.floor(Math.random() * (upper - lower)) + lower;

  var classes = ["A", "B", "C", "D"]
  //console.log("randInt", randInt);
	return classes[randInt];
}

//Given the class in question and data, this returns the centroid coordinates
function getClassCentroid(randClass, data){
  var classData = data.filter(function(d){
    return d.class == randClass
    })
  var xAvg = d3.mean(classData, function(d) {return d.x})
  var yAvg = d3.mean(classData, function(d) {return d.y})
  centroid = {"xAvg": xAvg,
          "yAvg": yAvg}
  return centroid;
}

function ggpPlot(taskNum, file, xRange, yRange, xDom, yDom, xFormat, yFormat){
  var margin = {top: 50, right: 50, bottom: 50, left:50};
  var width = 600 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var main = {"clicks" : 0,
              "startTime":null,
              "endTime":null,
              "dataFile": file,
              "class": getRandomClass(0, 4)
            }

  var svg;

  //Change this for other tools
  var classColors = ["#F8766D", "#7CAE00", "#00BFC4" , "#C77CFF"]

  var color = d3.scaleOrdinal().domain(["A", "B", "C", "D"])
  .range(classColors);;

	//Returns true if the user choice is within the give range of the chart and false otherwise
	function isValidCoor(x, y){
		if(x < xDom[1] && x > xDom[0] && y < yDom[1] && y > yDom[0]){
			return true;
		}
		return false;
	}



  var xGridLength = d3.range(xRange[0], xRange[1], xRange[2]).length;
  var yGridLength = d3.range(yRange[0], yRange[1], yRange[2]).length;

  var x = d3.scaleLinear()
  	.range([margin.left, width]);

  var y = d3.scaleLinear()
  	.range([height, margin.left]);

  //hardcoding domain
  x.domain(xDom);
  y.domain(yDom);

  // gridlines in x axis function
  function make_xMajor_gridlines() {
      return d3.axisBottom(x)
          .ticks(xGridLength)
  }

  function make_xMinor_gridlines(){
  	return d3.axisBottom(x)
  				.ticks(xGridLength*2)
  }

  // gridlines in y axis function
  function make_yMajor_gridlines() {
      return d3.axisLeft(y)
          .ticks(yGridLength)
  }
  function make_yMinor_gridlines() {
      return d3.axisLeft(y)
          .ticks(yGridLength * 2)
  }

  main.createBaseLayer = function(){
    svg = d3.select('#plot')
    	.append('svg')
    	.attr('width', width + margin.left + margin.right)
    	.attr('height', height + margin.top + margin.bottom)
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    //create grey background
    svg.append('rect')
    	.attr('class', 'ggpBackground')
    	.attr('width', width - margin.right)
    	.attr('height', height - margin.bottom)
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    	.style('fill', "#EBEDED")


    var xAxis = d3.axisBottom()
    	.scale(x)
    	.tickValues(d3.range(xRange[0], xRange[1], xRange[2]))

    if(xFormat){
      xAxis.tickFormat(d3.format(".1f"));
    }

    var yAxis = d3.axisLeft()
    	.scale(y)
    	.tickValues(d3.range(yRange[0], yRange[1], yRange[2]));

    if(yFormat){
      yAxis.tickFormat(d3.format(".1f"));
    }
    // adding X gridlines
    svg.append("g")
        .attr("class", "ggpMajorGrid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_xMajor_gridlines()
            .tickSize(-(height - margin.top))
            .tickValues(d3.range(xRange[0], xRange[1], xRange[2]))
            .tickFormat("")
        )
    svg.append("g")
        .attr("class", "ggpMinorGrid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_xMinor_gridlines()
            .tickSize(-(height - margin.top))
            .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")
        .attr("class", "ggpMajorGrid")
        .attr("transform", "translate("+margin.right+",0)")
        .call(make_yMajor_gridlines()
            .tickSize(-(width - margin.right))
            .tickValues(d3.range(yRange[0], yRange[1], yRange[2]))

            .tickFormat("")
        )

    svg.append("g")
        .attr("class", "ggpMinorGrid")
        .attr("transform", "translate("+margin.right+",0)")
        .call(make_yMinor_gridlines()
            .tickSize(-(width - margin.right))
            .tickFormat("")
        )


    svg.append('g')
      .attr('transform', 'translate(0,' + height+ ')')
      .attr('class', 'x axis')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.append('text')
  		.attr('x', 5)
  		.attr('y', height/2)
  		.attr('class', 'label')
  		.text('y');

  	svg.append('text')
  		.attr('x', width/2)
  		.attr('y', height + 40)
  		.attr('text-anchor', 'end')
  		.attr('class', 'label')
  		.text('x');

  }

  main.createLegend = function(){

    var legend = svg.selectAll('legend')
  		.data(color.domain())
  		.enter()
  		.append('g')
  			.attr('class', 'legend')
  			.attr('transform', function(d,i){ return 'translate(25,' + (i + 2) * 20 + ')'; });

		legend.append('rect')
  		.attr('x', width - 17)
  		.attr('width', 17)
  		.attr('height', 17)
  		.style('fill', '#EBEDED');

		legend.append('circle')
			.attr('cx', width - 8.5)
			.attr('cy', 8)
			.attr('r', 4)
			.style('fill', color)

  	// add text to the legend elements.
  	// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
  	legend.append('text')
  		.attr('x', width + 15)
  		.attr('y', 8)
  		.attr('dy', '.35em')
  		.style('text-anchor', 'end')
  		.text(function(d){ return d; });
  }

  main.plotData = function(){
    d3.csv(main.dataFile, function(error, data){
    	data.forEach(function(d){
    		 d.x = +d.x;
    		 d.y = +d.y;
    	});


    	var bubble = svg.selectAll('.bubble')
    		.data(data)
    		.enter().append('circle')
    		.attr('class', 'bubble')
    		.attr('cx', function(d){return x(d.x);})
    		.attr('cy', function(d){ return y(d.y); })
    		.attr('r', 3)
    		.style('stroke', function(d){ return color(d.class); })
    		.style('fill', function(d){ return color(d.class)});




        /* CENTROID LOCATOR */
		    if(taskNum == 1){

					// grabbing the centroid coordinates
					centroid = getClassCentroid(main.class, data)
					main.xAvg = centroid.xAvg
					main.yAvg = centroid.yAvg

		      svg.on("mousedown", mousedown)
		         .on("mouseup", mouseup);
		        var circle_on = false;
		        var circle;
		        var cx, cy;
		        var attempt = 1



		      function mousedown() {
		        if(circle_on){
		          svg.selectAll("circle.centroid").remove();
		        }
		        if(main.clicks == 0){
		          main.startTime = Date.now()
		        }

		        var m = d3.mouse(this);
		        circle = svg.append("circle")
		          .attr("class", "centroid")
		            .attr("cx", m[0])
		            .attr("cy", m[1])
		            .attr("r", 8)
		            .style("fill", 'grey')
								.style("stroke",'black')
								.style("stroke-width", 1)
		            .style('opacity', .7);

		          cx = m[0]
		          cy = m[1]

		          circle_on = true;
		          svg.on("mousemove", mousemove);
		      }

		      function mousemove() {
		        var m = d3.mouse(this);

		        circle.attr("cx", m[0])
		            .attr("cy", m[1]);

		          cx = m[0]
		          cy = m[1]

		      }

		      function mouseup() {
		          svg.on("mousemove", null);
		          cx = x.invert(cx)
		          cy = y.invert(cy)

							main.valid = isValidCoor(cx, cy)
		          main.endTime = Date.now()
		          main.xCor = cx
		          main.yCor = cy
		          main.clicks += 1
		          main.xErr = Math.sqrt(Math.pow(main.xCor - main.xAvg, 2))
		          main.yErr = Math.sqrt(Math.pow(main.yCor - main.yAvg, 2))
		          main.xPErr = Math.abs(main.xErr / main.xAvg)
		          main.yPErr = Math.abs(main.yErr / main.yAvg)

							if(main.valid){
								document.getElementById('warning').innerHTML = "";
								experimentr.release();
							} else {
								document.getElementById('warning').innerHTML = "Warning: The \"Next\" button will only be enabled when the highlighted region is in the correct cell.";
								experimentr.hold();
							}
		          //console.log("main object", main)

		      }
		    }

		    /* DENSITY BOUNDING BOX */
		    else if (taskNum == 2) {
		      svg.on("mousedown", mousedown)
		         .on("mouseup", mouseup);

					//XY placement of mouse (center of box coordinates)
					var xUser;
					var yUser;
					//boolean used to indicate whether a square has been created
		      var square_on = false;

					//Creating the local square variable to be accessed by other mouse functions
		      var square;

					//Creatin object that will hold coordinates of density box. tR -> top right, bL -> bottom left...
		      var denseBoundaries = {
		      	"tR" : {"x":0, "y":0},
		      	"bR" : {"x":0, "y":0},
		      	"bL" : {"x":0, "y":0},
		      	"tL" : {"x":0, "y":0}
		      }

					//Updates denseBoundaries object by inverting the pixelated values to the data domain
		      function updateBoundaries(xCoor, yCoor){
		      	denseBoundaries.tR.x = x.invert(xCoor + 25)
		      	denseBoundaries.tR.y = y.invert(yCoor - 25)

		      	denseBoundaries.bR.x = x.invert(xCoor + 25)
		      	denseBoundaries.bR.y = y.invert(yCoor + 25)

		      	denseBoundaries.bL.x = x.invert(xCoor - 25)
		      	denseBoundaries.bL.y = y.invert(yCoor + 25)

		      	denseBoundaries.tL.x = x.invert(xCoor - 25)
		      	denseBoundaries.tL.y = y.invert(yCoor - 25)
		      }

					//Computes the number of points within a given boundary box
					function getDensity(xMax, xMin, yMax, yMin){

						var newData = data.filter(function(d){
							return d.x < xMax && d.x > xMin && d.y < yMax && d.y > yMin
						})

						var classData = newData.filter(function(d){
							return d.class = main.class
						})
						return classData.length;
					}

		      function mousedown() {
		      	if(square_on){
		      		svg.selectAll("rect.square").remove();
		      	}

						if(main.clicks == 0){
							main.startTime = Date.now()
						}

		        var m = d3.mouse(this);
		        square = svg.append("rect")
		        	.attr("class", "square")
		        	.attr("width", 50)
		        	.attr("height", 50)
		         	.attr("x", m[0] - 25)
		         	.attr("y", m[1] - 25)
		    	    .attr("stroke", 'black')
		    	    .attr("fill", "none");


						xUser = x.invert(m[0]);
						yUser = y.invert(m[1]);
		      	updateBoundaries(m[0], m[1]);

		        square_on = true;
		        svg.on("mousemove", mousemove);
		      }



		      function mousemove() {
		      	var m = d3.mouse(this);

		      	square.attr("x", m[0] - 25)
		             	.attr("y", m[1] - 25);

						xUser = x.invert(m[0]);
						yUser = y.invert(m[1]);

		      	updateBoundaries(m[0], m[1]);

		      }

		      function mouseup() {
		          svg.on("mousemove", null);

							var density = getDensity(denseBoundaries.tR.x, denseBoundaries.tL.x, denseBoundaries.tR.y, denseBoundaries.bR.y);

							main.valid = (isValidCoor(denseBoundaries.tR.x, denseBoundaries.tR.y) &&
														isValidCoor(denseBoundaries.bR.x, denseBoundaries.bR.y) &&
														isValidCoor(denseBoundaries.tL.x, denseBoundaries.tL.y) &&
														isValidCoor(denseBoundaries.bR.x, denseBoundaries.bR.y))
							main.endTime = Date.now();
							main.timeDiff = main.endTime - main.startTime
							main.clicks += 1;
							main.density = density;
							main.xMax = denseBoundaries.tR.x;
							main.xMin = denseBoundaries.tL.x;
							main.yMax = denseBoundaries.tR.y;
							main.yMin = denseBoundaries.bR.y;
							if(main.valid){
								document.getElementById('warning').innerHTML = "";
								experimentr.release();
							} else {
								document.getElementById('warning').innerHTML = "Warning: The \"Next\" button will only be enabled when the highlighted region is in the correct cell.";
								experimentr.hold();
							}
		      }
		    }

		    /* LINE OF BEST FIT */
				else{

					svg.on("mousedown", mousedown)
	           .on("mouseup", mouseup)
	        var line_on = false;
	        var line;
	        var x1, x2, y1, y2;

					function calculateDistance(a, b, c, x, y){
						var numerator = Math.abs((a*x) - (b*y) + c)
						var denominator = Math.sqrt((a*a) + (b*b))

						return numerator/denominator
					}

					function getMeanDistance(a, b, c){

						var newData = data.filter(function(d){
							return d.class == main.class
						})


						var dataLength = newData.length
						var totalDist = 0

						newData.forEach(function(each){
							each.dist = calculateDistance(a, b, c, x(each.x), y(each.y))
							totalDist += each.dist
						})


						return totalDist/dataLength
					}


					function mousedown() {
						if(line_on){
							svg.selectAll("line.bestFitLine").remove();
						}

						if(main.clicks == 0){
							main.startTime = Date.now()
						}

						var m = d3.mouse(this);
						line = svg.append("line")
							.attr("class", "bestFitLine")
								.attr("x1", m[0])
								.attr("y1", m[1])
								.attr("x2", m[0])
								.attr("y2", m[1]);

							x1 = m[0]
							y1 = m[1]

							line_on = true;
							svg.on("mousemove", mousemove);
					}

					function mousemove() {
							var m = d3.mouse(this);
							line.attr("x2", m[0])
									.attr("y2", m[1]);

							x2 = m[0]
							y2 = m[1]
					}

					function mouseup() {
							svg.on("mousemove", null);
							var a = (y2 - y1) / (x2 - x1)
							var c = y1 - (a * (x1))

							avgDist = getMeanDistance(a, 1, c);

							main.valid = (isValidCoor(x.invert(x2), y.invert(y2)) &&
			                      isValidCoor(x.invert(x1), y.invert(y1)) &&
			                      (avgDist != 0 || !isNaN(avgDist)))
							main.endTime = Date.now();
							main.timeDiff = main.endTime - main.startTime
							main.clicks += 1;
							main.avgDist = avgDist;
							main.slope = a;
							main.intercept = c;

							if(main.valid){
								document.getElementById('warning').innerHTML = "";
								experimentr.release();
							} else {
								document.getElementById('warning').innerHTML = "Warning: The \"Next\" button will only be enabled after you provide a valid line of best fit.";
								experimentr.hold();
						}
					}
				}
		});
	}
	return main;
}
