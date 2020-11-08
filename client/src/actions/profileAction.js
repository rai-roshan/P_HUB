import {FETCH_PROFILE,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    AUTH_USER} from './actionTypes';
import { SHOW_ALERT } from './actionTypes';
import axios from 'axios';
import Cookies from 'js-cookie';

export function fetchProfile() {
    //console.log("user data  fetch");
    //console.log("token : ",Cookies.get('token'));
    return function(dispatch) {
      axios.get(`/api/profile`, {
        headers: {'x-access-token': Cookies.get('token') }
      }).then(response => {
        console.log("user data:" , response.data);
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data,
        });
      });
    }
  }
  
  export function clearProfile() {
    return { type: CLEAR_PROFILE };
  }
  
  export function updateProfile({ firstName, lastName, birthday, sex, phone, address, occupation, description }, history, setSubmitting) {
  console.log("update profile action");
    return function(dispatch) {
      axios.post(`/api/profile`, {  // req.body (2nd parameter)
          firstName,
          lastName,
          birthday,
          sex,
          phone,
          address,
          occupation,
          description,
        }, {  // header (3rd parameter)
            headers: {'x-access-token': Cookies.get('token') }  // require auth
        }
      )
        .then((response) => {  // Update profile success
          // - Update profile
          dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.user,
          });
          // - Update username for header
          dispatch({
            type: AUTH_USER,
            payload: response.data.user.firstName + ' ' + response.data.user.lastName,
          });
          // - history.replace
          dispatch({ type: SHOW_ALERT, payload: "profile updated succesfully", alertType: "success" });
          setSubmitting(false);
          //history.push("/profile/my");
        })
        .catch(err => { // Update profile failed
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            
            dispatch({ type: SHOW_ALERT, payload: err.response.data.message , alertType: "error"});
        });
    }
  }
  