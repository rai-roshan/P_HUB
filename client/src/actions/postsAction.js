import axios from 'axios';
import Cookies from 'js-cookie';
import {FETCH_POSTS,
    CREATE_POST,
    FETCH_POST,
    UPDATE_POST,
    DELETE_POST, SHOW_ALERT} from './actionTypes';
  

const ROOT_URL = "/api/posts";

export function fetchPosts() {

    return function(dispatch) {
      axios.get(`${ROOT_URL}`)
      .then((response) => {
        dispatch({
          type: FETCH_POSTS,
          payload: response.data,
          loading: false
        });
      })
      .catch(err=>{
        dispatch({ type: SHOW_ALERT, payload: err.response.data.message , alertType: "error"});
      });
    }
  }
  
  export function createPost({ title, categories, content }, setSubmitting) {
    //console.log(title, categories, content);
    return function(dispatch) {
      axios.post(`${ROOT_URL}`, {
        title,
        categories,
        content,
      }, {
        headers: {'x-access-token' : Cookies.get('token') }  // require auth
      })
        .then((response) => {  // If create post succeed, navigate to the post detail page
          dispatch({
            type: CREATE_POST,
            payload: response.data,
          });
          setSubmitting(false);
          dispatch({ 
            type: SHOW_ALERT, 
            payload: "Post Created Succesfully",  
            alertType: "success" });
        })
        .catch( err => {  // If create post failed, alert failure message
            //console.log(response.message);
            dispatch({ type: SHOW_ALERT, payload: err.response.data.message , alertType: "error"});
        });
    }
  }
  
  export function fetchPost(id) {
  
    return function(dispatch) {
      axios.get(`${ROOT_URL}/full/${id}`)
      .then(response => {
        // console.log(response);
        dispatch({
          type: FETCH_POST,
          payload: response.data,
        });
      })
      .catch(err=>{
        dispatch({ type: SHOW_ALERT, payload: err.response.data.message , alertType: "error"});
      });
    }
  }
  
  export function updatePost({ _id, title, categories, content }, onEditSuccess, historyReplace) {
  
    return function(dispatch) {
      axios.put(`${ROOT_URL}/${_id}`, {
        _id,
        title,
        categories,
        content,
      }, {
        headers: {'x-access-token' : Cookies.get('token') }  // require auth
      })
        .then((response) => {
          dispatch({
            type: UPDATE_POST,
            payload: response.data,
          });
          onEditSuccess();  // set beingEdit to false
          historyReplace(`/${_id}`, null);
        })
        .catch(({response}) => {
          historyReplace(`/${_id}`, {
            time: new Date().toLocaleString(),
            message: response.data.message,
          });
        });
    }
  }
  
  export function deletePost(id, historyPush) {
  
    return function(dispatch) {
      axios.delete(`${ROOT_URL}/${id}`, {
        headers: {'x-access-token' : Cookies.get('token') }  // require auth
      }).then((response) => {
        dispatch({
          type: DELETE_POST,
          payload: id,
        });
        historyPush('');
      })
    }
  }
  
  export function fetchPostsByUserId() {
  
    return function(dispatch) {
      axios.get(`${ROOT_URL}/my_posts`, {
        headers: {'x-access-token' : Cookies.get('token') }  // require auth
      })
        .then((response) => {
          dispatch({
            type: FETCH_POSTS,
            payload: response.data,
          });
        })
        .catch(err=>{
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          dispatch({ type: SHOW_ALERT, payload: err.response.data.message, alertType : "error" });
        });
    }
  }
  