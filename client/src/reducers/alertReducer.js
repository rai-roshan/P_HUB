import { SHOW_ALERT, CLEAR_ALERT } from '../actions/actionTypes';

export default (state={ open: false, message : '', alertType: "info" }, action) => {

    switch(action.type){

        case SHOW_ALERT:
            return { ...state, open: true, message: action.payload, alertType: action.alertType };

        case CLEAR_ALERT:
            return { ...state, open: false, message: '' };

        default:
            return state;
    }
};