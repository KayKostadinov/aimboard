import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Posts = ({ auth, post: { _id, text, aim, name, avatar, user, updoots, comments, date } }) => {
    console.log()
    return (
        <div className='post-container'>
            <div className="user">
                <p>{name}</p>
                <img src={avatar} className='avatar' width='30' />
            </div>
            <div className="post">
                <p>{aim}</p>
                <p>{text}</p>
                <div className="stats">
                    <p> {updoots.length} <i className='fas fa-heart' /></p>
                    <p><i className='fas fa-share-alt' /></p>
                    <p> <i className='far fa-calendar-alt' /> {new Date(date).toDateString()}</p>
                </div>
                <div className="comments">
                    {comments.map(
                        comment => <div
                            key={comment._id}
                            className='comment-body'
                        >
                            <img src={comment.avatar} className='avatar' width='20' />
                            <div className="content">
                                <p>{comment.name} says:</p>
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
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(Posts);