/**
Qualities of Base R Multi-class Scatterplots
- No gridlines
- Weirdly placed framed x and y limits
- Circles without fill
- Outer frame border
- Axes tick labels are below y=0 and to the left of x=0
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

function baseRTrain(taskNum, file, xRange, yRange, xDom, yDom, xFormat, yFormat){

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
	var classColors = ["black", "#FF0000", "#33cc33" , "#0000FF"]

	var color = d3.scaleOrdinal().domain(["A", "B", "C", "D"])
	.range(classColors);;


	  //Returns true if the user choice is within the give range of the chart and false otherwise
  function isValidCoor(x, y){
    if(x < xDom[1] && x > xDom[0] && y < yDom[1] && y > yDom[0]){
      return true;
    }
    return false;
  }

	var x = d3.scaleLinear()
		.range([margin.left, width]);

	var y = d3.scaleLinear()
		.range([height, margin.left]);

	//hardcoding domain
	x.domain(xDom);
	y.domain(yDom);


	main.createBaseLayer = function(){

		svg = d3.select('#plot')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
			// .on("mousedown", mousedown)
			// .on("mouseup", mouseup);

		  // Upper Horizontal Line
	  svg.append('line')
	  	.attr('class', 'border')
	  	.attr('x1', margin.left)
	  	.attr('x2', width)
	  	.attr('y1', margin.top)
	  	.attr('y2', margin.top)


	  //Right verticle Line
	  svg.append('line')
	  	.attr('class', 'border')
	  	.attr('x1', width)
	  	.attr('x2', width)
	  	.attr('y1', margin.top)
	  	.attr('y2', height)



		var xAxis = d3.axisBottom()
			.scale(x)
			.tickValues(d3.range(xRange[0], xRange[1], xRange[2]))
			.tickSizeOuter(0);

		if(xFormat){
			xAxis.tickFormat(d3.format(".0f"))
		}

		var yAxis = d3.axisLeft()
			.scale(y)
			.tickValues(d3.range(yRange[0], yRange[1], yRange[2]))
			.tickSizeOuter(0);

		if(xFormat){
			yAxis.tickFormat(d3.format(".0f"))
		}


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

		legend.append('circle')
			.attr('cx', width - 10)
			.attr('cy', 8)
			.attr('r', 4)
			.style('stroke', color)
			.style('fill', 'none')

		// add text to the legend elements.
		// rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
		legend.append('text')
			.attr('x', width + 10)
			.attr('y', 8)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d){ return d; });

	}
// again scaleOrdinal

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
				.style('fill', 'none');


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
