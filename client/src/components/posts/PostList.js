import { Container } from '@material-ui/core';
import PostCard from './PostCard';
import NoPost from './NoPosts';
import _ from 'lodash';

import LazyLoad from 'react-lazyload';

export default ({ posts }) => {
    
    return  <Container maxWidth="md">
        { Object.keys(posts).length === 0 && posts.constructor === Object ?  <NoPost key="no-post-component" /> : 
        _.map(posts, post => <LazyLoad key={post._id} placeholder="Loading..." >
            <PostCard key={post._id} post={ post } />
            </LazyLoad> ) }
    </Container>
};
// )