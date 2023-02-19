import { useState, useEffect } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';

import Footer from './Footer';
import FooterSelected from './FooterSelected';
import { useDataContext } from './DataContext';

function Editor() {
	const dataContext = useDataContext();
	const [lineSelected, setLineSelected] = useState(false);
	const [currentLine, setCurrentLine] = useState(0);

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
		setLineSelected(false);
		setCurrentLine(0);
	}

	function onSelectLine(bool, line_number) {
		setLineSelected(bool);
		setCurrentLine(line_number);
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

	return (
		<div>
			<ul className='Editor'>
				{dataContext.data.map((entry) => {
					return (
						<EditorLine
							key={entry.line_number}
							lineNumber={entry.line_number}
							value={entry.output_string}
							selected={entry.selected}
							onSelectLine={onSelectLine}
							clearLineSelection={clearLineSelection}
						/>
					);
				})}
			</ul>
			{renderFooter()}
		</div>
	);
}

export default Editor;
