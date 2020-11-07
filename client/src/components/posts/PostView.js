import { Typography, Container, makeStyles, Card, Paper } from '@material-ui/core';
import PreviewPost from './PreviewPost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../actions/postsAction';
import { useEffect } from 'react';

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
    }
});

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector(store=>store.postsReducer);
    let post = null;
    if(posts)
    post = posts[props.match.params.id];

    //console.log("post data : ", post);
    
    //console.log("post id: ",props.match.params.id);

    useEffect(()=>{
        dispatch(fetchPost(props.match.params.id));
    },[]);

    return <Container maxWidth="md" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
            <Container maxWidth="lg">
            <Typography variant="h2" className={ classes.blogTitle }>
                { post ? post.title : "Loading ..." }
            </Typography>

            <Typography className={classes.muteText}>{ post ? `Author : ${post.authorName}` : "Loading..." }</Typography>

            { post ? <PreviewPost storedState={post.content} /> : "Loading ..." }
            </Container>
        </Paper>
    </Container>
};