import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addComment } from '../../../actions/post';

const Posts = ({
    addLike,
    addComment,
    removeLike,
    deletePost,
    auth,
    post: { _id, text, aim, avatar, user, updoots, comments, date }
}) => {
    const [toggleComments, setToggle] = useState(false);
    const [commentForm, setCommentForm] = useState({ text: '' });
    return (
        <div className='post-container'>
            <div className="user">
                <img src={avatar} className='avatar' alt='' />
            </div>
            {aim && <p className='aim-title'>{aim.title}</p>}
            <p className='text'>{text}</p>
            <div className="stats">
                <div className='updoots'>
                    <i className='fas fa-heart' onClick={e => addLike(_id)} style={{ cursor: 'pointer' }} />
                    {updoots.length > 0 &&
                        <Fragment>
                            {` ${updoots.length} `}
                            <i className='far fa-heart' onClick={e => removeLike(_id)} style={{ cursor: 'pointer' }} />
                        </Fragment>
                    }
                </div>
                <div className="comment-count" onClick={() => setToggle(!toggleComments)}>
                    {comments.length > 0 && `${comments.length} `}
                    <i className='fas fa-comment-dots' />
                </div>
                <i className='far fa-calendar-alt'>
                    <p>{new Date(date).toDateString()}</p>
                </i>
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
                            <img src={comment.avatar} alt='' className='avatar' width='20' />
                            <div className="content">
                                <p>{comment.text}</p>
                            </div>
                        </div>)
                }
            </div>
            {auth.isAuthenticated ?
                <form className='add-comment' onSubmit={e => {
                    e.preventDefault();
                    addComment(commentForm, _id)
                    setCommentForm({ text: '' })
                }}>
                    <img src={auth.user.avatar} alt='' className='avatar' width='20' />
                    <input type="text" value={commentForm.text} onChange={e => setCommentForm({ text: e.target.value })} />
                    <button type='submit' className='btn btn-highlight'>
                        <i className='fas fa-arrow-circle-up' />
                    </button>
                </form>
                : <p className='tip'>You need to be logged in to add comments</p>
            }
        </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost, addComment })(Posts);