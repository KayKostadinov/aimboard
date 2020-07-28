import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../../actions/post';
import Alert from '../../layout/Alert.component';

const Posts = ({ addLike, removeLike, deletePost, auth, post: { _id, text, aim, avatar, user, updoots, comments, date } }) => {
    const [toggleComments, setToggle] = useState(false);


    return (
        <div className='post-container'>
            <Alert />
            <div className="user">
                <img src={avatar} className='avatar' width='30' />
            </div>
            <div className="post">
                {aim && <p>{aim.title}</p>}
                <p>{text}</p>
                <div className="stats">
                    <div className='updoots'>
                        <i className='fas fa-heart' onClick={e => addLike(_id)} style={{ cursor: 'pointer' }} />
                        {updoots.length > 0 &&
                            <Fragment>
                                {updoots.length}
                                <i className='far fa-heart' onClick={e => removeLike(_id)} style={{ cursor: 'pointer' }} />
                            </Fragment>
                        }
                    </div>
                    <i className='fas fa-share-alt' />
                    <i className='fas fa-comment-dots' onClick={() => setToggle(!toggleComments)} />
                    <i className='far fa-calendar-alt' /> {new Date(date).toDateString()}
                    {auth.isAuthenticated && user === auth.user._id &&
                        <i className='fas fa-times-circle' onClick={e => deletePost(_id)} />
                    }
                </div>
                <div className="comments">
                    {toggleComments && comments.map(
                        comment =>
                            <div
                                key={comment._id}
                                className='comment-body'
                            >
                                <img src={comment.avatar} className='avatar' width='20' />
                                <div className="content">
                                    <p>{comment.name}:</p>
                                    <p>{comment.text}</p>
                                </div>
                            </div>)
                    }
                    {auth.isAuthenticated ?
                        <div className="add-comment">
                            <img src={auth.user.avatar} className='avatar' width='20' />
                            <form className='add-comment-form'>
                                <input type="text" />
                                <button onClick={e => e.preventDefault()} className='btn btn-regular'>
                                    <i className='fas fa-arrow-circle-up' />
                                </button>
                            </form>
                        </div>
                        : <p>You need to be logged in to add comments</p>
                    }
                </div>
            </div>
        </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(Posts);