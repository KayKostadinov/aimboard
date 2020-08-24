import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import Alert from '../../layout/Alert.component';

const CreatePost = ({ addPost, img, postToggle, aims, aimId, aimTitle, name, setCreate }) => {

    const [postData, setPostData] = useState({
        text: '',
        name: name,
        aim: {
            aim: '',
            title: ''
        }
    })
    //aimId aimTitle for aim: {}

    const closeWindow = e => {
        if (e.target.className === 'post-form-container') {
            setCreate(false)
            console.log(postData)
        }
    }

    return (
        <div className="post-form-container" onClick={e => closeWindow(e)}>
            <Alert />
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
                <button type='submit' className='btn btn-highlight' >Post</button>
            </form>
            <div className="select">
                {aims.map(aim =>
                    <div
                        className="aim"
                        key={aim._id}
                        onClick={() => setPostData({ ...postData, aim: { aim: aim._id, title: aim.title } })}
                    >
                        {aim.title}
                    </div>
                )
                }
            </div>
        </div>
    )
}

CreatePost.propTypes = {
    addPost: PropTypes.func.isRequired,

}


export default connect(null, { addPost })(CreatePost);