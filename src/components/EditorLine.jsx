import '../css/editor.css';
import '../css/result.css';
import LineInput from './LineInput';
import splitString from '../math/string_parse';
import shuntingYard from '../math/shunting_yard';
import operateRPN from '../math/operate_RPN';
import { useDataContext } from './DataContext';
import { useEffect, useRef } from 'react';
import useOnClickOutside from '../custom_hooks/UseOnClickOutside';


function EditorLine(props) {
	const { lineNumber, value, selected, onSelectLine, clearLineSelection } = props;
	const context = useDataContext();
	
	// Used to detect click outside of line, for deselecting line.
	const ref = useRef(); 
	useOnClickOutside(ref, () => {
		clearLineSelection()
	})

	function getInputValue() {
		const lineText = document.getElementById(`input-${lineNumber}`).value;
		return lineText;
	}

	function calculateResult(input, line_number) {
		const updatedData = context.data.slice();
		const tokens = splitString(input);
		const rpn = shuntingYard().parseInfix(tokens);
		const result = operateRPN(rpn);
		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);
		entry.input_string = input;
		entry.output_string = result;
		context.updateData(updatedData);
	}

	function onClickLine(line_number) {
		const updatedData = context.data.slice();

		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);

		if (entry.selected === false) {
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			entry.selected = true;
			onSelectLine(true, lineNumber);
		} else {
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			entry.selected = false;
			onSelectLine(false, 0);
		}
		
		context.updateData(updatedData);
		
	}

	return (
		<li id={`line-${lineNumber}`} ref={ref}>
			<div className='editor-line-flex'>
				<div className='input-container'>
					<p
						className='editor-line-number'
						style={{
							backgroundColor: selected
								? 'rgb(var(--accent-2),0.7)'
								: 'rgb(var(--accent-2),0.3)',
						}}
						onClick={(event) => {
							event.stopPropagation();
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
