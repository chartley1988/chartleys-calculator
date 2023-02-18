import { useState, useEffect } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';
import splitString from '../math/string_parse';
import shuntingYard from '../math/shunting_yard';
import operateRPN from '../math/operate_RPN';
import Footer from './Footer';
import FooterSelected from './FooterSelected';
import { useDataContext } from './DataContext';

function Editor() {
	const dataContext = useDataContext();

	const [lineSelected, setLineSelected] = useState(false);

	const [currentLine, setCurrentLine] = useState(0);

	useEffect(() => {
		if(dataContext.data) {
			updateLineInputs(dataContext.data);
		}
	}, [dataContext.data])


	useEffect(() => {
		const storedData = localStorage.getItem('userData');
		
		if(storedData) {
			dataContext.setData(JSON.parse(storedData));
		}
	}, []);


	function calculateResult(input, line_number) {

		const updatedData = dataContext.data.slice();
		const tokens = splitString(input);
		const rpn = shuntingYard().parseInfix(tokens);
		const result = operateRPN(rpn);
		const entry = updatedData.find(
			(entry) => entry.line_number === line_number
		);
		entry.input_string = input;
		entry.output_string = result;

		
		dataContext.updateStorage(updatedData);
		dataContext.setData(updatedData);
	}

	function onClickLine(line_number) {
		const updatedData = dataContext.data.slice();

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
		dataContext.setData(updatedData);
	}

	function clearLineSelection() {
		const updatedData = dataContext.data.slice();
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
					currentLine={currentLine}
					setCurrentLine={setCurrentLine}
					updateLineInputs={updateLineInputs}
				/>
			);
		} else {
			return (
				<Footer />
			);
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

	return (
		<div
			onClick={(event) => {
				event.stopPropagation();
				clearLineSelection();
			}}
		>
			<ul className='Editor'>
				{dataContext.data.map((entry) => {
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
