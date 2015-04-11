/* global d3, $, dat */
'use strict';

var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
},
width = 900 - margin.left - margin.right,
height = 500 - margin.bottom - margin.top,
lineData;

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .on("click", addCoordinates);

// gui stuff
var params = function() {
	this.variability = 5;
  this.transform = 100;
	this.baseline = 0;
  this.color = '#000000';
};
var input = new params();
var gui = new dat.GUI(
  {height : 5 * 32 - 1}
);

var controller = {
						variability: gui.add(input, 'variability', 0, 100)
								.onChange(function() {
									update();
								}),

						transform: gui.add(input, 'transform', 0, 200)
							 .onChange(function() {
                 update();
							}),
						baseline: gui.add(input, 'baseline', 0, 100)
													 .onChange(function() {
						                 update();
													}),
						color: gui.addColor(input, 'color')
									.onChange(function(value) {
								svg.selectAll('path').attr('stroke', value);
						}),
   				  };

var lineFunction = d3.svg.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .interpolate('basis');

d3.json('graph.json', function(error, letters){
	lineData = letters;
	update();
});

function update(){
  svg.selectAll('path').remove();

	//for each letter
	for (var letter in lineData){
		if(lineData.hasOwnProperty(letter)){
			var letterPaths = transform(lineData[letter]);

			for (var i = letterPaths.length - 1; i >= 0; i--) {
				svg.append('path')
			    .attr('d', lineFunction(letterPaths[i]))
					.attr('stroke', input.color);
			}
		}
	}
}

function addCoordinates(){
  var coordinates = d3.mouse(this);
	if (!lineData.newLetter){
		lineData.newLetter = [[]];
	}

  lineData.newLetter[0].push(
			{x: coordinates[0] / input.transform * 100,
			y: coordinates[1] / input.transform * 100})
		;
  update();
}

function transform(letterPaths){
	var paths = $.extend(true, [], letterPaths);
	for (var i = paths.length - 1; i >= 0; i--) {
	  paths[i].map(coerce);
	}
	return paths;
}

function coerce(d){
	d.x = (d.x + Math.random() * input.variability - input.variability/2) *
		(input.transform / 100);
	d.y = (d.y + Math.random() * input.variability - input.variability/2) *
		(input.transform / 100) + input.baseline;
	return d;
}
