import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAim } from '../../../actions/aim';

// display goals by hierarchy
// goals CRUD

const AimTree = ({ deleteAim, aim, setEdit, postToggle, setPostData, postData }) => {

    return (aim &&
        <div className='group-elements' >
            <div className='title'>
                {aim.title}
            </div>
            <div>
                <i
                    className='fas fa-pen-square show-hover'
                    onClick={() => setEdit({
                        toggle: true,
                        id: aim._id,
                        title: aim.title,
                        complete: aim.complete
                    })
                    } >
                    <span className="tooltip">edit</span>
                </i>
                <i className='fas fa-comment-alt show-hover' onClick={() => {
                    postToggle({ toggle: true, id: aim._id, title: aim.title });
                    setPostData({
                        ...postData,
                        aim: {
                            aim: aim._id,
                            title: aim.title
                        }
                    })
                }}>
                    <span className="tooltip">share your progress</span>
                </i>
                <i className='fas fa-times-circle show-hover' onClick={() => deleteAim(aim._id)}>
                    <span className="tooltip">delete</span>
                </i>
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