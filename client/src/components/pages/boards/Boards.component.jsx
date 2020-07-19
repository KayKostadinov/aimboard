import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';

// fetch data from db
// order by date

const Boards = ({ getMyProfile, auth, profile }) => {
    useEffect(() => {
        getMyProfile();

    }, []);

    return (
        <div className='container'>
            boards page
        </div>
    )
}

Boards.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getMyProfile })(Boards);