import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getPosts } from '../../../actions/post';
import { getAims, createAim } from '../../../actions/aim';
import ProfileSetup from '../aim/ProfileSetup.component';
import AimTree from './AimTree.component';
import AimForm from './AimForm.component';
import CreatePost from '../boards/CreatePost.component';
import Posts from '../boards/Posts.component';


const Aim = ({ getMyProfile, getAims, getPosts, createAim, post: { posts, loading: postLoading }, auth: { isAuthenticated, user }, profile: { profile, loading }, aim: { aims, loading: loadAim } }) => {
    useEffect(() => {
        getMyProfile();
        getAims();
        getPosts();
    }, [getMyProfile, getAims, getPosts, loadAim, loading, postLoading]);

    const [edit, setEdit] = useState({
        toggle: false,
        id: '',
        title: '',
    });

    const [createAimForm, setAim] = useState({ title: '' })

    const [createPost, postToggle] = useState({
        id: '',
        title: ''
    });

    // will make obsolete. children components will control their forms with this structure.
    const [postData, setPostData] = useState({
        text: '',
        name: '',
        aim: {
            aim: '',
            title: ''
        }
    })

    const [openCreatePost, setCreate] = useState(false);

    const formSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        createAim(createAimForm);
        setAim({ title: '' })
    }

    return (!loading && !loadAim && isAuthenticated &&
        <Fragment>
            {loading && profile === null ? <Fragment> Loading </Fragment> : (
                <div className="aim-page">
                    {profile !== null ?
                        <div className='aim-page-grid'>
                            <div className="branch-container">
                                <div className='aim-content'>
                                    <form className='add-form' onSubmit={e => formSubmit(e)}>
                                        <input
                                            placeholder='new Aim'
                                            required
                                            value={createAimForm.title}
                                            onChange={e => setAim({ title: e.target.value })}
                                        />
                                        <button type='submit' className='btn'>
                                            <i className='fas fa-plus-circle'></i>
                                        </button>
                                    </form>
                                    {aims && aims.map(aim => (
                                        <AimTree
                                            key={aim._id}
                                            id={aim._id}
                                            aim={aim}
                                            edit={edit}
                                            setEdit={setEdit}
                                            setCreate={setCreate}
                                            setPostData={setPostData}
                                            postData={postData}
                                            postToggle={postToggle}
                                        />))}
                                </div>
                            </div>
                            <div className="posts-container hide-sm">
                                {posts && posts.map(post => post.user === user._id && <Posts key={post._id} post={post} />)}
                            </div>
                        </div>
                        :
                        <ProfileSetup />}
                </div>
            )}
            {openCreatePost &&
                <CreatePost
                    img={user.avatar}
                    name={user.name}
                    aims={aims}
                    setCreate={setCreate}
                    aimId={createPost.id}
                    aimTitle={createPost.title}
                    createPost={createPost}
                />
            }
            {edit.toggle &&
                <AimForm
                    setEdit={setEdit}
                    edit={edit}
                />
            }
        </Fragment>
    )
}


Aim.propTypes = {
    getMyProfile: PropTypes.func.isRequired,
    getAims: PropTypes.func.isRequired,
    createAim: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getMyProfile, getAims, createAim, getPosts })(Aim);