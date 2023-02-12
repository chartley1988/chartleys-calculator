import { useState } from 'react';
import '../css/editor.css';
import TextareaAutosize from 'react-textarea-autosize';

function LineInput(props) {
	const { lineNumber, onChange, styleProp, onClickLine } = props;

	return (
		<TextareaAutosize
			aria-label='textInput'
			className='editor-input-line'
			id={`input-${lineNumber}`}
			type='text'
			onChange={onChange}
            onClick={() => {
                onClickLine(lineNumber)
            }}
			data-testid="testEditorLine"
            style={styleProp}
		></TextareaAutosize>
	);
}

export default LineInput;
