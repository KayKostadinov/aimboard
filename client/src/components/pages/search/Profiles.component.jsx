import React, { useState } from 'react';


const Profiles = props => {

    console.log(props.profiles)
    return (
        <div>
            {props.profiles.map(x => <p>{x.user.name}</p>)}
        </div>
    )
}

export default Profiles;
