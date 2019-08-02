//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";

//  Components
import Gallery from "../components/Gallery"

// Actions
import { callGetProductById } from "./../store/actions/Products";

class Index extends Component {
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
      actions: { callGetProductById }
    } = this.props;

    callGetProductById(this.state.productId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      products,
      products: { isFetching }
    } = this.props;

    const {productId} = this.state
    if (
      isFetching !== nextProps.products.isFetching &&
      !nextProps.products.isFetching
    ) {
      console.log(nextProps.products.list.infoComplete)
      this.setState({
        loading: false,
        product: nextProps.products.list[productId].infoComplete
      });
    }
  }

  drawProduct = () => {
    const {product,product:{images}} = this.state
      console.log(product)

    return(
      <div>
      <div className="row justify-content-center">
        <div className={"col-7"}>

        <Gallery images={images}/>

        </div>
        <div className={"col-5"}>
          <div className="row justify-content-center">
            <div className={"col"}>PRECIO</div>
            <div className={"col"}>GARANTIA</div>
            <div className={"col"}>BOLSA</div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className={"col-12"}>PRODUCT OFFER</div>
        <div className={"col-12"}>COLLAPSES</div>
        <div className={"col-12"}>OTHER CLIENTS VIEWS RECIEN VISTOS</div>
        <div className={"col-12"}>RECIEN VISTOS</div>
      </div>
    </div>
    )
    
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
  return { actions: bindActionCreators({ callGetProductById }, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
