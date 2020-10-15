class Population {
	static generation_count = 0;
	static start_point;
	static end_point;

	constructor(target, num_of_individuals, mutation_rate) {
		this.num_of_individuals = num_of_individuals;
		this.target = target;
		this.mutation_rate = mutation_rate;
		this.population = [];

		this.alpha_individual_value = 0;
		this.alpha_individual_percentage = 0;
		this.display_time = false;

		this.pool = [];
		Population.generation_count += 1;
	}

	init() {
		for (let i = 0;i < this.num_of_individuals;++ i)
			this.population.push(new DNA(this.target));
	}

	solution() {
		for (let i = 0;i < this.num_of_individuals;++ i)
			if (this.population[i].value === this.target) 
				return true;
		return false;
	}

	stats() {
		textSize(20);
		text('Individuals:', displayWidth / 2 + 100, 40);

		for (let i = 70;i < this.num_of_individuals * 7;i += 20)
			text(this.population[(i - 70) / 20].value, displayWidth / 2 + 100, i);
		

		textSize(40);
		text('Best Phrase So Far:', 200, displayHeight / 2 - 400);

		textSize(35);
		text(this.alpha_individual_value, 200, displayHeight / 2 - 350);

		textSize(40)
		text('Target:', 200, displayHeight / 2 - 300)

		textSize(35);
		text(this.target, 200, displayHeight / 2 - 250);

		textSize(30);
		text(`generation:${Population.generation_count}`, 200, displayHeight / 2 - 200);
		text(`best fitness:${this.alpha_individual_percentage}%`, 200, displayHeight / 2 - 175);
		text(`population:${this.num_of_individuals}`, 200, displayHeight / 2 - 150);
		text(`mutation:${this.mutation_rate}%`, 200, displayHeight / 2 - 125);

		if (this.display_time) {
			text(`Phrase found in ${Math.floor(Population.end_point -Population.start_point) / 1000}s`, 200, displayHeight / 2 - 100);
			this.display_time = false;
		}
	}

	natural_selection() {
		let sum = 0;
		
		this.alpha_individual_value = 0;
		this.alpha_individual_percentage = 0;

		for (let i = 0;i < this.num_of_individuals;++ i) {
			this.population[i].calculate_fitness();
			sum += this.population[i].fitness;

			if (this.alpha_individual_percentage < this.population[i].actual_fitness) {
				this.alpha_individual_percentage = this.population[i].actual_fitness;
				this.alpha_individual_value = this.population[i].value
			}
		}
		
		this.alpha_individual_percentage = this.alpha_individual_percentage / this.target.length * 100;

		if (this.alpha_individual_percentage === 100 && !this.display_time) {
			this.display_time = true;
			Population.end_point = performance.now();
		}

		for (let i = 0;i < this.num_of_individuals;++ i) 
			this.population[i].fitness = Math.floor(this.population[i].fitness / sum * 100);

		this.pool = [];

		for (let i = 0;i < this.num_of_individuals;++ i) 
			for (let j = 0;j < this.population[i].fitness;++ j)
				this.pool.push(new DNA(this.target, this.population[i].value))
	}

	generate_new_generation() {
		const temp = new Population(this.target, this.num_of_individuals, this.mutation_rate);

		for (let i = 0;i < this.num_of_individuals;++ i) {
			let parent1 = this.pool[Math.floor(Math.random() * this.pool.length)];
			let parent2 = this.pool[Math.floor(Math.random() * this.pool.length)];

			const child = parent1.crossover(parent2);
			child.mutate(this.mutation_rate);

			temp.population.push(child); 
		}

		return temp;
	}
}