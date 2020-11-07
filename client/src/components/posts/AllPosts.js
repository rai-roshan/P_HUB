import { Container, Typography, Box, makeStyles, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../actions/postsAction';

import PostList from './PostList';


const useStyles = makeStyles({
    mb3 : {
        marginBottom: "3rem"
    },
    mb1 : {
        marginBottom: "1rem"
    }
});

export default () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector(store=>store.postsReducer);

    useEffect(()=>{
        dispatch(fetchPosts());
    },[]);
    
    return <Box> 
    <Container maxWidth="md">
        <Box 
        display="flex" 
        flexWrap="wrap" 
        justifyContent="space-between" 
        alignItems="center"
        className={classes.mb3}>
        <Typography variant="h2" className={classes.mb1}>
            All Posts
        </Typography>
        </Box>
    </Container>

    <PostList posts={ posts }/>
    </Box>
};