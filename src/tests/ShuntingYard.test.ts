import { test, expect } from 'vitest';
import shuntingYard from '../math/shunting_yard';
import operateRPN from '../math/operate_RPN';
import splitString from '../math/string_parse';



// Test equations
const testTokens = splitString('5 + 2 * (2*3) + (2*99) - (3 * 4 * 2)^2', [1], 1);
const equationRPN = shuntingYard().parseInfix(testTokens);
operateRPN(equationRPN);

//
describe('Shunting Yard - Parses infix to postfix', () => {
	test('test config', () => {
		expect('5').toEqual('5');
	});


});
