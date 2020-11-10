import React, { useState } from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromRaw} from 'draft-js';


const RichEditorExample = ({ storedState }) => {

    const [editorState, setEditorState] = useState( EditorState.createWithContent(convertFromRaw(JSON.parse(storedState))) );

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="">
        <BlockStyleControls
          editorState={editorState}
        />
        
        <div className={className} >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            spellCheck={true}
          />
        </div>
      </div>
    );
  
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}


const BlockStyleControls = (props) => {


  return <div></div>
};


export default RichEditorExample;