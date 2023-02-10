import operators from "./operators";

function operateRPN(queue: string[]) {
	const input = queue.map(token => token);
	const stack: string[] = []
	input.forEach(token => {
		if(/^\d*\.?\d*$/.test(token)) {
			stack.push(token);
		};

		if (/[\^*/+-]/.test(token)) {
			if(token === "+") {
				const num1 = Number(stack.pop());
				const num2 = Number(stack.pop());
				const answer = operators().addNumbers(num1, num2);
				stack.push(String(answer));
			};

			if(token === "-") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = operators().subtractNumbers(num1, num2);
				stack.push(String(answer));
			};

			if(token === "*") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = operators().multiplyNumbers(num1, num2);
				stack.push(String(answer));
			};

			if(token === "/") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = operators().divideNumbers(num1, num2);
				stack.push(String(answer));
			};

			if(token === "^") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = operators().exponentNumbers(num1, num2);
				stack.push(String(answer));
			};

		};
	});
	return stack[0];
	
}

export default operateRPN