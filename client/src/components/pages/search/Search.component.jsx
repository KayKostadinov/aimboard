import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profiles from './Profiles.component';
import Posts from '../boards/Posts.component';
import { getAllProfiles } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';

// get all posts
// get all topics/ interests and filter by them


const Search = ({ getAllProfiles, getPosts, profile: { profiles, loading }, post: { posts, loading: postLoading } }) => {
    useEffect(() => {
        getAllProfiles();
        getPosts();
    }, [loading, postLoading, getAllProfiles, getPosts])

    const [searchValue, setValue] = useState('');
    const [profileResult, setProfileRes] = useState();
    const [postResult, setPostRes] = useState();
    const [btn, setBtn] = useState(true);

    function searchAll(searchValue) {
        setProfileRes(profiles.filter(profile => profile.user.name.search(searchValue) || profile.about.search(searchValue)))
    }

    console.log(profileResult)

    return (
        <div>
            <h3>Search page</h3>
            <form onSubmit={e => {
                e.preventDefault();
                searchAll(searchValue);
            }}>
                <i className="fas fa-search" />
                <input
                    id="search"
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    onChange={e => setValue(e.target.value)}
                />
            </form>
            <div className="tabs">
                <button onClick={() => setBtn(true)}>Posts</button>
                <button onClick={() => setBtn(false)}>Users</button>
            </div>
            {(!btn ?
                profileResult.map(profile => <Profiles key={profile._id} profile={profile} />)
                :
                posts.map(post => <Posts key={post._id} post={post}></Posts>))
            }
        </div>
    )
}

Search.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile,
    post: state.post,
})

export default connect(mapStateToProps, { getAllProfiles, getPosts })(Search);
