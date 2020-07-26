import React from 'react';

const CreatePost = ({ profile: { profile } }) => {
    return (
        <div>
            {profile && <img src={profile.user.avatar} width='100' height='100' alt="#" />}
            <p>Title</p>
            <input type="text" />
            <p>Text</p>
            <input type="text" />
        </div>
    )
}

export default CreatePost;