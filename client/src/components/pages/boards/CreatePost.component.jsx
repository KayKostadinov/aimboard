import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import Alert from '../../layout/Alert.component';
import { setAlert } from '../../../actions/alert';

const CreatePost = ({ addPost, img, postToggle, aims, aimId, aimTitle, name, setCreate, setAlert }) => {

    const [postData, setPostData] = useState({
        text: '',
        name: name,
        aim: {
            aim: aimId ? aimId : '',
            title: aimTitle ? aimTitle : ''
        }
    })
    //aimId aimTitle for aim: {} when edit === true

    const [search, setSearch] = useState('')

    //close the popup on clicking empty space
    const closeWindow = e => {
        if (e.target.className === 'post-form-container') {
            setCreate(false)
        }
    }

    // submit the create post form
    const submit = e => {
        e.preventDefault();
        if (postData.aim.title === '') {
            setAlert('Please select an aim', 'error')
            return
        }
        addPost(postData);
        postToggle && postToggle({ toggle: false });
        setCreate(false);
    }

    return (
        <div className="post-form-container" onClick={e => closeWindow(e)}>
            <Alert />
            <form
                className='post-form'
                onSubmit={e => submit(e)}>
                <img src={img} alt="" className='avatar' />
                <p className='name'>{name}</p>
                <h5 className='selected'><i className='fas fa-chevron-circle-right'></i> {postData.aim.title}</h5>
                <textarea
                    className='text'
                    rows='3'
                    value={postData.text}
                    onChange={e => setPostData({ ...postData, text: e.target.value })}
                    required
                    autoFocus
                />
                <textarea
                    className="search"
                    value={search}
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                    placeholder='search aims'></textarea>
                <button type='submit' className='btn btn-highlight' >Post</button>
            </form>
            <div className="select-aim">
                {aims.map(aim =>
                    search ?
                        aim.title.toLowerCase().includes(search) &&
                        <div
                            className="aim"
                            key={aim._id}
                            onClick={() => setPostData({ ...postData, aim: { aim: aim._id, title: aim.title } })}
                        >
                            {aim.title}
                        </div>
                        :
                        <div
                            className="aim"
                            key={aim._id}
                            onClick={() => setPostData({ ...postData, aim: { aim: aim._id, title: aim.title } })}
                        >
                            {aim.title}
                        </div>
                )}
            </div>
        </div>
    )
}

CreatePost.propTypes = {
    addPost: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,

}


export default connect(null, { addPost, setAlert })(CreatePost);