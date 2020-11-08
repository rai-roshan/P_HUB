import {
    AUTH_USER,
    UNAUTH_USER,
  } from './actionTypes';
import { SHOW_ALERT } from './actionTypes';
import axios from 'axios';
import Cookies from 'js-cookie';

export function signinUser({ email, password }, history ,setSubmitting) {
console.log("email : ",email);
console.log("password : ",password);

return function(dispatch) {
    axios.post(`/api/auth/signin`, { email, password }) 
    .then(response => {  
        //localStorage.setItem('token', response.data.token);
        Cookies.set('token',response.data.token,{ expires: 1 });
        //console.log("res :", response.data);
        setSubmitting(false);
        dispatch({
        type: AUTH_USER,
        payload: response.data.username,
        });

        history.push('/posts');
        dispatch({ 
            type: SHOW_ALERT, 
            payload: "logedin succesfully", 
            alertType: "success" });
    })
    .catch( err => {  
        //console.log("error : ", err);
        setSubmitting(false);
        dispatch({ 
            type: SHOW_ALERT, 
            payload: err.response.data.message , 
            alertType: "error"});
    });
}
};

 
export function signoutUser() {

    Cookies.remove('token');
    return { type: UNAUTH_USER };
};

export function signupUser({ email, password, firstName, lastName }, history, setSubmitting) {

    return function(dispatch) {
      axios.post(`/api/auth/signup`, { email, password, firstName, lastName })  // axios returns a promise
        .then(response => {  // If request is good (sign up succeeded) ...
         //console.log("res :", response.data);
          // - Redirect (PUSH) to the route '/signin', then show a success message to the user
          setSubmitting(false);
          history.push('/signin');
          dispatch({ 
              type: SHOW_ALERT, 
              payload: "Signedup succesfully plz login now" , 
              alertType: "info"});
        })
        .catch(error=>{
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setSubmitting(false);
            dispatch({ 
                type: SHOW_ALERT,
                payload: error.response.data.message , 
                alertType: "error"});
        });
    }
  };

export function verifyAuth () {
    return (dispatch)=>{
        axios.get('/api/auth/verify_jwt',{ headers: {'x-access-token': Cookies.get('token') }} )
        .then(res=>{
            dispatch({
                type: AUTH_USER,
                payload: res.data.userName
            });
        })
        .catch(err=>{
            //console.log("error : ",err);
            dispatch({ 
                type: SHOW_ALERT, 
                payload: err.response.data.message , 
                alertType: "error"});
        });
    };
};