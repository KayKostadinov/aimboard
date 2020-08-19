
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getMyProfile, deleteProfile } from '../../../actions/profile';
import Alert from '../../layout/Alert.component';

// TODO: add form fields for social media links

const EditProfile = ({ createProfile, getMyProfile, deleteProfile, profile: { profile, loading }, history }) => {
    const [formData, setFormData] = useState({
        about: '',
        interests: '',
        goals: '',
        social: {
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: ''
        },
    });

    const [userData, setUserData] = useState({
        avatar: '',
        name: ''
    })

    useEffect(() => {
        getMyProfile();

        if (profile) {
            setUserData({
                avatar: profile.user.avatar,
                name: profile.user.name
            })
            setFormData({
                about: loading || !profile.about ? '' : profile.about,
                interests: loading || !profile.interests ? '' : profile.interests.join(', '),
                goals: loading || !profile.goals ? '' : profile.goals.join(', '),
                social: {
                    youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
                    twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
                    facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
                    instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
                    linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
                },
            })
        }
    }, [loading]);


    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSocialChange = e => {
        setFormData({ ...formData, social: { ...formData.social, [e.target.name]: e.target.value } });
    }

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    const handleDelete = e => {
        e.preventDefault();
        e.stopPropagation();
        deleteProfile();
    }

    return (
        loading && !profile ? null : (
            <div className="profile-container">
                <div className="form-container">
                    <Alert />
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        {!loading && profile &&
                            <div className="user">
                                <img src={userData.avatar} alt="" className='avatar' />
                                <h4>{userData.name}</h4>
                            </div>
                        }
                        <div className="about">
                            <h3>About</h3>
                            <div className="form-group">
                                <label htmlFor="">About me</label>
                                <textarea rows='3' name='about' value={formData.about} onChange={e => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Interests</label>
                                <textarea rows='3' name='interests' value={formData.interests} onChange={e => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Goals</label>
                                <textarea rows='3' name='goals' value={formData.goals} onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className='social-media'>
                            <h3>Social media</h3>
                            <div className="form-group">
                                <i className='fab fa-youtube' />
                                <input type="text" name='youtube' value={formData.social.youtube} onChange={e => handleSocialChange(e)} />
                            </div>
                            <div className="form-group">
                                <i className='fab fa-twitter' />
                                <input type="text" name='twitter' value={formData.social.twitter} onChange={e => handleSocialChange(e)} />
                            </div>
                            <div className="form-group">
                                <i className='fab fa-facebook-square' />
                                <input type="text" name='facebook' value={formData.social.facebook} onChange={e => handleSocialChange(e)} />
                            </div>
                            <div className="form-group">
                                <i className='fab fa-instagram' />
                                <input type="text" name='instagram' value={formData.social.instagram} onChange={e => handleSocialChange(e)} />
                            </div>
                            <div className="form-group">
                                <i className='fab fa-linkedin' />
                                <input type="text" name='linkedin' value={formData.social.linkedin} onChange={e => handleSocialChange(e)} />
                            </div>
                        </div>
                        <div className="buttons">
                            <button type='button' onClick={e => handleDelete(e)} className='btn btn-danger'>Delete Profile</button>
                            <button type='submit' className='btn btn-highlight'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getMyProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getMyProfile, deleteProfile })(withRouter(EditProfile));