function splitString(
	inputString: string,
	results: number[],
	current_line: number
): string[] {
	const splitTokens: any = inputString.match(
		/\bLine\d*\b|([\^*/+-])|([\\(\\)])|\d*\.?\d*/g
	);

	// Maps any 'Line#' values to their values in result array
	const references = splitTokens.map((token) => {
		if (token.match(/\bLine\d*\b/g)) {
			const lineNumber = token.slice(4);

			// Makes sure that a line greater than the array isn't being referenced, or one that is the same as the line being queried.
			if (
				lineNumber >= results.length ||
				String(current_line) === String(lineNumber)
			) {
				return '';
			}

			return String(results[lineNumber - 1]);
		} else {
			return token;
		}
	});

	// Removes any empty entries
	const removeEmpties = references.filter((entry) => entry !== '');
	
	// Removes any entry that says 'Line' with no number
	const removeEmptyLineReference = removeEmpties.filter(
		(entry) => entry !== 'Line'
	);

	// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
	const addMultipliers = checkBracketMultiply(removeEmptyLineReference);

	// Looks for numbers written to be negative values
	const negatives = checkForNegatives(addMultipliers);

	// Removes trailing operators at the end of equation. Gets rid of NaN while typing
	const removeExtraOps = removeExtraOperators(negatives);

	return removeExtraOps;
}

function checkForNegatives(tokenArray: string[]) {
	const arrayCopy = tokenArray.slice();
	for (let i = 1; i < arrayCopy.length; i++) {
		const token = arrayCopy[i];
		const previousToken = arrayCopy[i - 1];

		// Logic for '-(x * y)', splices in [-1] and [*] where a '-' precedes a bracket
		if (ifSubtractOperator(previousToken) && ifLeftBracket(token)) {
			const approachToken = arrayCopy[i - 2];
			if (ifOperator(approachToken) || i === 1) {
				arrayCopy[i - 1] = String(-Math.abs(1));
				arrayCopy.splice(i, 0, '*');
				console.log(arrayCopy);
				continue;
			}
		}

		if (ifSubtractOperator(previousToken) && ifNumber(token)) {
			const approachToken = arrayCopy[i - 2];
			if (
				ifOperator(approachToken) ||
				ifLeftBracket(approachToken) ||
				i - 1 === 0
			) {
				arrayCopy[i] = String(-Math.abs(Number(token)));
				arrayCopy.splice(i - 1, 1);
				continue;
			}
		}
	}
	return arrayCopy;
}

// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
function checkBracketMultiply(tokenArray: string[]) {
	const arrayCopy = tokenArray.slice();
	for (let i = 1; i < arrayCopy.length; i++) {
		const token = arrayCopy[i];
		const previousToken = arrayCopy[i - 1];

		if (ifLeftBracket(token)) {
			if (ifNumber(previousToken) || ifRightBracket(previousToken)) {
				arrayCopy.splice(i, 0, '*');
				continue;
			}
		}

		if (ifRightBracket(token)) {
			if (i < arrayCopy.length - 1) {
				const nextToken = arrayCopy[i + 1];
				if (ifNumber(nextToken) || ifLeftBracket(nextToken)) {
					arrayCopy.splice(i + 1, 0, '*');
					continue;
				}
			}
		}
	}
	return arrayCopy;
}

// Ignores any extra operators at end of equation. Helps eliminate annoying NaN results while inputting equation
function removeExtraOperators(tokenArray: string[]) {
	const arrayCopy = tokenArray.slice();
	if (arrayCopy.length > 1) {
		while (ifOperator(arrayCopy[arrayCopy.length - 1])) {
			arrayCopy.pop();
		}
	}
	return arrayCopy;
}

function ifLeftBracket(token) {
	if (/[\\(]/.test(token)) {
		return true;
	}
}

function ifRightBracket(token) {
	if (/[\\)]/.test(token)) {
		return true;
	}
}

function ifNumber(token) {
	if (/[\d*\.?\d*]/.test(token) && /[^\^*/+-]/.test(token)) {
		return true;
	}
}

function ifOperator(token) {
	if (/[\^*/+-]/.test(token) && !/[0-9]/.test(token)) {
		return true;
	}
}

function ifSubtractOperator(token) {
	if (/[-]/.test(token)) {
		return true;
	}
}

export default splitString;
