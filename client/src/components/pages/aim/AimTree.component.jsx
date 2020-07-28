import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAim, updateAim } from '../../../actions/aim';
import AimBranch from './AimBranch.component';

// display goals by hierarchy
// goals CRUD

const AimTree = ({ createAim, updateAim, aims }) => {
    const [formData, setFormData] = useState({
        title: '',
        level: 0,
        complete: false,
        parent: '',
        deadline: ''
    })

    const [parent, setParent] = useState({
        toggle: false,
        lvl0: '',
        lvl1: '',
        lvl2: '',
        lvl3: '',
        lvl4: '',
    });

    const [buttons, setButtons] = useState({
        add: false,
        edit: false,
        delete: false
    })

    //
    return (
        <div className='branch-container' >
            <ul className='branch-group lvl-0'>
                {aims && aims.map(aim => (aim.level === 0 &&
                    <div className='group-elements' key={aim._id}>
                        <AimBranch
                            id={aim._id}
                            title={aim.title}
                            handleClick={e => setParent({ lvl0: e.target.id, toggle: !parent.toggle })}
                        />
                        <i className='fas fa-plus-circle' id='add' >
                            <span className="tooltip">add a stepping stone</span>
                        </i>
                        <i className='fas fa-pen-square' id='edit' >
                            <span className="tooltip">edit</span>
                        </i>
                        <i className='fas fa-times-circle' id='delete' >
                            <span className="tooltip">delete</span>
                        </i>
                    </div>
                ))}
            </ul>
            {parent.toggle &&
                <div className='toggle-list'>
                    <ul className='branch-group lvl-1'>
                        {aims && aims.map(aim => (aim.level === 1 && aim.parent === parent.lvl0 &&
                            <AimBranch
                                key={aim._id}
                                id={aim._id}
                                level={aim.level}
                                title={aim.title}
                                handleClick={e => setParent({ ...parent, lvl1: e.target.id })}

                            />
                        ))}
                    </ul>
                    <ul className='branch-group lvl-2'>
                        {aims && aims.map(aim => (aim.level === 2 && aim.parent === parent.lvl1 &&
                            <AimBranch
                                key={aim._id}
                                id={aim._id}
                                level={aim.level}
                                title={aim.title}
                                handleClick={e => setParent({ ...parent, lvl2: e.target.id })}

                            />
                        ))}
                    </ul>
                    <ul className='branch-group lvl-3'>
                        {aims && aims.map(aim => (aim.level === 3 && aim.parent === parent.lvl2 &&
                            <AimBranch
                                key={aim._id}
                                id={aim._id}
                                level={aim.level}
                                title={aim.title}
                                handleClick={e => setParent({ ...parent, lvl3: e.target.id })}

                            />
                        ))}
                    </ul>
                    <ul className='branch-group lvl-4'>
                        {aims && aims.map(aim => (aim.level === 4 && aim.parent === parent.lvl3 &&
                            <AimBranch
                                key={aim._id}
                                id={aim._id}
                                level={aim.level}
                                title={aim.title}
                                handleClick={e => setParent({ ...parent, lvl4: e.target.id })}

                            />
                        ))}
                    </ul>
                </div>
            }
        </div>
    )

}

AimTree.propTypes = {
    createAim: PropTypes.func.isRequired,
    updateAim: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
//     aim: state.aim,
// })

export default connect(null, { createAim, updateAim })(AimTree);