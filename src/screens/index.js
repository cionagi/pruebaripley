//Dependency
import React, {Component} from 'react'
import redux, {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// Actions
import {callGetProductById, callGetProductsByPartNumbers, callGetProductByPartNumber} from './../store/actions/Products'

class Index extends Component {
    constructor(props) {
        super(props);
    }

componentDidMount() {
    const {actions:{callGetProductById, callGetProductsByPartNumbers, callGetProductByPartNumber}} = this.props
    callGetProductById("11657331")
    callGetProductsByPartNumbers('2000372107077P,2000369725000P')
    callGetProductByPartNumber('2000372107077P')
}

    render() { 
        return (  
            <div>HOLA</div>
        );
    }
}
 

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            callGetProductById,
            callGetProductsByPartNumbers,
            callGetProductByPartNumber
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
