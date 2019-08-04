//Dependency
import React, { Component, Fragment } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//  Components
import ProductCard from "../components/ProductCard";
import AlertMsg from "../components/AlertMsg";
import Loading from "../components/Loading";

// Actions
import { callGetProducts } from "./../store/actions/Products";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.products.hasProducts,
      list: this.props.products.list,
      text: "",
      error: false,
      limit: this.props.products.offset,
      offset: this.props.products.limit
    };
  }
  componentDidMount() {
    const {
      actions: { callGetProducts },
      products: { hasProducts, offset, limit }
    } = this.props;

    if (this.props.products.hasProducts) {
      callGetProducts({ limit, offset });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      products,
      products: { isFetching, offset, limit },
      actions: { callGetProducts }
    } = this.props;

    if (
      isFetching !== nextProps.products.isFetching &&
      !nextProps.products.isFetching
    ) {

      if (nextProps.products.hasError) {

        if (nextProps.products.hasProducts) {
          callGetProducts({
            limit: nextProps.products.limit,
            offset: nextProps.products.offset + nextProps.products.limit
          });
        }

        this.setState({
          error: true,
          text: "Tenemos pequeños problemas en estos momentos."
        });
      } else {
        this.setState({
          error: false,
          text: "",
          list: nextProps.products.list,
          offset: nextProps.products.offset + nextProps.products.limit,
          loading: nextProps.products.hasProducts
        });
        if(nextProps.products.hasProducts){
          callGetProducts({
            limit: nextProps.products.limit,
            offset: nextProps.products.offset + nextProps.products.limit
          });
        }
        
      }
    }
  }

  drawProducts = () => {
    const { list } = this.state;

    const productList = list.map((product, index) => {
      return (
        <Fragment key={product.uniqueID}>
          <ProductCard
            product={product}
            key={`product-${index}-${product.uniqueID}`}
          />
        </Fragment>
      );
    });

    return productList;
  };

  render() {
    const { loading, error } = this.state;
    // console.log(loading);
    return (
      <div>
        <div className="container-fluid header" />
        <div className="container cont-index">
          <div className="row justify-content-center">
            <div className={"col-12"}>
              {error && <AlertMsg text={this.state.text} />}
            </div>

            {this.drawProducts()}
            {loading && <div className={"col-12"}>{<Loading />}</div>}
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
