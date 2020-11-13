import axios from 'axios';
import Cookies from 'js-cookie';
import {
    FETCH_POSTS,
    CREATE_POST,
    FETCH_POST,
    UPDATE_POST,
    DELETE_POST, 
    SHOW_ALERT, 
    LOADING_POSTS,
    CHECK_AUTHORITY } from './actionTypes';
  

const ROOT_URL = "/api/posts";

export function loadingPosts() {
  return {
    type : LOADING_POSTS
  }
};

export function fetchPosts() {

    return function(dispatch) {
      dispatch({ type: LOADING_POSTS });

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

  export function updatePost({ _id, title, categories, content }, setSubmitting) {
  
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
          setSubmitting(false);
          dispatch({ type: SHOW_ALERT, payload: "updated succesfully" , alertType : "success" });
        })
        .catch(({response}) => {
          dispatch({ 
            type: SHOW_ALERT, 
            payload : response.message, 
            alertType: "error" });
        });
    }
  }
  
  export function deletePost(id, history) {
  
    return function(dispatch) {
      axios.delete(`${ROOT_URL}/${id}`, {
        headers: {'x-access-token' : Cookies.get('token') }  // require auth
      }).then( res => {
        dispatch({
          type: DELETE_POST,
          payload: id,
        });
        dispatch({
          type: SHOW_ALERT,
          payload: res.data.message,
          alertType: "success"
        })
        history.push('/posts/my');
      })
      .catch(err=>{
        console.log("error: ",err);
        dispatch({
          type: SHOW_ALERT,
          payload: err.response.data.message,
          alertType: "error"
        });
      });
    }
  }
  
export function fetchPostsByUserId() {

  return function(dispatch) {
    dispatch({ type: LOADING_POSTS });

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
        dispatch({ type: SHOW_ALERT, 
          payload: err.response.data.message, 
          alertType : "error" });
      });
  }
};


export function checkAuthority(id) {

  return function(dispatch) {
    axios.get(`/api/posts/allow_edit_or_delete/${id}`, {
      headers: { 'x-access-token' : Cookies.get('token') },  // require auth
    }).then((response) => {
      dispatch({
        type: CHECK_AUTHORITY,
        payload: response.data.allowChange,
      });
    }).catch(() => {  // If an user is un-authorized, he/she cannot make change to any posts
      dispatch({
        type: CHECK_AUTHORITY,
        payload: false,
      })
    });
  }
}
  