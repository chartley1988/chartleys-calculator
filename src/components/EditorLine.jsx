import { useState } from 'react';
import '../css/editor.css';
import '../css/result.css';
import LineInput from './LineInput';

function EditorLine(props) {
	const { lineNumber, value, calculateResult, selected, onClickLine } = props;

	function getInputValue() {
		const lineText = document.getElementById(`input-${lineNumber}`).value;
		return lineText;
	}

	return (
		<li id={`line-${lineNumber}`}>
			<div className='editor-line-flex'>
				<div className='input-container'>
					<p
						className='editor-line-number'
						style={{
							backgroundColor: selected
								? 'rgb(var(--accent-2),0.7)'
								: 'rgb(var(--accent-2),0.3)',
						}}
						onClick={() => {
							onClickLine(lineNumber);
						}}
					>
						{lineNumber}
					</p>
					<LineInput
						lineNumber={lineNumber}
						onChange={() => {
							calculateResult(getInputValue(), lineNumber);
						}}
						onClickLine={onClickLine}
						styleProp={{
							backgroundColor: selected
								? 'rgb(var(--accent-2),0.2)'
								: 'rgb(var(--accent-2),0.1)',
						}}
					/>
				</div>
				<div className='Result'>{value}</div>
			</div>
			<hr></hr>
		</li>
	);
}

export default EditorLine;
