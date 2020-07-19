import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileSetup = props => {
    const [formData, setFormData] = useState({
        about: '',
        goals: '',
        interests: '',
        social: {
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: ''
        },
    });

    return (
        <div>Create profile setup form</div>
    )
}

// ProfileSetup.propTypes = {

// }

// const mapStateToProps = state => ({

// })

export default connect(null)(ProfileSetup);