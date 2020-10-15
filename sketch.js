/*
PROBLEM:
The Shakespeare and Monkey Problem - SIMULATION using a genetic algorithm 
*/

let generation;
let target = "tutoriale"


function genetic_algorithm() {
	background(255);
	generation.natural_selection();
	generation.stats();

	if (!generation.solution()) 
		generation = generation.generate_new_generation();
	else 
		noLoop();
}


function setup() {
	createCanvas(displayWidth, displayHeight - 150);

  	generation = new Population(target, 100, 1);
  	Population.start_point = performance.now();
  	generation.init();
}	


function draw() {
	genetic_algorithm();
}