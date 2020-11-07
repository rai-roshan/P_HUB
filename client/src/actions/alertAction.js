import { SHOW_ALERT, CLEAR_ALERT} from './actionTypes';

export const showAlert = ({ message }) => {

    return { type: SHOW_ALERT, message: message };
};;

export const clearAlert = () => {

    return { type: CLEAR_ALERT }
};