import operators from './operators';

function operateRPN(queue: string[]) {
	const input = queue.map((token) => token);
	const stack: string[] = [];
	input.forEach((token) => {
		if (/^-?\d*\.?\d*$/.test(token)) {
			if(token !== '-'){
				stack.push(token);
			}
			console.log(token);
		}
		if ((/[\^*/+-]/.test(token)) && !(/[0-9]/.test(token))) {
			console.log(stack);
			const string2 = stack.pop();
			const string1 = stack.pop();
			const num2 = Number(string2);
			const num1 = Number(string1);
			printDebug(num1, num2, token, stack, input)
			if (token === '+') {
				const answer = operators().addNumbers(num1, num2);
				//printDebug(num1, num2, token, stack, input, answer)
				stack.push(String(answer));
			}

			if (token === '-') {
				const answer = operators().subtractNumbers(num1, num2);
				//printDebug(num1, num2, token, stack, input, answer)
				stack.push(String(answer));
			}

			if (token === '*') {
				const answer = operators().multiplyNumbers(num1, num2);
				//printDebug(num1, num2, token, stack, input, answer)
				stack.push(String(answer));
			}

			if (token === '/') {
				const answer = operators().divideNumbers(num1, num2);
				//printDebug(num1, num2, token, stack, input, answer)
				stack.push(String(answer));
			}

			if (token === '^') {
				const answer = operators().exponentNumbers(num1, num2);
				//printDebug(num1, num2, token, stack, input, answer)
				stack.push(String(answer));
			}
		}
	});
	let output: number = Math.round(Number(stack[0]) * 10000)/10000
	if(output > 100000000) {
		return output.toExponential(4);
	}
	return output.toString();

	function printDebug(num1, num2?, token?, stack?, input?, answer?) {
		console.table([
			`num1: ${num1}`,
			`num2: ${num2}`,
			`token: ${token}`,
			`stack: ${stack}`,
			`input: ${input}`,
			`answer: ${answer}`
		]);
	}
}

export default operateRPN;
