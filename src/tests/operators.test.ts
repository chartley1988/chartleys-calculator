import { test, expect } from 'vitest';
import operators from '../math/operators';

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
