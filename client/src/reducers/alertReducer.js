import { SHOW_ALERT, CLEAR_ALERT } from '../actions/actionTypes';

const alertReducer = (state={ open: false, message : "can't reach server", alertType: "info" }, action) => {

    if(!action.payload)
    action.payload = "can't reach server";
    
    switch(action.type){

        case SHOW_ALERT:
            return { ...state, 
                open: true, 
                message: action.payload ,
                alertType: action.alertType };

        case CLEAR_ALERT:
            return { ...state, open: false, message: '' };

        default:
            return state;
    }
};

export default alertReducer;