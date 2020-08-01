import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';
import { getAims, getAim } from '../../../actions/aim';
import ProfileSetup from '../aim/ProfileSetup.component';
import AimTree from './AimTree.component';
import AimForm from './AimForm.component';
import CreatePost from '../boards/CreatePost.component';
import Posts from '../boards/Posts.component';


const Aim = ({ getMyProfile, getAims, getPosts, getAim, post: { posts, loading: postLoading }, auth: { isAuthenticated, user }, profile: { profile, loading }, aim: { aim, aims, loading: loadAim } }) => {
    useEffect(() => {
        getMyProfile();
        getAims();
        getPosts();
    }, [getMyProfile, getAims, getPosts, loadAim, loading, postLoading]);

    const [edit, setEdit] = useState({
        toggle: false,
        id: '',
        title: '',
        complete: ''
    });
    const [createPost, postToggle] = useState({
        toggle: false,
        id: ''
    });

    if (createPost.toggle && aim) {
        getAim(createPost.id)
        postToggle({ ...createPost, id: aim._id })
    }

    return (!loading && !loadAim && isAuthenticated &&
        <Fragment>
            {loading && profile === null ? <Fragment> Replace me with Loading </Fragment> : (
                <div className="aim-page">
                    {profile !== null ?
                        <div className='aim-page-grid'>
                            <div className="branch-container">
                                <div className='aim-heading'>
                                    <p className='page-title'>Goals</p>
                                    <div className='list-goals'>
                                        {profile.goals.map(goal => <p key={goal} className='goal'>{goal}</p>)}
                                    </div>
                                    <div className="buttons">
                                        <Link to='/profile' className='btn btn-regular' >edit in profile</Link>
                                        <i
                                            className='fas fa-plus-circle btn-big'
                                            onClick={() => setEdit({
                                                toggle: true,
                                                id: 'new',
                                                title: '',
                                                complete: false
                                            })
                                            } >
                                            <span className="info">Add a stepping stone</span>
                                        </i>
                                    </div>
                                </div>
                                <div className='aim-content'>
                                    {aims && aims.map(aim => (
                                        <AimTree
                                            key={aim._id}
                                            aim={aim}
                                            edit={edit}
                                            setEdit={setEdit}
                                            postToggle={postToggle}

                                        />))}
                                </div>
                            </div>
                            <div className="posts-container">
                                <p className='page-title'>Progress</p>
                                {posts && posts.map(post => post.user === user._id && <Posts key={post._id} post={post} />)}
                            </div>
                        </div>
                        :
                        <ProfileSetup />}
                </div>
            )}
            {edit.toggle &&
                <AimForm
                    setEdit={setEdit}
                    edit={edit}
                />}
            {createPost.toggle &&
                <div className="floating-post">
                    <CreatePost
                        aimData={aim}
                        aimId={createPost.id}
                        postToggle={postToggle}
                    />
                    <button
                        className='btn'
                        onClick={e => {
                            e.preventDefault();
                            postToggle({
                                toggle: false
                            })
                        }}>Close</button>
                </div>
            }
        </Fragment>
    )
}


Aim.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    getAims: PropTypes.func.isRequired,
    getAim: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    aim: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    aim: state.aim,
    post: state.post
})

export default connect(mapStateToProps, { getMyProfile, getAims, getAim, getPosts })(Aim);