import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import ProfileSetup from '../aim/ProfileSetup.component';

// display profile's goals
// if no goals have been populated, display the setup page
// group by goals tree (requires DB edits)

const Aim = ({ getMyProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getMyProfile();
    }, []);



    return (
        loading && profile === null ? (
            <Fragment> Replace me with Loading </Fragment>
        ) : (
                <Fragment>
                    <h1> Welcome {user && user.name}</h1>
                    {profile !== null ?
                        <Fragment> Render aim GUI</Fragment>
                        :
                        <ProfileSetup />
                    }
                </Fragment>
            )
    )
}

Aim.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getMyProfile })(Aim);