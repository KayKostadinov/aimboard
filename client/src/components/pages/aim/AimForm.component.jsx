import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateAim, createAim } from '../../../actions/aim';

const AimForm = ({ updateAim, createAim, edit, setEdit }) => {

    const [formData, setFormData] = useState({
        title: edit.title,
        level: edit.level,
        complete: edit.complete,
        parent: edit.parent,
    })

    return (
        <div className="aim-form-container">
            <form
                className='aim-form'
                onSubmit={e => {
                    if (edit.id === 'new') {
                        setFormData({ ...formData, level: formData.level++ })
                        createAim(formData);
                    } else {
                        updateAim(formData, edit.id);
                    }
                    setEdit({
                        toggle: false,
                        id: ''
                    });
                }}>
                <div className="form-group">
                    <label>Name your Aim</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="form-group checkbox">
                    <input type="checkbox"
                        name='complete'
                        checked={formData.complete}
                        onChange={e => setFormData({ ...formData, complete: e.target.checked })} />
                    <label htmlFor='complete'>Complete?</label>
                </div>
                <div className="buttons">
                    <button type='button' className='btn' onClick={e => {
                        e.preventDefault();
                        setEdit({
                            toggle: false,
                            id: ''
                        })
                    }}>
                        Cancel</button>
                    <button className='btn' type='submit'>Save</button>
                </div>
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