import { useState, useEffect, useRef } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';
import Footer from './Footer';
import FooterSelected from './FooterSelected';
import { useDataContext } from './DataContext';
import { useUserContext } from './UserContext';

function Editor() {
	const dataContext = useDataContext();
	const UserContext = useUserContext();

	const [lineSelected, setLineSelected] = useState(false); // Line Number of highlighted line
	const [currentLine, setCurrentLine] = useState(0); // Line where caret is
	const [caret, setCaret] = useState([0, 0]); // Caret position within line

	useEffect(() => {
		if (dataContext.data) {
			updateLineInputs(dataContext.data);
		}
	}, [dataContext.data]);

	function clearLineSelection() {
		const updatedData = dataContext.data.slice();
		updatedData.forEach((entry) => {
			entry.selected = false;
		});
		dataContext.updateData(updatedData);
		setLineSelected(false);
		setCurrentLine(0);
	}

	function onSelectLine(bool, line_number) {
		setLineSelected(bool);
		setCurrentLine(line_number);
	}

	function updateCaretPosition(line, position) {
		setCaret([line, position]);
	}

	function placeCaretAtPosition(line_num, position) {
		const target = document.getElementById(`input-${line_num}`);
		target.focus();
		target.setSelectionRange(position, position);
		setCaret([line_num, position]);
	}

	function renderFooter() {
		if (lineSelected) {
			return (
				<FooterSelected
					currentLine={currentLine}
					setCurrentLine={setCurrentLine}
					updateLineInputs={updateLineInputs}
				/>
			);
		} else {
			return <Footer />;
		}
	}

	function updateLineInputs(input_data) {
		const inputs = document.getElementsByClassName('editor-input-line');
		const inputsArray = Array.from(inputs);
		inputsArray.forEach((entry) => {
			const index = inputsArray.indexOf(entry);
			entry.value = input_data[index].input_string;
		});
	}

	function spliceText(target, insertion, location) {
		const begin = target.slice(0, location);
		const end = target.slice(location);
		const splicedText = `${begin} ${insertion} ${end}`;
		return splicedText;
	}

	function referenceLineNumber(target) {
		if (caret[0] === 0) {
			return;
		}

		const updatedData = dataContext.data.slice();
		const entry = updatedData.find(
			(entry) => entry.line_number === caret[0]
		);

		if (caret[0] === target) {
			return;
		}

		console.log(entry);
		console.table(caret);
		const input = entry.input_string;
		const newText = spliceText(input, `Line${target}`, caret[1]);

		const element = document.getElementById(`input-${caret[0]}`);
		element.value = newText;

		entry.input_string = newText;
		dataContext.updateData(updatedData);

		const newPosition = caret[1] + `Line${target}`.length + 2;
		placeCaretAtPosition(caret[0], newPosition);
	}

	return (
		<>
			<ul className='Editor'>
				{dataContext.data.map((entry,index) => {
					return (
						<EditorLine
							key={entry.line_number}
							lineNumber={entry.line_number}
							value={entry.output_string}
							selected={entry.selected}
							onSelectLine={onSelectLine}
							clearLineSelection={clearLineSelection}
							updateLineInputs={updateLineInputs}
							referenceLineNumber={referenceLineNumber}
							updateCaretPosition={updateCaretPosition}
						/>
					);
				})}
			</ul>
			{renderFooter()}
		</>
	);
}

export default Editor;
