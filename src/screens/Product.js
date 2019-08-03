//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";

//  Components
import Gallery from "../components/Gallery";
import Prices from "../components/Prices";
import ProductTitle from "../components/ProductTitle";
import ProductDescription from "../components/ProductDescription";
import RecentlySeen from "../components/RecentlySeen";
import ButtonAddCart from "../components/ButtonAddCart";

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
      products: { isFetching }
    } = this.props;

    const { productId } = this.state;
    if (
      isFetching !== nextProps.products.isFetching &&
      !nextProps.products.isFetching
    ) {
      this.setState({
        loading: false,
        product: nextProps.products.list[productId].infoComplete
      });
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

    return (
      <div>
        <div className="row justify-content-center">
          <div className={"col-7"}>
            <Gallery images={images} />
          </div>
          <div className={"col-5"}>
            <div className="row justify-content-center">
              <ProductTitle partNumber={partNumber} name={name} />
              <Prices prices={prices} />
              <div className={"col"}>GARANTIA</div>
              <div className={"col"}>
                {" "}
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
    const { loading } = this.state;

    return (
      <div>
        <div className="container-fluid header" />
        <div className="container cont-index">
          <div className="row justify-content-center">
            {loading ? <span>Loading...</span> : this.drawProduct()}
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
