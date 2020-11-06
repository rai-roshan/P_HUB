import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginBottom: "0rem"
  }
});

export default ({ storedState }) => {

    const classes = useStyles();
    const contentState = convertFromRaw(storedState);
    const editorState = EditorState.createWithContent(contentState);
    
    return <Box className={classes.root}>
      <Editor 
      editorState={editorState} 
      readOnly={true} />
      </Box>
}
