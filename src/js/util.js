export function approximation(blockSteps, value) {
	let diff = [];
	let index = 0;

	blockSteps.forEach((val, i) => {
		diff[i] = Math.abs(value - val);
		index = diff[index] < diff[i] ? index : i;
	});
	return blockSteps[index];
}
