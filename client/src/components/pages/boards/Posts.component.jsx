import React from 'react';


const Posts = props => {
    return (
        <div>
            {props.posts.map(post => <li key={post._id}>{post.name}: {post.text}</li>)}
        </div>
    )
}

export default Posts;