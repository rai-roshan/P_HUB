import React from 'react';
import { useDispatch } from 'react-redux';
import { signoutUser } from '../../actions/authActions';
import { SHOW_ALERT } from '../../actions/actionTypes';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { DoubleArrow, AccountBox, PostAdd, ExitToApp, Dashboard, DesktopWindows, ViewAgenda } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


const GlobalList = () => <List>
<Link to="/">
<ListItem button >
<ListItemIcon> <DesktopWindows /> </ListItemIcon>
<ListItemText primary={ "Welcome" } />
</ListItem>
</Link>

<Link to="/posts">
<ListItem button >
<ListItemIcon> <ViewAgenda /> </ListItemIcon>
<ListItemText primary={"All Posts"} />
</ListItem>
</Link>

</List>;

const AuthList = ({username , handleSignout }) => {

    return <React.Fragment>
        <List>
            <Link to="/profile/my">
            <ListItem button >
            <ListItemIcon> <AccountBox/> </ListItemIcon>
            <ListItemText primary={username ? username : "loading ..." } />
            </ListItem>
            </Link>

            <Link to="/posts/my">
            <ListItem button >
            <ListItemIcon> <Dashboard /> </ListItemIcon>
            <ListItemText primary={"My Posts"} />
            </ListItem>
            </Link>

            <Link to="/posts/new">
            <ListItem button >
            <ListItemIcon> <PostAdd /> </ListItemIcon>
            <ListItemText primary={"Create Post"} />
            </ListItem>
            </Link>

        </List>

    <Divider />

        <List>
            <ListItem button onClick={ handleSignout } >
            <ListItemIcon> <ExitToApp /> </ListItemIcon>
            <ListItemText primary={"Logout"} />
            </ListItem>
        </List>

</React.Fragment>
};


const UnauthList = () => {
    return <List>
        <Link to="/signin">
        <ListItem button >
        <ListItemIcon> <DoubleArrow /> </ListItemIcon>
        <ListItemText primary={ "Login" } />
        </ListItem>
        </Link>

        <Link to="/signup">
        <ListItem button >
        <ListItemIcon> <DoubleArrow /> </ListItemIcon>
        <ListItemText primary={ "Signup" } />
        </ListItem>
        </Link>
    </List>
}

export default function SideDrawer({ sidebar, setSidebar, authenticated, username }) {
  const classes = useStyles();
  //const [sidebar, setSidebar] = React.useState( false );
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser());
    dispatch({ type: SHOW_ALERT, payload: "user signedout succesfully", alertType: "info" });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSidebar( open );
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
    
    <GlobalList />
    <Divider/>
    { authenticated ? <AuthList username={username} handleSignout={ handleSignout } /> : <UnauthList />}
     
    </div>
  );

  return (
    <div>
          <Drawer anchor={"left"} open={sidebar} onClose={toggleDrawer(false)}>
            { list() }
          </Drawer>
    </div>
  );
}
