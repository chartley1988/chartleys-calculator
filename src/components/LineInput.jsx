import { useState } from 'react';
import '../css/editor.css';
import TextareaAutosize from 'react-textarea-autosize';

function LineInput(props) {
	const { lineNumber, onChange } = props;
	const [ inputString, setInputString ] = useState("");



	return (
		<TextareaAutosize
			aria-label='textInput'
			className='editor-input-line'
			id={`input-${lineNumber}`}
			type='text'
			onChange={onChange}
			data-testid="testEditorLine"
		></TextareaAutosize>
	);
}

export default LineInput;
