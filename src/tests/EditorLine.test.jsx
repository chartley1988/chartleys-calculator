import { test, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import EditorLine from '../components/EditorLine';


test('Split string at spaces 4', () => {
	const testMessage = '5 + 6';
	const { getByRole } = render(<EditorLine value={testMessage} data-testid="testEditorLine" ></EditorLine>);

	const input = getByRole('textbox', {name: "textInput"});
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


