import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profiles from './Profiles.component';
import { getAllProfiles } from '../../../actions/profile';
// get all posts
// get all topics/ interests and filter by them


const Search = ({ getAllProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getAllProfiles();
    }, [loading, getAllProfiles])

    return (
        <div>
            <p>Search page</p>
            <Profiles profiles={profiles} />
        </div>
    )
}

Search.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Search);
