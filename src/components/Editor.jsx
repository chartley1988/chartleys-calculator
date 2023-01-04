import { useState } from 'react';
import '../css/editor.css';
import EditorLine from './EditorLine';

function Editor() {
	const string = 'Carson';

	return (
		<div className='Editor'>
			<EditorLine lineNumber='01'></EditorLine>
			<EditorLine lineNumber='02'></EditorLine>
			<EditorLine lineNumber='03'></EditorLine>
			<EditorLine lineNumber='04'></EditorLine>
			<EditorLine lineNumber='05'></EditorLine>
			<EditorLine lineNumber='06'></EditorLine>
		</div>
	);
}

export default Editor;
