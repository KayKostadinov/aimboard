import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAims, createAim} from '../../../actions/aim';


const AimTree = ({ getAims, createAim, aim: {aim, loading}}) => {
    const [formData, setFormData] = useState({
        title: '',
        main: false,
        complete: false,
        children: [],
        parent: '',
        deadline: ''
    })
    
    useEffect(() => {
        getAims();

    }, [loading])



    return (
        !loading && aim.map(x=> <h2>{x.title}</h2>)
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