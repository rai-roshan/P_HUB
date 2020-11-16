import { Typography, Container, makeStyles, Paper, Box , Chip, Button } from '@material-ui/core';
import PreviewPost from './PreviewPost';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { checkAuthority, fetchPost, deletePost } from '../../actions/postsAction';
import { CHECK_AUTHORITY } from '../../actions/actionTypes';
import { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import Cookies from 'js-cookie';
import CommentField from '../comment/commentField';
import Comments from '../comment/comments';

const useStyles = makeStyles({
    root : {
        backgroundColor: "#f1f1f1"
    },
    blogTitle : {
        marginBottom: "2rem",
        fontWeight: "500",
        overflow: "auto"
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
    const history = useHistory();
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
        
        if(Cookies.get('token'))
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
            { post ? post.categories.map(tag=> <Chip key={"tag"+tag} color="primary" variant="outlined" label={tag} onClick={ handleTagClick } className={classes.mr1} />) : <Skeleton width="16rem" height="2rem" /> }
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="1rem">
                <Typography className={classes.muteText}>{ post ? `Author : ${post.authorName}` : <Skeleton width="16rem" /> }</Typography>
                
                { allowChange ? <Box display="flex" justifyContent="space-around" flexWrap="wrap" my="0.5rem" >
                    <Link to={ `/posts/update/${props.match.params.id}` }> 
                    <Button variant="contained" className={classes.mr1} color="primary">
                        { post ? "update" : <Skeleton width="3rem" /> } 
                    </Button>
                    </Link>
                    <Button onClick={ ()=>{ dispatch(deletePost(props.match.params.id, history)) } } variant="contained" className={classes.mr1} color="secondary">
                    { post ? "delete" : <Skeleton width="3rem" /> }
                    </Button>
                </Box> : "" }
            </Box>

            { post && post.content ?  <PreviewPost storedState={post.content} /> : <Skeleton variant="rect" width="100%" height="60vh" /> }
            </Container>
        </Paper>

        <CommentField postId={props.match.params.id} />

        <Comments postId={props.match.params.id} />
    </Container>
};