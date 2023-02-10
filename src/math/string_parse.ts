function splitString(inputString: string): string[] {
	const splitTokens: any = inputString.match(
		(/\bCarson\b|\bHartley\b|([\^*/+-])|([\\(\\)])|\d*\.?\d*/g)
	);

	// Removes any empty entries from stack
	const removeEmpties = splitTokens.filter((entry) => entry !== '');
	
	// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
	const addMultipliers = checkBracketMultiply(removeEmpties);
	
	return removeEmpties;
}
function checkBracketMultiply (tokenArray: string[]) {
	// Adds multiply in cases such as '5(5*3)' or '(9*6)(2*3)'
	for (let i = 1; i < tokenArray.length; i++) {
		const token = tokenArray[i];
		const previousToken = tokenArray[i-1];

		if(ifLeftBracket(token)) {

			if((ifNumber(previousToken) || ifRightBracket(previousToken))) {
				console.log(previousToken);
				tokenArray.splice(i,0,'*');
				console.log(tokenArray)
				continue;
			}
		}

		if(ifRightBracket(token)) {
			if (i<(tokenArray.length - 1)) {
				const nextToken = tokenArray[i+1];
				if((ifNumber(nextToken) || ifLeftBracket(nextToken))) {
					console.log(nextToken);
					tokenArray.splice((i+1),0,'*');
					console.log(tokenArray)
					continue;
				}
			}
		}
		
	}
};

function ifLeftBracket (token) {
	if(/[\\(]/.test(token)) {
		return true;
	}
}

function ifRightBracket (token) {
	if(/[\\)]/.test(token)) {
		return true;
	}
}

function ifNumber (token) {
	if((/[\d*\.?\d*]/.test(token)) && (/[^\^*/+-]/).test(token)) {
		return true;
	}
}

function ifOperator (token) {
	if((/[\^*/+-]/).test(token)) {
		return true;
	}
}





export default splitString