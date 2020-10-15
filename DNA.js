class DNA {
	constructor(target, value) {
		this.actual_fitness = null;
		this.fitness = null;
		this.percentage = null;
		this.target = target;

		if (value === undefined) 
			this.value = generate_random_string(this.target.length);
		else
			this.value = value;
	}

	calculate_fitness() {
		let score = 0;

		for (let i = 0;i < this.target.length;++ i)
			if (this.value[i] === this.target[i])
				++ score;

		this.actual_fitness = score;
		this.fitness = score * score * score * score;
	}

	crossover(parentB) {
		let child = "";
		let point  = Math.floor(Math.random() * this.target.length);

		for (let i = 0;i < this.target.length;++ i) 
			if (i < point)
				child += this.value[i];
			else 
				child += parentB.value[i];
		
		return new DNA(this.target, child);
	}

	mutate(mutation_rate) {
		for (let i = 0;i < this.value.length;++ i)
			if (Math.floor(Math.random() * 100) < mutation_rate)  
				this.value = replaceAt(this.value, i, generate_random_character()); 
	}
}