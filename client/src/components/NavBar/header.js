import { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { verifyAuth } from '../../actions/authActions';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Skeleton} from '@material-ui/lab';


import SideDrawer from './SideDrawer';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    //flexGrow: 1,
    marginBottom: "1.5rem"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

//NAV WITH SEARCH COMPONENT
export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);
  const { authenticated, username  } = useSelector(store=> store.authReducer );
  const dispatch = useDispatch();
  //console.log("auth store : ", authStore);


  useEffect(()=>{
    if(authenticated && !username){
      dispatch(verifyAuth());
    }
  },[])

  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={ ()=>{ setSidebar(true) } }
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          
          <Typography className={classes.title} variant="h6" noWrap>
          <Link to="/">DEV BLOG</Link>
          </Typography>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />


          <div className={classes.sectionDesktop}>
  
            { authenticated ? <Button 
            onClick={ ()=>{ setSidebar(true) } }
            variant="outlined" color="inherit">{ username ? username : <Skeleton width="5rem" height="1.5rem" /> }</Button> : 
            <Link to="/signin"><Button variant="outlined" color="inherit">{ "Login" }</Button></Link> }

          </div>
        </Toolbar>

        <SideDrawer 
        sidebar={ sidebar }
        setSidebar={ setSidebar } 
        authenticated={ authenticated }
        username={ username } />

      </AppBar>
      { /*renderMobileMenu */ }
      {/*renderMenu*/ }
    </div>
  );
}
