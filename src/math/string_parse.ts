function splitString(inputString: string): string[] {
	const splitTokens = inputString.match(
		(/([\^*/+-])|([\\(\\)])|\d*\.?\d*|/g)
	);
	const removeEmpties = splitTokens.filter((entry) => entry !== '');
	return removeEmpties;
}

export default splitString