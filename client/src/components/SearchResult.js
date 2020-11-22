import { Container, Typography, Box, makeStyles, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { fetchPosts } from '../actions/postsAction' ;
import PostList from './posts/PostList';
import LoadingPosts from './posts/LoadingPosts';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const useStyles = makeStyles({
    mb2 : {
        marginBottom: "2rem"
    },
    h2 : {
        fontWeight: "600",
        color: "#525252",
        marginBottom: "1rem"
    },
    iconSize : {
        fontSize : "4rem"
    },
    fontWeight : {
        fontWeight : 600,
        marginTop: "1rem",
        color: "rgba(0, 0, 0, 0.54)",
        textAlign: "center"
    }
});

const NoResult = ({classes}) => {

    return <Container maxWidth="md">
        <Box display="flex" 
        flexDirection="column"
        justifyContent="center"
        alignItems="center" mt="2">
            <FindInPageIcon color="action" className={ classes.iconSize } />
            <Typography  variant="h4" className={classes.fontWeight}>
                0 search result
            </Typography>
        </Box>
    </Container>
}

const SearchResult = (props) => {

    const classes = useStyles();
    const [result, setResult ] = useState(null);
    const dispatch = useDispatch();
    const { loading, posts } = useSelector(store=>store.postsReducer);
    
    useEffect(()=>{
        if(posts) {
        let ResultData = _.filter( posts, post => {
            const { title, categories, authorName } = post;

            return (        
                title.toLowerCase().includes(props.match.params.keyword.toLowerCase()) ||       
                (categories && categories.join("").toLowerCase().includes( props.match.params.keyword.toLowerCase() )) ||
                authorName.toLowerCase().includes( props.match.params.keyword.toLowerCase() )
              );
        });

        ResultData = _.without(ResultData, undefined)
        console.log("result : ", ResultData );
        setResult(ResultData); }
    },[ props.match.params.keyword, posts ]);

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
            {`Search Result for : ${props.match.params.keyword}` } 
        </Typography>
        <Divider />

        </Box>
    </Container>

    { !loading && result ? 
    result.length ? <PostList posts={ result }/> : <NoResult classes={classes} /> : 
    <LoadingPosts />  }

    </Box>
};

export default SearchResult;
