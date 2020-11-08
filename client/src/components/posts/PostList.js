import { Container } from '@material-ui/core';
import PostCard from './PostCard';
import NoPost from './NoPosts';
import _ from 'lodash';

export default ({ posts }) => {

    return  <Container maxWidth="md">
        { posts ? _.map(posts, post => <PostCard key={post._id} post={ post } /> ) : <NoPost key="no-post-component" /> }
    </Container>
};
// )