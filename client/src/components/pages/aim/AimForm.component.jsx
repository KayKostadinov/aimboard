import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateAim, createAim } from '../../../actions/aim';

const AimForm = ({ updateAim, createAim, edit, setEdit }) => {

    const [formData, setFormData] = useState({
        title: edit.title,
    })

    const closeWindow = e => {
        if (e.target.className === 'aim-form-container') {
            setEdit({ ...edit, toggle: false })
        }
    }

    return (
        <div className="aim-form-container" onClick={e => closeWindow(e)}>
            <form
                className='form aim-form'
                onSubmit={e => {
                    e.preventDefault();
                    if (edit.id === 'new') {
                        createAim(formData);
                    } else {
                        updateAim(formData, edit.id);
                    }
                    setEdit({
                        toggle: false,
                        id: '',
                        complete: ''
                    });
                }}>
                <div className="form-group">
                    <label>Name your Aim</label>
                    <input type="text" className='input-text' value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <button className='btn btn-highlight' type='submit'>Save</button>
            </form>
        </div>
    )
}

AimForm.propTypes = {
    aim: PropTypes.object.isRequired,
    updateAim: PropTypes.func.isRequired,
    createAim: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    aim: state.aim
})

export default connect(mapStateToProps, { updateAim, createAim })(AimForm);