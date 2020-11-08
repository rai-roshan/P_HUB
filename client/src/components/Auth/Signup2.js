import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import {signupUser} from '../../actions/authActions';

const useStyles = makeStyles({
  card: {
    maxWidth: 420
  },
  container: {
    display: "Flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
  },
  formMargin: {
    margin: "1rem"
  },
  mlAuto: {
    marginLeft: "auto" 
  },
  mb3: {
      marginBottom: "9px"
  }
});


const SIGNUP = props => {
  const classes = useStyles();
  const { authenticated } = useSelector(store=>store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues : {
      firstName:  "",
    lastName:  "",
    email:  "",
    password:  "",
    confirmPassword: ""},
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
      confirmPassword: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("password")], "Password does not match")
    }),
  
    onSubmit: (values, { setSubmitting }) => {
      dispatch(signupUser(values, history, setSubmitting));
      /*
      setTimeout(() => {
        // submit to the server
        
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);*/
    }
  });
  

  return authenticated ?  <Redirect to={{pathname: `/posts`, state: {from: props.location}}} /> : 
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit} className={classes.formMargin}>
        <Card className={classes.card}>
          <CardContent>

            <Typography variant="h3" className={classes.mb3}>SignUp</Typography>


            <TextField
              id="firstName"
              label="First Name"
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
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password ? formik.errors.password : ""}
              error={formik.touched.password && Boolean(formik.errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button color="secondary">
              <Link to="/signin">Have account ?</Link>
            </Button>
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={formik.handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
};


export default SIGNUP;