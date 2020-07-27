import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import ProfileSetup from '../aim/ProfileSetup.component';
import AimTree from './AimTree.component';
import { getAims } from '../../../actions/aim';

// display profile's goals
// if no profile has been created, display the profile setup page
// group by goals tree

const Aim = ({ getMyProfile, getAims, auth: { user }, profile: { profile, loading }, aim }) => {
    useEffect(() => {
        getMyProfile();
        getAims();
    }, [getMyProfile, getAims]);


    return (
        loading && profile === null ? (
            <Fragment> Replace me with Loading </Fragment>
        ) : (
                <Fragment>
                    <h1> Welcome {user && user.name}</h1>
                    {profile !== null && aim.aim ?
                        <AimTree aims={aim.aim} />
                        :
                        <ProfileSetup />
                    }
                </Fragment>
            )
    )
}

Aim.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    getAims: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    aim: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    aim: state.aim
})

export default connect(mapStateToProps, { getMyProfile, getAims })(Aim);