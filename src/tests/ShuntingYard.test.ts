import { test, expect } from 'vitest';

function splitString(inputString: string): string[] {
	const splitTokens = inputString.split(
		/[\s]|(?=[\^*/+-])|(?<=[\^*/+-])|(?<=[\\(\\)])|(?=[\\(\\)])/g
	);
	const removeEmpties = splitTokens.filter((entry) => entry !== '');
	return removeEmpties;
}

/*
PSEUDO CODE
===================================
Output  =   [] (Represents finished Reverse Polish Notation)
Stack   =   [] (Represents a list of operators, a staging area)
Tokens  =   [] (Input data)

*/

const testTokens = splitString('4+18/(9-3)');

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
}

parseInfix(testTokens);

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

describe('Shunting Yard - Parses infix to postfix', () => {
	test('test config', () => {
		expect('5').toEqual('5');
	});

	test('Is left?', () => {
		expect(isLeftAssociative('++')).toBe(true);
	});
});
