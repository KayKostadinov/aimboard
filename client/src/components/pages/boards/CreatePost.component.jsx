import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreatePost = ({ aim, profile: { profile }, newPost, writePost }) => {
    return (
        <form>
            {profile && <img src={profile.user.avatar} className='avatar' width='50' />}
            <input type="text" onChange={e => writePost({ text: e.target.value })} />
            <button onClick={e => newPost(e)}>Post</button>
        </form>
    )
}

CreatePost.propTypes = {
    aim: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    aim: state.aim,
})

export default connect(mapStateToProps, {})(CreatePost);