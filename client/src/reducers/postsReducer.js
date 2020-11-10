import _ from 'lodash';
import {
  FETCH_POSTS,
  CREATE_POST,
  FETCH_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING_POSTS
} from '../actions/actionTypes';
//import profileReducer from './profileReducer';

const postsReducer = (state = { loading : true, posts : {} }, action) => {
  // Attention!!! The state object here refers to state.posts, instead of the application state.

  switch(action.type) {
    case LOADING_POSTS:
      return {
        loading : true,
        posts: {}
      };

    case FETCH_POSTS:
      return { 
        loading: false, 
        posts: _.mapKeys(action.payload, '_id') 
      };

    case CREATE_POST:
      return { 
        loading: false, 
        posts : { 
          ...state.posts , 
          [action.payload._id]: action.payload } 
        };  // [] here is not for creating array, is for key interpolation, i.e. newState[action.payload.id] = action.payload
    
    case FETCH_POST:
      return { 
        loading: false , 
        posts : { 
          ...state.posts, 
          [action.payload._id]: action.payload } 
        };

    case UPDATE_POST:
      return { loading: false, 
        posts : {
          ...state.posts,
          [action.payload._id]: action.payload }
        };

    case DELETE_POST:
      return {
        loading: false,
        posts: _.omit(state, action.payload) 
      };

    default:
      return state;
  }
};

export default postsReducer;