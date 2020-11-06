import { Container, Typography, Box, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    
    return <Box>
    <Container maxWidth="md">
        <Box 
        display="flex" 
        flexWrap="wrap" 
        justifyContent="space-between" 
        alignItems="center"
        className={classes.mb3}>
        <Typography variant="h2" className={classes.mb1}>
            My Posts
        </Typography>
        <Button variant="contained" color="primary">
            <Link to="/posts/new">
            Create new post
            </Link>
        </Button>
        </Box>
    </Container>
    <PostList />
    </Box>
};