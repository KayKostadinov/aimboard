import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, getPosts } from '../../../actions/post';
import { getAims } from '../../../actions/aim';

const CreatePost = ({ addPost, getAims, aim: { aim, loading } }) => {

    useEffect(() => {
        getAims();
        getPosts();
    }, [getAims])

    const [postData, setPostData] = useState({
        text: '',
        aim: {
            aim: '',
            title: ''
        }
    })


    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                addPost(postData);
            }}>
            <select value={postData.aim.title}
                onChange={e => setPostData({
                    ...postData,
                    aim: {
                        aim: e.target[e.target.selectedIndex].id,
                        title: e.target.value
                    }
                })}>
                <option value="null">Select aim...</option>
                {!loading && aim.map(x =>
                    <option
                        key={x._id}
                        id={x._id}
                        value={x.title}
                    >{x.title}</option>)
                }
            </select>
            <textarea
                name="text"
                cols='30'
                rows='5'
                value={postData.text}
                onChange={e => setPostData({ ...postData, text: e.target.value })}
                required
            />
            <button type='submit'>Post</button>
        </form>
    )
}

CreatePost.propTypes = {
    addPost: PropTypes.func.isRequired,
    getAims: PropTypes.func.isRequired,
    aim: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    aim: state.aim,
})

export default connect(mapStateToProps, { addPost, getAims })(CreatePost);