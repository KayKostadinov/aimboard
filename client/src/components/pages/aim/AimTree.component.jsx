import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAims, createAim} from '../../../actions/aim';


const AimTree = ({ getAims, createAim, aim: {aim, loading}}) => {
    useEffect(() => {
        getAims();
    }, [])
    

    return (
        !loading && <h1>asdsa</h1>
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

export default connect(mapStateToProps, {getAims, createAim})(AimTree);