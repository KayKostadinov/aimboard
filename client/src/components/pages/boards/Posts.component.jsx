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
    username,
    post: { _id, text, aim, avatar, name, user, updoots, comments, date }
}) => {
    const [toggleComments, setToggle] = useState(false);
    const [commentForm, setCommentForm] = useState({ text: '', name: username });

    const getTimeSincePost = () => {
        const sinceMinutes = parseInt((new Date() - Date.parse(date)) / 1000 / 60)
        if (sinceMinutes > 60) {
            if (sinceMinutes > 60 * 24) {
                return `${parseInt(sinceMinutes / 60 / 24)} d ago`
            }
            return `${parseInt(sinceMinutes / 60)} h ago`
        }
        return `${sinceMinutes} m ago`
    }


    return (
        <div className='post-container'>
            <div className="user">
                <img src={avatar} className='avatar' alt='' />
            </div>
            {aim && <div className='aim-title'>{name} <i className='fas fa-chevron-circle-right'></i> <p>{aim.title}</p></div>}
            {date &&
                <i className='far fa-clock' >
                    <p>{getTimeSincePost()}</p>
                </i>
            }
            {auth.isAuthenticated && user === auth.user._id &&
                <i className='fas fa-times-circle' onClick={e => deletePost(_id)} />
            }
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
            </div>

            <div className="comments">
                {toggleComments && comments.map(
                    comment =>
                        <div
                            key={comment._id}
                            className='comment-body'
                        >
                            <div>
                                <img src={comment.avatar} alt='' className='avatar' width='20' />
                            </div>
                            <div className="content">
                                <h5>{comment.name}</h5>
                                <br />
                                <p>{comment.text}</p>
                            </div>
                        </div>)
                }
            </div>
            {auth.isAuthenticated ?
                <form className='add-comment' onSubmit={e => {
                    e.preventDefault();
                    addComment(commentForm, _id)
                    setCommentForm({ ...commentForm, text: '' })
                }}>
                    <img src={auth.user.avatar} alt='' className='avatar' width='20' />
                    <input type="text" value={commentForm.text} onChange={e => setCommentForm({ ...commentForm, text: e.target.value })} />
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