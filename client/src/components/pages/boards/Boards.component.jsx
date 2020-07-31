import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';
import Posts from './Posts.component';
import CreatePost from './CreatePost.component';
import Alert from '../../layout/Alert.component';


// fetch data from db
// order by date

const Boards = ({ getMyProfile, getPosts, auth: { isAuthenticated }, profile, post: { posts, loading } }) => {
    useEffect(() => {
        getMyProfile();
        getPosts();
    }, [getMyProfile, getPosts, loading]);

    return (!loading && !profile.loading &&
        <div>
            {isAuthenticated &&
                <div className='create-post-form'>
                    <img src={profile.profile.user.avatar} className='avatar' width='50' />
                    <CreatePost />
                </div>
            }
            <div className='boards-container' >
                {posts.map(post => <Posts key={post._id} post={post}></Posts>)}
            </div>
            <Alert />
        </div>
    )
}

Boards.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post,
})

export default connect(mapStateToProps, { getMyProfile, getPosts })(Boards);