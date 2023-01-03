import { useState } from 'react'
import '../css/editor.css'
import TextareaAutosize from 'react-textarea-autosize';

function EditorLine (props) {
    const { lineNumber } = props;
    
    return (
      <div>
        <div className='editor-line-flex'>
            <p className='editor-line-number'>{lineNumber}</p>
            <TextareaAutosize  className='editor-input-line' type="text" wrap='hard'></TextareaAutosize>
        </div>
        <hr></hr>
      </div>  
    )
};

export default EditorLine