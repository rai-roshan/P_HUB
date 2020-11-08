import { useEffect } from 'react';
import { Container, Paper,makeStyles, Box, Typography, Button } from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import profilepic from '../../images/profilepic.png'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../../actions/profileAction';

const useStyle = makeStyles({
    root: {
        minHeight : "80vh"
    },
    mb1: {
        marginBottom: "1rem"
    },
    my1: {
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    imgContainer : {
        height: "7rem",
        marginBottom: "1rem"
    },
    fw500 : {
        fontWeight : "500"
    }
})

const ProfileView = () => {

    const classes = useStyle();
    //const profilepic = null;

    const dispatch = useDispatch();
    const { user } = useSelector(store=>store.profileReducer);

    //if(!user)
    //dispatch(fetchProfile());

    useEffect(()=>{
        console.log("fetching user data", user);
        //if(!user)
        dispatch(fetchProfile());
        
        return ()=>{
            dispatch(clearProfile());
        }
    },[]);

    return <Container maxWidth="md">
        <Paper elevation={3} className={classes.root}>
            <Box display="flex" className={classes.root} flexDirection="column" flexWrap="wrap" justifyContent="center" >
            <Box display="flex" flexDirection="column" flexWrap="wrap" justifyContent="center" alignItems="center">
                
                <Box width="7rem" marginBottom="1rem" >
                    { user ? <img src={profilepic} style={ { maxHeight: "7rem" , maxWidth: "7rem" }} /> : 
                      <Skeleton variant="rect" height="7rem" width="7rem" />}
                </Box>
            
                
                <Typography className={classes.fw500}>
                    {user ? user.firstName ? `Name : ${user.firstName} ${user.lastName}` : "" : <Skeleton variant="rect" width="10rem" /> }
                </Typography>
                <Typography>
                    {user ?  user.email ? `Email : ${user.email}` : "" : <Skeleton  width="10rem" /> }
                </Typography>
                <Typography>
                    {user ?  user.occupation ? `Occupation : ${user.occupation}` : "" : <Skeleton  width="10rem" /> }
                </Typography>
                <Typography>
                    {user ?  user.description ? user.description : "" : <Skeleton  width="10rem" />}
                </Typography>
                <Typography >
                    {user ?  user.birthday ? user.birthday : "" : <Skeleton  width="10rem" />}
                </Typography>
                <Typography >
                    {user ?  user.address ? user.address : "" : <Skeleton  width="10rem" />}
                </Typography>
                <Typography >
                    {user ?  user.phone ? user.phone : "" : <Skeleton  width="10rem" />}
                </Typography>

                <Container maxWidth="sm" className={classes.my1}>
                <Box display="flex" justifyContent="space-around" alignItems="center" flexWrap="wrap">
                <Link to="/profile/update">
                <Button variant="contained"  className={ classes.mb1}>
                    Update Profile
                </Button>
                </Link>
                <Link to="/posts/my">
                <Button variant="contained"  className={ classes.mb1}>
                    My Posts
                </Button>
                </Link>
                <Link to="/posts/new">
                <Button variant="contained"  className={ classes.mb1}>
                    Create Post
                </Button>
                </Link>
                </Box>
                </Container>
            </Box>
            </Box>
        </Paper>
    </Container>
};

export default ProfileView;