import { TextField, Box, makeStyles, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/commentActions';

const useStyles = makeStyles({
    comment : {
        width : "100%",
        display : "flex",
        flexDirection : "column"
    },
    btn : {
        marginTop : "0.5rem",
        marginLeft : "auto"
    }
});

const CommentField = ({ postId }) => {

    const history = useHistory();
    const disptach = useDispatch();
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            comment : ""
        },
        validationSchema : Yup.object().shape({
            comment : Yup.string()
            .required("Comment can't be empty")
        }),
        onSubmit : (values, {setSubmitting, resetForm} )=>{
            //submit action
            let data = {
                postId : postId,
                comment : values.comment
            }
            disptach(createComment(data,resetForm,history, setSubmitting) );
        }
    });

    return <Box mt="1rem" display="flex" justifyContent="center">
        <form onSubmit={formik.handleSubmit} className={classes.comment} >
        <TextField 
        id="comment"
        label="Comments here"
        value={formik.values.comment}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={formik.touched.comment ? formik.errors.comment : "" } 
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        variant="outlined" 
        fullWidth 
        multiline
        rows={4} />

        <Button variant="contained" color="primary" className={classes.btn} type="submit" >
            Post Comment
        </Button> 
        </form>
    </Box>
};

export default CommentField;