import React, { useState } from 'react';


const Profiles = props => {

    return (
        <div>
            {props.profiles.map(x => <p key={x._id}>{x.user.name}</p>)}
        </div>
    )
}

export default Profiles;
