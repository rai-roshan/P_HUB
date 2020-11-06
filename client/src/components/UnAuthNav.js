import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';

const UnAuthNav = () => {

    return <Button variant="outlined" color="inherit">
    <Link to="/signin">Login</Link>
  </Button>
};

export default UnAuthNav;