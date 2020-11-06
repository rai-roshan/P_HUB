import {
    AUTH_USER,
    UNAUTH_USER,
    CHECK_AUTHORITY,
  } from './actionTypes';
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
        console.log("res :", response.data);
        setSubmitting(false);
        dispatch({
        type: AUTH_USER,
        payload: response.data.username,
        });

        history.push('/posts');
    })
    .catch( err => {  
        console.log("error : ", err);
        setSubmitting(false);
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
         console.log("res :", response.data);
          // - Redirect (PUSH) to the route '/signin', then show a success message to the user
          setSubmitting(false);
          history.push('/signin');
        })
        .catch(err=>{
            console.log("error : ", err);
            setSubmitting(false);
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
            console.log("error : ",err);
        });
    };
};