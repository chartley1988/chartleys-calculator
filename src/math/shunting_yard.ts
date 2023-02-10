function shuntingYard () {
	// Shunting Yard
	function parseInfix(tokens) {
		const input: string[] = tokens.map((x) => x);
		const stack: string[] = [];
		const output: string[] = [];
	
		for (let i = 0; i < tokens.length; i++) {
			const token: string = tokens[i];
	
			// If it's a number, add it to the output
			if (isOperand(token)) {
				output.push(token);
				continue;
			}
	
			// If it's an operator..
			if (isOperator(token)) {
				// While there's an operator on top of the stack with greater precedence
				if (stack.length !== 0) {
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
				continue;
			}
	
			// If it's a left bracket, push it to the stack
			if (isLeftBracket(token)) {
				stack.push(token);
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
			}
	
		}
		while (stack.length > 0) {
			// Pop operators from stack on to output
			const movedToken = stack.pop() as string;
			output.push(movedToken);
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

	return {parseInfix}
}


export default shuntingYard