import { Container } from '@material-ui/core';
import PostPreview from './PostPreview';
import NoPost from './NoPosts';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export default ({ posts }) => {

    return  <Container maxWidth="md">
        { posts ?  _.map(posts, post => <PostPreview key={post._id+"a"} post={ post } /> ): <NoPost /> }
    </Container>
};
