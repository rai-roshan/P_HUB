import { Container, Typography , makeStyles, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditorState, convertToRaw } from 'draft-js';
import RichEditorExample from './Editor2';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/postsAction';
//import PreviewPost from './PreviewPost';


const useStyles = makeStyles({
    mb2 : {
        marginBottom : "2rem"
    }
});

export default () => {

    const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const classes = useStyles();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title : '',
            categories : '',
        },
        validationSchema : Yup.object({
            title : Yup.string()
            .required('Required'),
            categories : Yup.string()
            .required('Required')
        }),
        onSubmit : (values, { setSubmitting }) => {
            let RawDraftContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            let result = {
                ...values,
                content : RawDraftContentState
            }
            //alert(JSON.stringify(result, null, 2));
            dispatch( createPost(result, setSubmitting ) );
        }
    });


    return <Container maxWidth="md">
        <Typography variant="h3" className={ classes.mb2 } >
            New Post
        </Typography>
        <form onSubmit={ formik.handleSubmit }>
        <TextField
            id="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.title ? formik.errors.title : ""}
            error={formik.touched.title && Boolean(formik.errors.title)}
            margin="dense"
            variant="outlined"
            fullWidth />

        <TextField
            id="categories"
            label="enter categories with , seperated"
            value={formik.values.categories}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.categories ? formik.errors.categories : ""}
            error={formik.touched.categories && Boolean(formik.errors.categories)}
            margin="dense"
            variant="outlined"
            fullWidth />

        {/*<TextEditor 
        editorState={ editorState }
        setEditorState={ setEditorState }/>*/}

        <RichEditorExample 
        editorState={ editorState }
        setEditorState={ setEditorState }/>
        
        <Button type="submit" variant="contained" color="primary">
            create
        </Button>
        </form>
    </Container>
};