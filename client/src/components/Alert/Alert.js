import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../../actions/alertAction';

export default function AlertCard() {
  //const [open, setOpen] = React.useState(true);
  const { open, message } = useSelector(store=>store.alertReducer);
  const dispatch = useDispatch();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(clearAlert());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={ message }
        action={
          <React.Fragment>
            <Button color="inherit" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
