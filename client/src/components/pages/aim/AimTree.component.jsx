import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateAim, deleteAim } from '../../../actions/aim';

// display goals by hierarchy
// goals CRUD

const AimTree = ({ deleteAim, updateAim, aim, postToggle, setCreate }) => {

    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({ title: aim.title })

    const submit = e => {
        e.preventDefault();
        e.stopPropagation();
        updateAim(data, aim._id);
        setEdit(false)
    }

    return (aim &&
        <div className='group-elements' >
            <div className='title'>
                {edit ?
                    <form onSubmit={e => submit(e)} >
                        <input
                            autoFocus={true}
                            value={data.title}
                            onChange={e => setData({ title: e.target.value })}
                        />
                    </form>
                    :
                    aim.title
                }
            </div>
            <div className='icons'>
                <i
                    className='fas fa-pen-square icon'
                    onClick={() => setEdit(!edit)} >
                    <span className="tooltip">edit</span>
                </i>
                <i className='fas fa-comment-alt icon' onClick={() => {
                    postToggle({ id: aim._id, title: aim.title });
                    setCreate(true);
                }}>
                    <span className="tooltip">share your progress</span>
                </i>
                <i className='fas fa-times-circle icon' onClick={() => deleteAim(aim._id)}>
                    <span className="tooltip">delete</span>
                </i>
            </div>
        </div>
    )
}


AimTree.propTypes = {
    deleteAim: PropTypes.func.isRequired,
    updateAim: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
//     aim: state.aim,
// })

export default connect(null, { deleteAim, updateAim })(AimTree);