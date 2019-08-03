//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PRODUCTSSKUS } from "../constans/productsSku";
import { Link } from "react-router-dom";

//  Components
import ProductCard from "../components/ProductCard";
import AlertMsg from "../components/AlertMsg";

// Actions
import { callGetProducts } from "./../store/actions/Products";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      text: '',
      error: false,
      limit: 4,
      offset: 0,
    };
  }
  componentDidMount() {
    const {
      actions: { callGetProducts },
    } = this.props;
    const {limit,offset} = this.state
    callGetProducts({limit,offset});
  }

  componentWillReceiveProps(nextProps) {
    const {
      products,
      products: { isFetching },
      actions: { callGetProducts }
    } = this.props;
    const {limit,offset} = this.state
    if ( isFetching !== nextProps.products.isFetching && !nextProps.products.isFetching) {

      if(nextProps.products.hasError){
        if(nextProps.products.hasProducts) callGetProducts({limit,offset});
        this.setState({
          error: true,
          text: 'Tenemos pequeños problemas en estos momentos.'
        });
      }else{
        this.setState({
          error: false,
          text:'',
          loading: false,
          list: nextProps.products.list,
          offset: offset + limit,
        });
        callGetProducts({
          limit,
          offset: offset + limit
        });
      }
    }
  }

  drawProducts = () => {
    const { list } = this.state;
    const productList = Object.keys(list).map((product, index) => {
      return (
        <ProductCard
          product={list[product]}
          key={`product-${index}-${list[product].uniqueID}`}
        />
      );
    });

    return productList;
  };

  render() {
    const { loading,error } = this.state;

    return (
      <div>
        <div className="container-fluid header" />
        <div className="container cont-index">
          <div className="row justify-content-center">
            <div className={'col-12'}>
            {error &&<AlertMsg text={this.state.text} />}
            </div>
            {loading ? <div className={'col-12 text-center'}>Loading...</div> : this.drawProducts()}
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
  return { actions: bindActionCreators({ callGetProducts }, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
