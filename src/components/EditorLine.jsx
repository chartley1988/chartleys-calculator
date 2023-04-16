import '../css/editor.css';
import '../css/result.css';
import LineInput from './LineInput';
import { useDataContext } from './DataContext';
import { useRef } from 'react';
import useOnClickOutside from '../custom_hooks/UseOnClickOutside';

function EditorLine(props) {
	const {
		lineNumber,
		value,
		selected,
		onSelectLine,
		clearLineSelection,
		updateCaretPosition,
		referenceLineNumber,
	} = props;
	const context = useDataContext();
	
	// Used to detect click outside of line, for deselecting line.
	const ref = useRef();
	useOnClickOutside(ref, () => {
		clearLineSelection();
	});

	function getInputValue() {
		const lineText = document.getElementById(`input-${lineNumber}`).value;
		return lineText;
	}

	function onClickLine(line_number) {
		const updatedData = context.data.slice();

		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);

		// Unselects all lines, then selects the current one
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
								? 'rgb(var(--accent-2),0.3)'
								: 'rgb(var(--accent-2),0.15)',
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
						updateCaretPosition={updateCaretPosition}
						onChange={() => {
							context.calculateResult(getInputValue(), lineNumber);
							context.calculateAllResults();
						}}
						onClickLine={onClickLine}
						styleProp={{
							backgroundColor: selected
								? 'rgb(var(--accent-2),0.1)'
								: 'var(--bg-color)',
						}}
					/>
				</div>
				<div className='Result' onClick={()=>{
					referenceLineNumber(lineNumber)
					context.calculateAllResults();
				}}>{value}</div>
			</div>
			<hr></hr>
		</li>
	);
}

export default EditorLine;
