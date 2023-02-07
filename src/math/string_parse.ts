function splitString(inputString: string): string[] {
	const splitTokens = inputString.split(
		/[\s]|(?=[\^*/+-])|(?<=[\^*/+-])|(?<=[\\(\\)])|(?=[\\(\\)])/g
	);
	const removeEmpties = splitTokens.filter((entry) => entry !== '');
	return removeEmpties;
}

export default splitString