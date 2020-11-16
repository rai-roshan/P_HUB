import Cookies from 'js-cookie';
import { CREATE_COMMENT, FETCH_COMMENTS, SHOW_ALERT } from './actionTypes';
import axios from 'axios';

const ROOT_URL = '/api/comments';

export function createComment({ comment, postId }, resetForm, history, setSubmitting) {

    return function(dispatch) {
      axios.post(`${ROOT_URL}/${postId}`, { content: comment }, {
        headers: {'x-access-token': Cookies.get('token') }  // require auth
      })
        .then((response) => {  // If success, clear the text editor
          dispatch({
            type: CREATE_COMMENT,
            payload: response.data,
          });
          //dispatch(reset('comment_new'));  // - Clear form value (data)
          resetForm();  // - Clear text editor (UI)
          setSubmitting(false);
          dispatch({ type: SHOW_ALERT, payload: "comment posted successfuly" , alertType: "success" });
          //history(`/posts/view/${postId}`);  // - clear alert message
        })
        .catch(({response}) => {  // If fail, render alert message
  
          // failure reason: un-authenticated
          
            dispatch({ 
                type: SHOW_ALERT,
                payload: response.data.message,
                alertType: "error"
            });
            setSubmitting(false);
          // failure reason: comment is empty
          
        });
    }
  }
  
export function fetchComments(postId) {

  return function(dispatch) {
    axios.get(`${ROOT_URL}/${postId}`)
    .then((response) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    })
    .catch(err=>{
      
      dispatch({ type: SHOW_ALERT,
      payload: err.response.data.message,
      alertType: "error" });

    });
  }
};
