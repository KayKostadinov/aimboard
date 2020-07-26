import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAims, createAim } from '../../../actions/aim';
import AimBranch from './AimBranch.component';

// display goals by hierarchy
// goals CRUD

const AimTree = ({ getAims, createAim, aim: { aim, loading } }) => {
    const [formData, setFormData] = useState({
        title: '',
        level: 0,
        complete: false,
        parent: '',
        deadline: ''
    })

    useEffect(() => {
        getAims();

    }, [loading, getAims])



    return (
        !loading && aim && <AimBranch aims={aim} form={formData} />
    )

}

AimTree.propTypes = {
    createAim: PropTypes.func.isRequired,
    getAims: PropTypes.func.isRequired,
    aim: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    aim: state.aim,
})

export default connect(mapStateToProps, { getAims, createAim })(AimTree);