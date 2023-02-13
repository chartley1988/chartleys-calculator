import { useState, useEffect } from 'react';
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

	const [sum, setSum ] = useState(0);

	useEffect(() => {
		calculateSum();
	  }, [data]);

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

	function calculateSum() {
		let sum = 0;
		data.forEach(entry => {
			const value = Number(entry.output_string);
			sum += value;
		})
		console.log(sum);
		setSum(sum);
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

	function clearLineSelection() {
		const updatedData = data.slice();
		updatedData.forEach((entry) => {
			entry.selected = false;
		});
		setLineSelected(false);
		setCurrentLine(0);
	}

	function renderFooter() {
		if (lineSelected) {
			return (
				<FooterSelected
					moveLineUp={moveLineUp}
					moveLineDown={moveLineDown}
					currentLine={currentLine}
					sum={sum}
				/>
			);
		} else {
			return <Footer clearSheet={clearSheet} addLine={addLine} sum={sum} />;
		}
	}

	function clearSheet() {
		const updatedData = [
			{
				line_number: 1,
				input_string: '',
				output_string: '',
				selected: false,
			},
		]
		setData(updatedData);
		updateLineInputs(updatedData);
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
		const inputs = document.getElementsByClassName('editor-input-line');
		const inputsArray = Array.from(inputs);
		inputsArray.forEach(entry => {
			const index = inputsArray.indexOf(entry);
			entry.value = input_data[index].input_string
		})
	}

	return (
		<div onClickCapture={clearLineSelection}>
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
