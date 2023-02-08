import { useState } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';

function Editor() {

	const [data, setData] = useState([
			{
				line_number: 1,
				input_string: "",
				output_string: ""
			},
			{
				line_number: 200,
				input_string: "",
				output_string: ""
			},
			{
				line_number: 3,
				input_string: "",
				output_string: ""
			}
		])

	return (
		<ul className='Editor'>
			{data.map(entry => {
				return <EditorLine key={entry.line_number} lineNumber={entry.line_number} />
			})}
		</ul>
	);
}

export default Editor;
