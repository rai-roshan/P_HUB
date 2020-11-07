import { useEffect } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Paper, Box, Button , TextField , Typography , makeStyles, Container } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchProfile, clearProfile, updateProfile } from '../../actions/profileAction';

const useStyles = makeStyles({
    root : {
        minHeight : "80vh",
        padding: "1rem 0"
    },
    title : {
        fontWeight : "500",
        margin : "1rem 0"
    },
    mb1 : {
        marginBottom : "1rem"
    }
});

const UpdateForm = () => {

    const classes = useStyles();
    const {user} = useSelector(state=>state.profileReducer); 
    const dispatch = useDispatch();
    const history = useHistory();

    //if(!user)
    //dispatch(fetchProfile());
    
    //console.log("user : ", user);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues : {
            birthday: user ? user.birthday ? user.birthday : "" : "",
            sex: user ? user.sex ? user.sex : "" : "",
            phone: user ? user.phone ? user.phone : "" : "",
            address: user ? user.address ? user.address : "" : "",
            occupation: user ? user.occupation ? user.occupation : "" : "",
            description: user ? user.description ? user.description : "" : "",
            email: user ? user.email ? user.email : "" : "",
            firstName: user ? user.firstName ? user.firstName : "" : "",
            lastName: user ? user.lastName ? user.lastName : "" : "",
        },
        validationSchema : Yup.object().shape({
            email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
            lastName: Yup.string()
            .required("Enter your Last Name"),
            firstName: Yup.string()
            .required("Enter your First Name"),
            birthday: Yup.date(),
            description: Yup.string(),
            occupation: Yup.string(),
            address: Yup.string(),
            phone: Yup.number(),
            sex : Yup.string(),
        }),
        onSubmit : (values, { setSubmitting }) => {
            dispatch(updateProfile(values,history,setSubmitting));
            /*setTimeout(() => {
                // submit to the server
                
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 1000);*/
        }
    });

    useEffect(()=>{
        console.log("fetch user data",user);
        //if(!user)
        dispatch(fetchProfile());
        
        return ()=>{
            dispatch(clearProfile());
        }
    },[]);

    return <Container maxWidth="md">
        
        <Paper elevation={3} className={classes.root}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className={classes.root}>
            
            <Typography variant="h4" className={classes.title}>
                Update Profile
            </Typography>
            
            <Container maxWidth="xs">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                id="firstName"
                label="First Name"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.firstName ? formik.errors.firstName : ""}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="lastName"
                label="Last Name"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.lastName ? formik.errors.lastName : ""}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email ? formik.errors.email : ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="sex"
                label="Sex"
                type="sex"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.sex ? formik.errors.sex : ""}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="birthday"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.birthday ? formik.errors.birthday : ""}
                error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="description"
                label="Description"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.description ? formik.errors.description : ""}
                error={formik.touched.description && Boolean(formik.errors.description)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="occupation"
                label="Occupation"
                type="occupation"
                value={formik.values.occupation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.occupation ? formik.errors.occupation : ""}
                error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="phone"
                label="Phone"
                type="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.phone ? formik.errors.phone : ""}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                margin="dense"
                variant="outlined"
                fullWidth
                />
                <TextField
                id="address"
                label="Address"
                type="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.address ? formik.errors.address : ""}
                error={formik.touched.address && Boolean(formik.errors.address)}
                margin="dense"
                variant="outlined"
                fullWidth
                />

                <Button type="submit" color="primary" variant="contained" fullWidth className={classes.mb1}>
                    update
                </Button>
                <Link to="/profile/my">
                <Button type="submit" color="secondary" variant="contained" fullWidth className={classes.mb1}>
                    go back
                </Button>
                </Link>
            </form>
            </Container>
        </Box>
        </Paper>
        
    </Container>
};

export default UpdateForm;