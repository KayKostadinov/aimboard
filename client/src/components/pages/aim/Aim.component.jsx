import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../../actions/profile';
import { getAims, getAim } from '../../../actions/aim';
import ProfileSetup from '../aim/ProfileSetup.component';
import AimTree from './AimTree.component';
import AimForm from './AimForm.component';
import CreatePost from '../boards/CreatePost.component';


const Aim = ({ getMyProfile, getAims, getAim, auth: { isAuthenticated }, profile: { profile, loading }, aim: { aim, aims, loading: loadAim } }) => {
    useEffect(() => {
        getMyProfile();
        getAims();
    }, [getMyProfile, getAims, loadAim, loading]);

    const [edit, setEdit] = useState({
        toggle: false,
        id: '',
        title: '',
        level: 0,
        parent: '',
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
                <div className="branch-container">
                    {profile !== null && aims ? aims.map(aim => (
                        <AimTree
                            key={aim._id}
                            aim={aim}
                            edit={edit}
                            setEdit={setEdit}
                            postToggle={postToggle}

                        />))
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
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    aim: state.aim
})

export default connect(mapStateToProps, { getMyProfile, getAims, getAim })(Aim);