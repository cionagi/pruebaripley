//Dependency
import React, { Component } from 'react'
import redux, { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { callGetProductsByPartNumbers } from './../store/actions/Products'

class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { actions: {callGetProductsByPartNumbers } } = this.props
        callGetProductsByPartNumbers('2000372107077P,2000369725000P')
    }

    render() {
        return (
            <div className="container">
                <div>Products</div>
            </div>
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
            callGetProductsByPartNumbers,
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
