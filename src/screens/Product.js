//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//  Components
import Gallery from "../components/Gallery";
import Prices from "../components/Prices";
import ProductTitle from "../components/ProductTitle";
import ProductDescription from "../components/ProductDescription";
import RecentlySeen from "../components/RecentlySeen";
import ButtonAddCart from "../components/ButtonAddCart";
import Loading from "../components/Loading";

// Actions
import {
  callGetProductById,
  addProductRecentlyViewed
} from "./../store/actions/Products";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productId: this.props.match.params.productId,
      product: null
    };
  }
  componentDidMount() {
    const {
      actions: { callGetProductById, addProductRecentlyViewed }
    } = this.props;
    callGetProductById(this.state.productId);
    addProductRecentlyViewed(this.state.productId);
  }

  componentWillReceiveProps(nextProps) {

    const {
      products,
      products: { isFetchingProductId },
      match,
      actions: { callGetProductById, addProductRecentlyViewed }
    } = this.props;

    const { productId } = this.state;
    if (
      isFetchingProductId !== nextProps.products.isFetchingProductId &&
      !nextProps.products.isFetchingProductId
    ) {
      this.setState({
        loading: false,
        product: nextProps.products.product
      });
    }

    if(this.props.match.params.productId !== nextProps.match.params.productId){
      this.setState({
        loading: true,
        productId:nextProps.match.params.productId,
        product: null
      });
      callGetProductById(nextProps.match.params.productId);
      addProductRecentlyViewed(nextProps.match.params.productId);
    }
  }

  drawProduct = () => {
    const {
      product,
      productId,
      product: {
        images,
        prices,
        shortDescription,
        longDescription,
        partNumber,
        name
      }
    } = this.state;
    // console.log(this.state.product.images,productId)
    return (
      <div className={"col-12"} key={`product-only-${productId}`}>
        <div className="row justify-content-center">
          <div className={"col-12 col-sm-7"}>
            <Gallery images={images} />
          </div>
          <div className={"col-12 col-sm-5"}>
            <div className="row justify-content-center">
              <ProductTitle partNumber={partNumber} name={name}  shortDescription={shortDescription}/>
              <Prices prices={prices} />
              <div className={"col"}>
                <ButtonAddCart />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={"col-12"}>
            <ProductDescription
              shortDescription={shortDescription}
              longDescription={longDescription}
            />
          </div>
          <div className={"col-12"}>
            <RecentlySeen productId={productId} recentlyViewed={this.props.products.recentlyViewed.filter(item => item !== productId)}/>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, product } = this.state;

    return (
      <div>
        <div className="container-fluid header" >
        <Link to={'/'} className={'btn-go-back'}>ATRAS</Link>
        </div>
        <div className="container cont-index">
          <div className="row justify-content-center">
            {loading ? <Loading /> : product === undefined ? <Loading />  : this.drawProduct()}
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
  return {
    actions: bindActionCreators(
      { callGetProductById, addProductRecentlyViewed },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
