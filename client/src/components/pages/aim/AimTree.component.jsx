import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAim } from '../../../actions/aim';

// display goals by hierarchy
// goals CRUD

const AimTree = ({ deleteAim, aim, setEdit, postToggle }) => {

    return (aim &&
        <div className={`branch-group lvl${aim.level}`} >
            <div className='group-elements' >
                <div className='title'>
                    {aim.title}
                </div>
                <div>
                    <i
                        className='fas fa-plus-circle'
                        onClick={() => setEdit({
                            toggle: true,
                            id: 'new',
                            title: '',
                            level: aim.level,
                            parent: aim._id,
                            complete: false
                        })
                        } >
                        <span className="tooltip">add a stepping stone</span>
                    </i>
                    <i
                        className='fas fa-pen-square'
                        onClick={() => setEdit({
                            toggle: true,
                            id: aim._id,
                            title: aim.title,
                            level: aim.level,
                            parent: aim.parent,
                            complete: aim.complete
                        })
                        } >
                        <span className="tooltip">edit</span>
                    </i>
                    <i className='fas fa-comment-alt' onClick={() => postToggle({ toggle: true, id: aim._id })}>
                        <span className="tooltip">share your progress</span>
                    </i>
                    <i className='fas fa-times-circle' onClick={() => deleteAim(aim._id)}>
                        <span className="tooltip">delete</span>
                    </i>
                </div>
            </div>
        </div>
    )
}


AimTree.propTypes = {
    deleteAim: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
//     aim: state.aim,
// })

export default connect(null, { deleteAim })(AimTree);