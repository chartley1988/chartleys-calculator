import { test, expect } from 'vitest';

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

const testTokens = ['5', '(', '44', ')'];

function parseInfix(tokens) {
	const input: string[] = tokens.map((x) => x);
	console.log(`Input: ${input}`);
	console.log('------------------')
	
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
			logResults(stack, output);
		}
	}
}

parseInfix(testTokens);

function logResults(stack, output) {
	console.log(`Stack: ${stack}`);
	console.log(`Output: ${output}`);
	console.log('------------------')
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

describe('Shunting Yard - Parses infix to postfix', () => {
	test('test config', () => {
		expect('5').toEqual('5');
	});
});
