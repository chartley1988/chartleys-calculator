import { useState } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';
import splitString from '../math/string_parse';
import shuntingYard from '../math/shunting_yard';
import operateRPN from '../math/operate_RPN';
import Footer from './Footer';
import FooterSelected from './FooterSelected';

function Editor() {


	const [data, setData] = useState([
		{
			line_number: 1,
			input_string: '',
			output_string: '',
			selected: false,
		},
		{
			line_number: 2,
			input_string: '',
			output_string: '',
			selected: false,
		},
		{
			line_number: 3,
			input_string: '',
			output_string: '',
			selected: false,
		},
	]);

	const [lineSelected, setLineSelected] = useState(false);
	const [currentLine, setCurrentLine] = useState(0);

	function calculateResult(input, line_number) {
		const updatedData = data.slice();
		const tokens = splitString(input);
		const rpn = shuntingYard().parseInfix(tokens);
		const result = operateRPN(rpn);
		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);
		entry.input_string = input;
		entry.output_string = result;
		setData(updatedData);
	}

	function onClickLine(line_number) {
		const updatedData = data.slice();

		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);
		if (entry.selected === false) {
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			entry.selected = true;
			setLineSelected(true);
			setCurrentLine(line_number);
		} else {
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			entry.selected = false;
			setLineSelected(false);
			setCurrentLine(0);
		}
		setData(updatedData);
	}

	function clearLineSelection() {}

	function renderFooter() {
		if (lineSelected) {
			return (
				<FooterSelected
					moveLineUp={moveLineUp}
					moveLineDown={moveLineDown}
					currentLine={currentLine}
				/>
			);
		} else {
			return <Footer clearSheet={clearSheet} addLine={addLine} />;
		}
	}

	function clearSheet() {
		setData([
			{
				line_number: 1,
				input_string: '',
				output_string: '',
				selected: false,
			},
		]);
	}

	function addLine() {
		const updatedData = data.slice();
		const newLine = {
			line_number: data.length + 1,
			input_string: '',
			output_string: '',
			selected: false,
		};
		updatedData.push(newLine);
		setData(updatedData);
	}

	function moveLineUp(line_number) {
		if(line_number > 1) {
			const updatedData = data.slice();
			const entry = updatedData.find(
				(entry) => entry.line_number === line_number
			);
			const index = updatedData.indexOf(entry);
			const deleted = updatedData.splice(index, 1);
			updatedData.forEach(entry => {
				entry.selected = false
			})
			updatedData.splice((index-1), 0, {
				line_number: 1, // Temp, reset below
				input_string: deleted[0].input_string,
				output_string: deleted[0].output_string,
				selected: true,
			});
			setCurrentLine((index));
			updatedData.forEach(entry => {
				entry.line_number = (updatedData.indexOf(entry)+1)
			})
			setData(updatedData);
			updateLineInputs(updatedData);
		}
	}

	function moveLineDown(line_number) {
		if(line_number < data.length) {
			const updatedData = data.slice();
			const entry = updatedData.find(
				(entry) => entry.line_number === line_number
			);
			const index = updatedData.indexOf(entry);
			const deleted = updatedData.splice(index, 1);
			updatedData.forEach(entry => {
				entry.selected = false
			})
			updatedData.splice((index+1), 0, {
				line_number: 1, // Temp, reset below
				input_string: deleted[0].input_string,
				output_string: deleted[0].output_string,
				selected: true,
			});
			setCurrentLine((index+2));
			updatedData.forEach(entry => {
				entry.line_number = (updatedData.indexOf(entry)+1)
			})
			setData(updatedData);
			updateLineInputs(updatedData);
		}
	}

	function updateLineInputs(input_data) {
		//console.log(input_data)
		const inputs = document.getElementsByClassName('editor-input-line');
		const inputsArray = Array.from(inputs);
		inputsArray.forEach(entry => {
			const index = inputsArray.indexOf(entry);
			//console.log(input_data[index])
			entry.value = input_data[index].input_string
		})
	}

	return (
		<div onClick={clearLineSelection}>
			<ul className='Editor'>
				{data.map((entry) => {
					return (
						<EditorLine
							key={entry.line_number}
							lineNumber={entry.line_number}
							value={entry.output_string}
							calculateResult={calculateResult}
							selected={entry.selected}
							onClickLine={onClickLine}
						/>
					);
				})}
			</ul>
			{renderFooter()}
		</div>
	);
}

export default Editor;
