import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';
import Posts from './Posts.component';
import CreatePost from './CreatePost.component';

// fetch data from db
// order by date

const Boards = ({ getMyProfile, getPosts, auth: { isAuthenticated }, profile, post: { posts, loading } }) => {
    const [postData, setPostData] = useState({
        name: '',
        text: ''
    })
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        getMyProfile();
        getPosts();
        if (profile) setProfileData({ profile: profile.profile })
        // setPostData({
        //     name: 
        //     text: 
        // })
    }, [getMyProfile, getPosts, profile.loading]);

    return (
        <div className='container'>
            {isAuthenticated && !profile.loading && <CreatePost profile={profileData} />}
            <Posts posts={posts} />
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