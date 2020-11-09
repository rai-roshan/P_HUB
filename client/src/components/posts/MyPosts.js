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
        flexWrap="wrap" 
        justifyContent="space-between" 
        className={classes.mb2}>
        <Typography variant="h2" className={classes.h2}>
            My Posts
        </Typography>
        <Divider />
        <Button variant="contained" color="primary">
            <Link to="/posts/new">
            Create new post
            </Link>
        </Button>
        </Box>
    </Container>

    { loading ? <LoadingPosts /> : <PostList posts={ posts } /> }

    </Box>
};