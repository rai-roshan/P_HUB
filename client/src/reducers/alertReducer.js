import { SHOW_ALERT, CLEAR_ALERT } from '../actions/actionTypes';

export default (state={ open: false, message : '' }, action) => {

    switch(action.type){

        case SHOW_ALERT:
            return { ...state, open: true, message: action.payload };

        case CLEAR_ALERT:
            return { ...state, open: false, message: '' };

        default:
            return state;
    }
};