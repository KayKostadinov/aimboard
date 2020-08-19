import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';
import Posts from './Posts.component';
import CreatePost from './CreatePost.component';
import Alert from '../../layout/Alert.component';
import { getAims } from '../../../actions/aim';


// fetch data from db
// order by date

const Boards = ({ getMyProfile, getPosts, auth: { isAuthenticated }, profile, getAims, aim: { aims, loading: aimLoading }, post: { posts, loading } }) => {
    useEffect(() => {
        getMyProfile();
        getPosts();
        getAims();
    }, [getMyProfile, getPosts, getAims, loading, aimLoading]);

    const [postData, setPostData] = useState({
        text: '',
        aim: {
            aim: '',
            title: ''
        }
    })

    return (!loading && !profile.loading &&
        <div className='boards-page'>
            {isAuthenticated &&
                <div className='create-post-form'>
                    <CreatePost
                        img={profile.profile.user.avatar}
                        aims={aims}
                        postData={postData}
                        setPostData={setPostData}
                    />
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
    getAims: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post,
    aim: state.aim
})

export default connect(mapStateToProps, { getMyProfile, getPosts, getAims })(Boards);