function exponetiation(exponent) {
	let P = 1;
	for (let i = 0;i < exponent;++ i)
		P *= 2;
	return P;
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function generate_random_character() {
	const set = "abcdefghijklmnopqrstuvwxyz.- ";
	return set[Math.floor(Math.random() * set.length)];
}

function generate_random_string(len) {
	let random_string = "";

	for (let i = 0;i < len;++ i)
		random_string += generate_random_character();

	return random_string;
}