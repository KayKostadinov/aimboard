import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import Alert from '../../layout/Alert.component';

const CreatePost = ({ addPost, img, postToggle, aims, postData, setPostData, aimId, aimTitle }) => {
    return (
        <form
            className='post-form'
            onSubmit={e => {
                e.preventDefault();

                addPost(postData);
                postToggle && postToggle({ toggle: false })
            }}>
            <Alert />
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
                {aimId ?
                    <option value={aimTitle} id={aimId}>{aimTitle}</option>
                    :
                    <option value="null">Select aim...</option>
                }
                {aims && aims.map(x =>
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

}


export default connect(null, { addPost })(CreatePost);