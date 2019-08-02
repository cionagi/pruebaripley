//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {PRODUCTSSKUS} from '../constans/productsSku'
//  Components

import ProductCard from '../components/ProductCard'

// Actions
import { callGetProducts } from "./../store/actions/Products";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        loading: true,
        list: []
    };
  }
  componentDidMount() {
    const {
      actions: { callGetProducts }
    } = this.props;
    callGetProducts(PRODUCTSSKUS);
  }

  componentWillReceiveProps(nextProps) {
   const {products, products:{isFetching}} = this.props

   if(isFetching !== nextProps.products.isFetching && !nextProps.products.isFetching){
this.setState({
    loading:false,
    list: nextProps.products.list,
})
   }
  }

  drawProducts = () => {
    const {list} = this.state
    const productList = Object.keys(list).map( (product, index) => {
    return <ProductCard product={list[product]} key={`product-${index}-${list[product].uniqueID}`} />
  })

return productList
  }

  render() {
    const { loading } = this.state;
    
    return (
      <div>
        <div className="container-fluid">Headet</div>

        <div className="container">
          <div className="row justify-content-center">
            {
                loading ? (<span>Loading...</span>) : this.drawProducts() 
                }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({callGetProducts},dispatch)};
};

export default connect(mapStateToProps,mapDispatchToProps)(Index);
