import { useEffect } from 'react';
import { Container, Paper,makeStyles, Box, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import profilepic from '../../images/profilepic.png';
import Pacman from '../loading/loading2'; 
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
                
                <Box className={classes.imgContainer}>
                    { user ? <img src={profilepic} style={ { height: "inherit" }} /> : 
                      <Box className="lds-hourglass" />}
                </Box>
                {/*  */}
                {/* <Pacman /> */}
                
                <Typography className={classes.fw500}>
                    {user ? user.firstName ? `Name : ${user.firstName} ${user.lastName}` : "" : "Loading ..."}
                </Typography>
                <Typography>
                    {user ? user.email ? `Email : ${user.email}` : "" : "Loading ..."}
                </Typography>
                <Typography>
                    {user ? user.occupation ? `Occupation : ${user.occupation}` : "" : "Loading ..." }
                </Typography>
                <Typography>
                    {user ? user.description ? user.description : "" : "Loading ..."}
                </Typography>
                <Typography >
                    {user ? user.birthday ? user.birthday : "" : "Loading ..."}
                </Typography>
                <Typography >
                    {user ? user.address ? user.address : "" : "Loading ..."}
                </Typography>
                <Typography >
                    {user ? user.phone ? user.phone : "" : "Loading ..."}
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