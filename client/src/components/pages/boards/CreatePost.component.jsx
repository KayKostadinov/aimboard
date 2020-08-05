import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import { getAims } from '../../../actions/aim';

const CreatePost = ({ addPost, getAims, aim: { aims, loading }, img, postToggle }) => {

    useEffect(() => {
        getAims();

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
            className='post-form'
            onSubmit={e => {
                e.preventDefault();
                addPost(postData);
                postToggle && postToggle({ toggle: false })
            }}>
            <img src={img} alt="" className='avatar' />
            <textarea
                name="text"
                rows='3'
                value={postData.text}
                onChange={e => setPostData({ ...postData, text: e.target.value })}
                required
            />
            <select
                className="select"
                value={postData.aim.title}
                onChange={e => setPostData({
                    ...postData,
                    aim: {
                        aim: e.target[e.target.selectedIndex].id,
                        title: e.target.value
                    }
                })}>

                <option value="null">Select aim...</option>
                {!loading && aims.map(x =>
                    <option
                        key={x._id}
                        id={x._id}
                        value={x.title}
                    >{x.title}</option>)
                }
            </select>
            <button type='submit' className='btn btn-highlight' >Post</button>
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