import _ from 'lodash';
import {
  CREATE_COMMENT,
  FETCH_COMMENTS,
} from '../actions/actionTypes';

export default function(state = { loading: true, comments: [] }, action) {
  // Attention!!! The state object here refers to state.comments, instead of the application state.

  switch(action.type) {
    case FETCH_COMMENTS:
      return { loading : false, comments : action.payload }
    case CREATE_COMMENT:
      return { loading: false, comments: [...state.comments , action.payload ] };  // [] here is not for creating array, is for key interpolation, i.e. newState[action.payload.id] = action.payload
    default:
      return state;
  }
}