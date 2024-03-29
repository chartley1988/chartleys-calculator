import { test, expect } from 'vitest';
import operators from '../math/operators';
import splitString from '../math/string_parse';

describe('String parser', () => {
	test('Does getInputValue return numbers as string', () => {
		expect('1 + 1').toEqual('1 + 1');
	});

	test('Split string at spaces, and omit words', () => {
		const testString: string = 'Carson Hartley';
		expect(splitString(testString,[1],0)).toEqual([]);
	});

	test('Split string at spaces, remove extra spaces', () => {
		const testString: string = 'Carson     Hartley';
		expect(splitString(testString,[1],0)).toEqual([]);
	});

	test('Mix numbers and spaces', () => {
		const testString: string = '1  + 2';
		expect(splitString(testString,[1],0)).toEqual(['1', '+', '2']);
	});

	test('Split at operators, but include operators, exclude words', () => {
		const testString: string = 'Carson+   Hartley';
		expect(splitString(testString,[1],0)).toEqual(['+']);
	});

	test('Split at operators, exclude words, but include operators', () => {
		const testString: string = 'Carson+ Hartley - 5 +    3';
		expect(splitString(testString,[1],0)).toEqual([
			'+',
			'-5',
			'+',
			'3',
		]);
	});

	test('Split at parenthesis and exponents', () => {
		const testString: string = `(5+6^3)`;
		expect(splitString(testString,[1],0)).toEqual([
			'(',
			'5',
			'+',
			'6',
			'^',
			'3',
			')',
		]);
	});

	test('Split at nested parenthesis, and account for inferred multipliers', () => {
		const testString: string = `5+(4(9*3))`;
		expect(splitString(testString,[1],0)).toEqual([
			'5',
			'+',
			'(',
			'4',
			'*',
			'(',
			'9',
			'*',
			'3',
			')',
			')',
		]);
	});
});

describe('Addition', () => {
	test('Add A + B', () => {
		expect(operators().addNumbers(1, 3)).toEqual(4);
	});

	test('Add A + (-B)', () => {
		expect(operators().addNumbers(1, -3)).toEqual(-2);
	});

	test('Add (-A) + (-B)', () => {
		expect(operators().addNumbers(-11, -3)).toEqual(-14);
	});
});

describe('Subtraction', () => {
	test('Sub A - B', () => {
		expect(operators().subtractNumbers(5, 3)).toEqual(2);
	});

	test('Sub A - (-B)', () => {
		expect(operators().subtractNumbers(1, -3)).toEqual(4);
	});

	test('Sub (A) - (B) where A is smaller than B', () => {
		expect(operators().subtractNumbers(3, 6)).toEqual(-3);
	});
});

describe('Multiply', () => {
	test('Multiply A * B', () => {
		expect(operators().multiplyNumbers(8, 12)).toEqual(96);
	});

	test('Multiply A + (-B)', () => {
		expect(operators().multiplyNumbers(1, -3)).toEqual(-3);
	});

	test('Multiply (-A) + (-B)', () => {
		expect(operators().multiplyNumbers(-11, -3)).toEqual(33);
	});
});

describe('Divide', () => {
	test('Divide A / B', () => {
		expect(operators().divideNumbers(8, 16)).toEqual(0.5);
	});

	test('Divide A / (-B)', () => {
		expect(operators().divideNumbers(-10, 5)).toEqual(-2);
	});

	test('Divide (-A) / (B)', () => {
		expect(operators().divideNumbers(-9, -3)).toEqual(3);
	});

	test('Divide by Zero', () => {
		expect(operators().divideNumbers(10, 0)).toEqual(
			'Error! Divide by Zero'
		);
	});
});
