import operators from './operators';

function operateRPN(queue: string[]) {
	const input = queue.map((token) => token);
	const stack: string[] = [];
	input.forEach((token) => {
		if (/^-?\d*\.?\d*$/.test(token)) {
			if(token !== '-'){
				stack.push(token);
			}
		}
		if ((/[\^*/+-]/.test(token)) && !(/[0-9]/.test(token))) {
			const num2 = Number(stack.pop());
			const num1 = Number(stack.pop());
			if (token === '+') {
				const answer = operators().addNumbers(num1, num2);
				stack.push(String(answer));
			}

			if (token === '-') {
				const answer = operators().subtractNumbers(num1, num2);
				stack.push(String(answer));
			}

			if (token === '*') {
				const answer = operators().multiplyNumbers(num1, num2);
				stack.push(String(answer));
			}

			if (token === '/') {
				const answer = operators().divideNumbers(num1, num2);
				stack.push(String(answer));
			}

			if (token === '^') {
				const answer = operators().exponentNumbers(num1, num2);
				stack.push(String(answer));
			}
		}
	});
	let output: number = Math.round(Number(stack[0]) * 10000)/10000
	if(output > 100000000) {
		return output.toExponential(4);
	}
	return output.toString();
}

export default operateRPN;
