import React, { useState } from 'react';



const AimBranch = ({aims, formData}) => {
    
    const [edit, setEdit] = useState(false);
    const [parent, setParent] = useState({
        toggle: false,
        lvl0: '',
        lvl1: '',
        lvl2: '',
        lvl3: '',
        lvl4: '',
    });

    


    return (
        <div className='branch-container'>
            <ul className='branch-group lvl-0'>
                { aims.map(x => x.level === 0 && 
                    <div className='group-elements' key={`${x.title}${x._id}`}>
                        <li key={x._id} id={x._id} onClick={e => setParent({ lvl0: e.target.id, toggle: !parent.toggle})} className={`${x.level}`}>{x.title}</li>
                        <i className='fas fa-plus-circle'></i>
                        <i className='fas fa-arrow-alt-circle-right'></i>
                        <i className='fas fa-pen-square'></i>
                    </div>
                )}
            </ul>
            {parent.toggle &&
                <div className='toggle-list'>
                    <ul className='branch-group lvl-1'>
                        { aims.map(x => x.level === 1 && x.parent === parent.lvl0 &&
                            <div className='group-elements' key={`${x.title}${x._id}`}>
                                <li key={x._id} id={x._id} onClick={e => setParent({ ...parent, lvl1: e.target.id})} className={`${x.level}`}>{x.title}</li>
                                <i className='fas fa-plus-circle'></i>
                                <i className='fas fa-arrow-alt-circle-right'></i>
                                <i className='fas fa-pen-square'></i>
                            </div>
                        )}
                    </ul>
                    <ul className='branch-group lvl-2'>
                        { aims.map(x => x.level === 2 && x.parent === parent.lvl1 &&
                            <div className='group-elements' key={`${x.title}${x._id}`}>
                                <li key={x._id} id={x._id} onClick={e => setParent({ ...parent, lvl2: e.target.id})} className={`${x.level}`}>{x.title}</li>
                                <i className='fas fa-plus-circle'></i>
                                <i className='fas fa-arrow-alt-circle-right'></i>
                                <i className='fas fa-pen-square'></i>
                            </div>
                        )}
                    </ul>
                    <ul className='branch-group lvl-3'>
                        { aims.map(x => x.level === 3 && x.parent === parent.lvl2 &&
                            <div className='group-elements' key={`${x.title}${x._id}`}>
                                <li key={x._id} id={x._id} onClick={e => setParent({ ...parent, lvl3: e.target.id})} className={`${x.level}`}>{x.title}</li>
                                <i className='fas fa-plus-circle'></i>
                                <i className='fas fa-arrow-alt-circle-right'></i>
                                <i className='fas fa-pen-square'></i>
                            </div>
                        )}
                    </ul>
                    <ul className='branch-group lvl-4'>
                        { aims.map(x => x.level === 4 && x.parent === parent.lvl3 &&
                            <div className='group-elements' key={`${x.title}${x._id}`}>
                                <li key={x._id} id={x._id} onClick={e => setParent({ ...parent, lvl4: e.target.id})} className={`${x.level}`}>{x.title}</li>
                                <i className='fas fa-plus-circle'></i>
                                <i className='fas fa-arrow-alt-circle-right'></i>
                                <i className='fas fa-pen-square'></i>
                            </div>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}

export default AimBranch;