import { test, expect } from 'vitest';

// String Parser
function splitString(inputString: string): string[] {
	const splitTokens = inputString.split(
		/[\s]|(?=[\^*/+-])|(?<=[\^*/+-])|(?<=[\\(\\)])|(?=[\\(\\)])/g
	);
	const removeEmpties = splitTokens.filter((entry) => entry !== '');
	return removeEmpties;
}

// Shunting Yard
function parseInfix(tokens) {
	const input: string[] = tokens.map((x) => x);
	console.log(`Input: ${input}`);
	console.log('------------------');

	const stack: string[] = [];
	const output: string[] = [];
	logResults(stack, output);

	for (let i = 0; i < tokens.length; i++) {
		const token: string = tokens[i];
		console.log(`CURRENT TOKEN: ${token}`)

		// If it's a number, add it to the output
		if (isOperand(token)) {
			output.push(token);
			logResults(stack, output);
			continue;
		}

		// If it's an operator..
		if (isOperator(token)) {
			// While there's an operator on top of the stack with greater precedence
			if (stack.length !== 0) {
				console.log(getPrecedence(stack[stack.length - 1]));
				console.log(getPrecedence(token));
				while (
					(stack[stack.length - 1] !== '(' &&
						getPrecedence(stack[stack.length - 1]) -
							getPrecedence(token) >
							0) ||
					(getPrecedence(stack[stack.length - 1]) -
						getPrecedence(token) ===
						0 &&
						isLeftAssociative(token))
				) {
					// Pop operators from the stack to output
					const movedToken = stack.pop() as string;
					output.push(movedToken);
				}
			}
			stack.push(token);
			logResults(stack, output);
			continue;
		}

		// If it's a left bracket, push it to the stack
		if (isLeftBracket(token)) {
			stack.push(token);
			logResults(stack, output);
			continue;
		}

		// If it's a right bracket...
		if (isRightBracket(token)) {
			// While there's not a left bracket at the top of the stack:
			while (stack[stack.length - 1] !== '(') {
				// Pop operators from stack on to output
				const movedToken = stack.pop() as string;
				output.push(movedToken);
			}
			// Pop the left bracket and discard it
			stack.pop();
			logResults(stack, output);
		}

	}
	while (stack.length > 0) {
		// Pop operators from stack on to output
		const movedToken = stack.pop() as string;
		output.push(movedToken);
		logResults(stack, output);
	}

	return output;
}

function logResults(stack, output) {
	console.log(`Stack: ${stack}`);
	console.log(`Output: ${output}`);
	console.log('------------------');
}

function isOperand(token: string) {
	if (/\d+/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function isLeftBracket(token: string) {
	if (/\(/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function isRightBracket(token: string) {
	if (/\)/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function isOperator(token: string) {
	if (/[\^*/+-]/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function getPrecedence(token: string) {
	if (/[+-]/.test(token)) {
		return 1;
	}
	if (/[*/]/.test(token)) {
		return 2;
	}
	if (/[\^]/.test(token)) {
		return 3;
	} else {
		return 0;
	}
}

function isLeftAssociative(token: string) {
	if (/[*/+-]/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function isRightAssociative(token: string) {
	if (/[\^]/.test(token)) {
		return true;
	} else {
		return false;
	}
}

function operateRPN(queue: string[]) {
	const input = queue.map(token => token);
	const stack: string[] = []
	console.log(input);
	input.forEach(token => {
		if(/^\d*\.?\d*$/.test(token)) {
			stack.push(token);
		};

		if (/[\^*/+-]/.test(token)) {
			if(token === "+") {
				const num1 = Number(stack.pop());
				const num2 = Number(stack.pop());
				const answer = addNumbers(num1, num2);
				stack.push(String(answer));
				console.log(stack);
			};

			if(token === "-") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = subtractNumbers(num1, num2);
				stack.push(String(answer));
				console.log(stack);
			};

			if(token === "*") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = multiplyNumbers(num1, num2);
				stack.push(String(answer));
				console.log(stack);
			};

			if(token === "/") {
				const num2 = Number(stack.pop());
				const num1 = Number(stack.pop());
				const answer = divideNumbers(num1, num2);
				stack.push(String(answer));
				console.log(stack);
			};
		};
	});
}
// Test equations
const testTokens = splitString('9*6*2/4.56');
const equationRPN = parseInfix(testTokens);
operateRPN(equationRPN);

//
describe('Shunting Yard - Parses infix to postfix', () => {
	test('test config', () => {
		expect('5').toEqual('5');
	});


});

function addNumbers(a: number, b: number): number {
	return a + b;
}

function subtractNumbers(a: number, b: number): number {
	return a - b;
}

function multiplyNumbers(a: number, b: number): number {
	return a * b;
}

function divideNumbers(a: number, b: number): number | string {
	if (b === 0) return 'Error! Divide by Zero';
	return a / b;
}
