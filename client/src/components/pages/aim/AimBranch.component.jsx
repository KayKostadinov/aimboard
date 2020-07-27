import React from 'react';



const AimBranch = props => {


    return (
        <li key={props.id} id={props.id} onClick={e => props.handleClick(e)} className={`${props.level}`}>{props.title}</li>
    )
}

export default AimBranch;