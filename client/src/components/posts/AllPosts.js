import { Container, Typography, Box, makeStyles, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../actions/postsAction';

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
    const { loading, posts } = useSelector(store=>store.postsReducer);

    useEffect(()=>{
        dispatch(fetchPosts());
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
            All Posts
        </Typography>
        <Divider />
        </Box>
    </Container>

    { loading ? <LoadingPosts /> : <PostList posts={ posts }/> }
    </Box>
};