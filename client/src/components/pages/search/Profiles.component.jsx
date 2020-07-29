import React, { useState } from 'react';


const Profiles = ({ profile }) => {
    return (profile &&
        <div className='display-profile'>
            <img src={profile.user.avatar} width='30' className='avatar' />
            <div className="info">
                <p>{profile.user.name}</p>
                {profile.interests && profile.interests.map(int => <p key={int}>{int}</p>)}
                <p>{profile.about}</p>
            </div>
        </div>
    )
}

export default Profiles;
