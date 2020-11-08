import React from "react";
import {Link , Redirect, useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signinUser } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

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
  formMargin : {
    margin: "1rem"
  },
  mlAuto: {
    marginLeft: "auto" 
  },
  mb3: {
      marginBottom: "9px"
  }
});

//===============COMPONENT=================================
const SIGNIN = props => {
  
  const classes = useStyles();
  const formik = useFormik({
    initialValues : {
      email: "",
      password: "",
    },
    validationSchema : Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Enter your password"),
    }),
    onSubmit : (values, { setSubmitting }) => {
      dispatch(signinUser(values, history, setSubmitting));
    }
  });
  
  const { authenticated } = useSelector(store=>store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  return authenticated ?  <Redirect to={{pathname: `/posts`, state: {from: props.location}}} /> : 
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit} className={classes.formMargin} >
        <Card className={classes.card}>
          <CardContent>
           
            <Typography variant="h3" className={classes.mb3}>LogIn</Typography>

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
            
          </CardContent>

          <CardActions >
            <Button color="secondary">
              <Link to="/signup">New here ?</Link>
            </Button>
            <Button 
            type="submit" 
            color="primary" 
            className={classes.mlAuto}
            disabled={formik.isSubmitting}>
              LogIn
            </Button>
            <Button color="secondary" onClick={formik.handleReset}>
              CLEAR
            </Button>
          </CardActions>

        </Card>
      </form>
    </div>
};


export default SIGNIN;