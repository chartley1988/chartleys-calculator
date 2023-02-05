import { test, expect } from 'vitest';

function splitString (inputString: string): string[] {
	const splitTokens = inputString.split(/[\s]|(?=[\^*/+-])|(?<=[\^*/+-])|(?<=[\\(\\)])|(?=[\\(\\)])/g);
		const removeEmpties = splitTokens.filter(entry => entry !== "");
		return removeEmpties;
	}

/*
PSEUDO CODE
===================================
Output  =   [] (Represents finished Reverse Polish Notation)
Stack   =   [] (Represents a list of operators, a staging area)
Tokens  =   [] (Input data)


1) If TOKEN is a number (operand), add to the OUTPUT (print it)

2) If TOKEN is a left-bracket, push it to the STACK

3) If TOKEN is a right-bracket, discard the right-bracket and pop the TOKENS from the STACK to the OUTPUT until the left-bracket is found. Pop and discard the left bracket.

4) If the TOKEN is an operator and the stack is empty or contains a left bracket on top, push the operator onto the stack.

5) If the TOKEN is an operator and has either higher precedence than the operator on the top of the STACK, or has the same precedence as the operator on top of the stack and is right-associative -- push it on to the STACK

6) If the TOKEN is an operator and has either lower precedence than the operator on the top of the STACK, or has the same precedence as the operator on the top of the STACK and is left associative -- continue to pop the STACK until this is not true. Then, push the incoming operator to the STACK.

7) At the end of the expression, pop all remaining operators from STACK to OUTPUT. No brackets should remain.

*/

const testTokens = splitString('1 + 3 * 9 / (2+4)')

function parseInfix(tokens) {
	const input: string[] = tokens.map((x) => x);
	console.log(`Input: ${input}`);
	console.log('------------------');

	const stack: string[] = [];
	const output: string[] = [];
	logResults(stack, output);

	for (let i = 0; i < tokens.length; i++) {
		const token: string = tokens[i];
		if (isOperand(token)) {
			output.push(token);
			logResults(stack, output);
			continue;
		}
		if (isLeftBracket(token)) {
			stack.push(token);
			logResults(stack, output);
			continue;
		}
		if (isRightBracket(token)) {
			while (stack.length > 0) {
				const topStackToken = stack[stack.length - 1];
				if (isLeftBracket(topStackToken)) {
					stack.pop();
					logResults(stack, output);
					break;
				} else {
					stack.pop();
					output.push(topStackToken);
					logResults(stack, output);
					continue;
				}
			}
			continue;
		}
		
		if (isOperator(token) && (stack.length === 0 || stack[0] === '(')) {
			stack.push(token);
			logResults(stack, output);
			continue;
		}
		
		if (isOperator(token)) {
			if (
				getPrecedence(token) > getPrecedence(stack[stack.length - 1]) ||
				(getPrecedence(token) ===
				getPrecedence(stack[stack.length - 1]) &&
				isRightAssociative(token))
				) {
					stack.push(token);
				}
				logResults(stack, output);
				console.log("I'm here!")
				continue;
			}
			
		if (isOperator(token)) {
			if (
				getPrecedence(token) <=
				getPrecedence(stack[stack.length - 1]) &&
				isLeftAssociative(token)
				) {
					while (
						getPrecedence(token) <=
						getPrecedence(stack[stack.length - 1]) &&
						isLeftAssociative(token)
						) {
							let removedToken = stack.pop() as string;
							output.push(removedToken);
							logResults(stack, output);
						}
						stack.push(token);
					}
					logResults(stack, output);
			continue;
		}
		
		stack.forEach(token => {
			stack.pop();
			output.push(token);
			logResults(stack, output);
		});
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
	})
});
