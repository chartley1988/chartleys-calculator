import { test, expect } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditorLine from '../components/EditorLine';

describe('String parser', () => {
	test('Split string at spaces 4', () => {
		const testMessage = '5 + 6';
		const { getByRole } = render(
			<EditorLine
				value={testMessage}
				data-testid='testEditorLine'
			></EditorLine>
		);

		interface EditorLineInput extends HTMLElement {
			value?: string;
		}

		const input: EditorLineInput = getByRole('textbox', {
			name: 'textInput',
		});
		console.log(input);

		expect(input.value).toEqual('5 + 6');
	});

	test('1+1', () => {
		expect(1 + 1).toEqual(2);
	});

	test('Split string at spaces 3', () => {
		expect('Carson Hartley'.split(' ')).toEqual(['Carson', 'Hartley']);
	});

	test('Split string at spaces 2', () => {
		expect('Carsons and Leah and Melba'.split(' ')).toEqual([
			'Carsons',
			'and',
			'Leah',
			'and',
			'Melba',
		]);
	});

	test('Split string at spaces 1', () => {
		expect('5 + 6 + 7'.split(' ')).toEqual(['5', '+', '6', '+', '7']);
	});
});

// Functions

function addNumbers(a: number, b: number): number {
	return a + b;
}

function subtractNumbers(a: number, b: number): number {
	return a - b;
}

function multiplyNumbers(a: number, b: number): number {
	return a * b;
}

function divideNumbers(a: number, b: number): number | string {
	if (b === 0) return 'Error! Divide by Zero';
	return a / b;
}

describe('Addition', () => {
	test('Add A + B', () => {
		expect(addNumbers(1, 3)).toEqual(4);
	});

	test('Add A + (-B)', () => {
		expect(addNumbers(1, -3)).toEqual(-2);
	});

	test('Add (-A) + (-B)', () => {
		expect(addNumbers(-11, -3)).toEqual(-14);
	});
});

describe('Subtraction', () => {
	test('Sub A - B', () => {
		expect(subtractNumbers(5, 3)).toEqual(2);
	});

	test('Sub A - (-B)', () => {
		expect(subtractNumbers(1, -3)).toEqual(4);
	});

	test('Sub (A) - (B) where A is smaller than B', () => {
		expect(subtractNumbers(3, 6)).toEqual(-3);
	});
});

describe('Multiply', () => {
	test('Multiply A * B', () => {
		expect(multiplyNumbers(8, 12)).toEqual(96);
	});

	test('Multiply A + (-B)', () => {
		expect(multiplyNumbers(1, -3)).toEqual(-3);
	});

	test('Multiply (-A) + (-B)', () => {
		expect(multiplyNumbers(-11, -3)).toEqual(33);
	});
});

describe('Divide', () => {
	test('Divide A / B', () => {
		expect(divideNumbers(8, 16)).toEqual(0.5);
	});

	test('Divide A / (-B)', () => {
		expect(divideNumbers(-10, 5)).toEqual(-2);
	});

	test('Divide (-A) / (B)', () => {
		expect(divideNumbers(-9, -3)).toEqual(3);
	});

	test('Divide by Zero', () => {
		expect(divideNumbers(10, 0)).toEqual('Error! Divide by Zero');
	});
});
