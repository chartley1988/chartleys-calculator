import { useState } from 'react';
import '../css/editor.css';
import '../css/result.css';
import LineInput from './LineInput';
import splitString from '../math/string_parse';
import shuntingYard from '../math/shunting_yard';
import operateRPN from '../math/operate_RPN';

function EditorLine(props) {
	const { lineNumber, value } = props;
	const  [ result, setResult ]  = useState('');

	function getInputValue() {
		const lineText = document.getElementById(`input-${lineNumber}`).value;
		console.log(lineText);
		return lineText;
	}

	function calculateResult() {
		const input = getInputValue();
		const tokens = splitString(input);
		const rpn = shuntingYard().parseInfix(tokens);
		const result = operateRPN(rpn);
		setResult(result);
	}

	return (
		<li id={`line-${lineNumber}`}>
			<div className='editor-line-flex'>
				<div className='input-container'>
					<p className='editor-line-number'>{lineNumber}</p>
					<LineInput
						lineNumber={lineNumber}
						onChange={calculateResult}
					/>
				</div>
				<div className='Result'>{result}</div>
			</div>
			<hr></hr>
		</li>
	);
}

export default EditorLine;
