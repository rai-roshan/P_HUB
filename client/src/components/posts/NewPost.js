import { Container, Typography , makeStyles, TextField, Button } from '@material-ui/core';
import TextEditor from './Editor';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import PreviewPost from './PreviewPost';


const useStyles = makeStyles({
    mb2 : {
        marginBottom : "2rem"
    }
});

export default () => {

    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            Title : '',
            Tags : '',
        },
        validationSchema : Yup.object({
            Title : Yup.string()
            .required('Required'),
            Tags : Yup.string()
            .required('Required')
        }),
        onSubmit : values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return <Container maxWidth="md">
        <Typography variant="h3" className={ classes.mb2 } >
            New Post
        </Typography>
        <form onSubmit={ formik.handleSubmit }>
        <TextField
            id="Title"
            label="Title"
            value={formik.values.Title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.Title ? formik.errors.Title : ""}
            error={formik.touched.Title && Boolean(formik.errors.Title)}
            margin="dense"
            variant="outlined"
            fullWidth />

        <TextField
            id="Tags"
            label="enter tags with , seperated"
            value={formik.values.Tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.Tags ? formik.errors.Tags : ""}
            error={formik.touched.Tags && Boolean(formik.errors.Tags)}
            margin="dense"
            variant="outlined"
            fullWidth />

        <TextEditor />
        
        <Button type="submit" variant="contained" color="primary">
            create
        </Button>
        </form>
    </Container>
};