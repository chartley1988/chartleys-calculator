function splitString(inputString: string): string[] {
	const splitTokens: any = inputString.match(
		/\bCarson\b|\bHartley\b|([\^*/+-])|([\\(\\)])|\d*\.?\d*/g
	);

	// Removes any empty entries from stack
	const removeEmpties = splitTokens.filter((entry) => entry !== '');

	// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
	const addMultipliers = checkBracketMultiply(removeEmpties);

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
		const nextToken = arrayCopy[i+1];

		if((ifSubtractOperator(previousToken) && (ifNumber(token)))) {
			const approachToken = arrayCopy[i-2];
			if(((ifOperator(approachToken)) || (ifLeftBracket(approachToken))) || (i-1 === 0)) {
				arrayCopy[i] = String(-Math.abs(Number(token)))
				arrayCopy.splice((i-1),1);
			}
		}
	}
	return arrayCopy
}

// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
function checkBracketMultiply(tokenArray: string[]) {
	const arrayCopy = tokenArray.slice();
	for (let i = 1; i < arrayCopy.length; i++) {
		const token = arrayCopy[i];
		const previousToken = arrayCopy[i - 1];

		if (ifLeftBracket(token)) {
			if (ifNumber(previousToken) || ifRightBracket(previousToken)) {
				console.log(previousToken);
				arrayCopy.splice(i, 0, '*');
				console.log(arrayCopy);
				continue;
			}
		}

		if (ifRightBracket(token)) {
			if (i < arrayCopy.length - 1) {
				const nextToken = arrayCopy[i + 1];
				if (ifNumber(nextToken) || ifLeftBracket(nextToken)) {
					console.log(nextToken);
					arrayCopy.splice(i + 1, 0, '*');
					console.log(arrayCopy);
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
	if(arrayCopy.length > 1){
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
	if ((/[\^*/+-]/.test(token)) && !(/[0-9]/.test(token))) {
		return true;
	}
}

function ifSubtractOperator(token) {
	if (/[-]/.test(token)) {
		return true;
	}
}

export default splitString;
