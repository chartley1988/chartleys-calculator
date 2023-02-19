import { useRef } from 'react';
import '../css/editor.css';
import TextareaAutosize from 'react-textarea-autosize';

function LineInput(props) {
	const {
		lineNumber,
		onChange,
		styleProp,
		onClickLine,
		updateCaretPosition,
	} = props;
	const element = useRef(null);

	return (
		<TextareaAutosize
			ref={element}
			aria-label='textInput'
			className='editor-input-line'
			id={`input-${lineNumber}`}
			type='text'
			onChange={() => {
				onChange();
				updateCaretPosition(lineNumber, element.current.selectionStart);
			}}
			onClick={() => {
				updateCaretPosition(lineNumber, element.current.selectionStart);
				onClickLine(lineNumber);
			}}
			data-testid='testEditorLine'
			style={styleProp}
		></TextareaAutosize>
	);
}

export default LineInput;
