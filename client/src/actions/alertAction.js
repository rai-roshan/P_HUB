import { SHOW_ALERT, CLEAR_ALERT} from './actionTypes';

export const showAlert = ({ message, alertType }) => {

    return { type: SHOW_ALERT, message: message, alertType: alertType };
};

export const clearAlert = () => {

    return { type: CLEAR_ALERT }
};