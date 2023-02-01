import { test, expect } from 'vitest';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditorLine from '../components/EditorLine';

describe('String parser', () => {

	function getInputValue (testString: string): string {
		
		if(testString === undefined) return ""
		
		const { getByRole } = render(
			<EditorLine
				value={testString}
				data-testid='testEditorLine'
			></EditorLine>
		);
	
		const input = getByRole('textbox', {
			name: 'textInput',
		}) as HTMLTextAreaElement;

		return input.value;
	}

	function splitString (inputString: string): string[] {
	const splitSpaces = inputString.split(/[\s]|(?=[*/+-])|(?<=[*/+-])/g);
		const removeEmpties = splitSpaces.filter(entry => entry !== "");
		return removeEmpties;
	}

	test('Does getInputValue return string', () => {
		expect(getInputValue('Carson Hartley')).toEqual('Carson Hartley');
	});

	test('Does getInputValue return numbers as string', () => {
		expect('1 + 1').toEqual('1 + 1');
	});

	test('Split string at spaces', () => {
		const testString: string = getInputValue('Carson Hartley');
		expect(splitString(testString)). toEqual([
			'Carson',
			'Hartley'
		])
	});

	test('Split string at spaces, remove extra spaces', () => {
		const testString: string = getInputValue('Carson     Hartley');
		expect(splitString(testString)). toEqual([
			'Carson',
			'Hartley'
		])
	});

	test('Mix numbers and spaces', () => {
		const testString: string = getInputValue('1  + 2');
		expect(splitString(testString)). toEqual([
			'1',
			'+',
			'2'
		])
	});

	test('Split at operators, but include operators', () => {
		const testString: string = getInputValue('Carson+   Hartley');
		expect(splitString(testString)). toEqual([
			'Carson',
			'+',
			'Hartley'
		])
	});

	test('Split at operators, but include operators', () => {
		const testString: string = getInputValue('Carson+ Hartley - 5 +    3');
		expect(splitString(testString)). toEqual([
			'Carson',
			'+',
			'Hartley',
			'-',
			'5',
			'+',
			'3'
		])
	});

	test('Split string at spaces 2', () => {
		expect('Carsons and Leahs and Melbas'.split(' ')).toEqual([
			'Carsons',
			'and',
			'Leahs',
			'and',
			'Melbas',
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
