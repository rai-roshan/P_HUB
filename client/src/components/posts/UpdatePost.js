import { Container, Typography , makeStyles, TextField, Button, Box } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import RichEditorExample from './Editor2';
import {useState, useEffect } from 'react';
import { checkAuthority, updatePost } from '../../actions/postsAction';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { CHECK_AUTHORITY } from '../../actions/actionTypes';

import { fetchPost } from '../../actions/postsAction';

const useStyles = makeStyles({
    mb2 : {
        marginBottom : "2rem"
    },
    mx1 : {
        margin : "0.5rem 1rem"
    },
    mb1 : {
        marginBottom : "1rem"
    }
});

const UpdatePost = ( props ) => {

    
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { posts } = useSelector(store=>store.postsReducer);
    const { allowChange } = useSelector(store=>store.authReducer);
    let post = posts ? posts[props.match.params.id] : null;
    const [editorState,setEditorState] = useState(  EditorState.createEmpty() );


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title : post ? post.title : 'Loading ...',
            categories : post ? post.categories.toString() : 'Loading...',
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
                _id : post._id,
                ...values,
                content : RawDraftContentState
            }

            dispatch( updatePost(result, setSubmitting ) );
        }
    });

    useEffect(()=>{
        dispatch(checkAuthority( props.match.params.id ));
        
        if(!post)
        dispatch(fetchPost(props.match.params.id));

        return () => {
            dispatch({ type: CHECK_AUTHORITY , payload : null });
        }
    },[]);

    useEffect(()=>{
        if(post)
        setEditorState( EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))  );
    },[post])

    useEffect(()=>{
        if(allowChange===false)
        history.push("/");
    },[allowChange]);


    return <Container maxWidth="md">
        <Typography variant="h3" className={ classes.mb2 } >
            { post && allowChange ? "Update Post" : <Skeleton width="100%" /> }
        </Typography>
        <form onSubmit={ formik.handleSubmit }>
        { post && allowChange ? <TextField
            id="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.title ? formik.errors.title : ""}
            error={formik.touched.title && Boolean(formik.errors.title)}
            margin="dense"
            variant="outlined"
            fullWidth /> : <Skeleton variant="rect" width="100%" height="30px" className={classes.mb1} /> }
 
        { post && allowChange ? <TextField
            id="categories"
            label="enter categories with , seperated"
            value={formik.values.categories}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.categories ? formik.errors.categories : ""}
            error={formik.touched.categories && Boolean(formik.errors.categories)}
            margin="dense"
            variant="outlined"
            fullWidth /> : <Skeleton variant="rect" width="100%" height="30px" className={classes.mb1} /> }

        { post && allowChange ? <RichEditorExample 
        editorState={ editorState }
        setEditorState={ setEditorState }/> : <Skeleton variant="rect" width="100%" height="60vh" /> }
        
        <Box display="flex" justifyContent="center" flexWrap="wrap" mt="1rem" >
        <Button type="submit" variant="contained" color="primary" className={classes.mx1} >
        { post && allowChange ? "Update" : <Skeleton width="3rem" /> }
        </Button>
        <Link to="/posts/my">
        <Button variant="contained" color="secondary" className={classes.mx1} >
        { post && allowChange ? "My Posts" : <Skeleton width="3rem" /> }
        </Button>
        </Link>
        </Box>

        </form>
    </Container>
};

export default UpdatePost;