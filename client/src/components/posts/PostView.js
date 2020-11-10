import { Typography, Container, makeStyles, Paper, Box , Chip, Button } from '@material-ui/core';
import PreviewPost from './PreviewPost';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAuthority, fetchPost } from '../../actions/postsAction';
import { CHECK_AUTHORITY } from '../../actions/actionTypes';
import { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
    root : {
        backgroundColor: "#f1f1f1"
    },
    blogTitle : {
        marginBottom: "2rem",
        fontWeight: "500"
    },
    paper : {
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem"
    },
    muteText : {
        color: "#6e6e6e"
    },
    mr1: {
        marginRight: "0.5rem"
    },
    m1: {
        margin: "0.5rem"
    }
});

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { posts } = useSelector(store=>store.postsReducer);
    const { allowChange } = useSelector(store=>store.authReducer); 
    let post = null;
    
    if(posts)
    post = posts[props.match.params.id];

    const handleTagClick = () => {
        //do nothing
    };

    useEffect(()=>{
        dispatch(fetchPost(props.match.params.id));
        dispatch(checkAuthority(props.match.params.id));

        return () => {
            dispatch({ type: CHECK_AUTHORITY , payload: null });
        }
    },[]);

    return <Container maxWidth="md" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
            <Container maxWidth="lg">
            <Typography variant="h2" className={ classes.blogTitle }>
                { post ? post.title : <Skeleton width="100%" /> }
            </Typography>

            <Box display="flex" justifyContent="left" flexWrap="wrap" mb="1rem">
            { post ? post.categories.map(tag=> <Chip color="primary" variant="outlined" label={tag} onClick={ handleTagClick } className={classes.mr1} />) : <Skeleton width="16rem" height="2rem" /> }
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem">
                <Typography className={classes.muteText}>{ post ? `Author : ${post.authorName}` : <Skeleton width="16rem" /> }</Typography>
                
                { allowChange ? <Box display="flex" justifyContent="space-around" flexWrap="wrap" my="0.5rem" >
                    <Link to={ `/posts/update/${props.match.params.id}` }> 
                    <Button variant="contained" className={classes.mr1} color="primary">
                        { post ? "update" : <Skeleton width="3rem" /> } 
                    </Button>
                    </Link>
                    <Link to={``}>
                    <Button variant="contained" className={classes.mr1} color="secondary">
                    { post ? "delete" : <Skeleton width="3rem" /> }
                    </Button>
                    </Link>
                </Box> : "" }
            </Box>

            { post ?  <PreviewPost storedState={post.content} /> : <Skeleton variant="rect" width="100%" height="60vh" /> }
            </Container>
        </Paper>
    </Container>
};