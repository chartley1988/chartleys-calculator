import { useState } from 'react';
import '../css/editor.css';
import TextareaAutosize from 'react-textarea-autosize';

function EditorLine(props) {
	const { lineNumber, value } = props;
	console.log(value);

	const input = (
		<TextareaAutosize
			aria-label='textInput'
			value= {value}
			className='editor-input-line'
			id={lineNumber}
			type='text'
			onChange={getInputValue}
			data-testid="testEditorLine"
		></TextareaAutosize>
    );
    
    function getInputValue() {
      const lineText = document.getElementById(lineNumber).value;
      return lineText;
    }



	return (
		<div>
			<div className='editor-line-flex'>
				<p className='editor-line-number'>{lineNumber}</p>
				{input}
			</div>
			<hr></hr>
		</div>
	);
}

export default EditorLine;
