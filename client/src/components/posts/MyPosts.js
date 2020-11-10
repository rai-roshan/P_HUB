import { Container, Typography, Box, makeStyles, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostsByUserId } from '../../actions/postsAction';

import PostList from './PostList';
import LoadingPosts from './LoadingPosts';

const useStyles = makeStyles({
    mb2 : {
        marginBottom: "2rem"
    },
    h2 : {
        fontWeight: "600",
        color: "#525252",
        marginBottom: "1rem"
    }
});

export default () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading , posts } = useSelector(store=>store.postsReducer);

    useEffect(()=>{
        dispatch(fetchPostsByUserId());
    },[]);

    return <Box>
    <Container maxWidth="md">
        <Box 
        display="flex"
        flexDirection="column"
        mb="1rem" >
        <Box 
        display="flex" 
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap" 
        justifyContent="space-between" mb="0.5rem">
            
            <Typography variant="h2" className={classes.h2}>
                My Posts
            </Typography>

            <Link to="/posts/new">
            <Button variant="contained" color="primary">
                Create new post
            </Button>
            </Link>

        </Box>

        <Divider />
        
        </Box>

    </Container>

    { loading ? <LoadingPosts /> : <PostList posts={ posts } /> }

    </Box>
};