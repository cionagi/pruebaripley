//Dependency
import React, { Component } from "react";
import redux, { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RecentlySeenCard from "./RecentlySeenCard";

class RecentlySeen extends Component {
  drawProductRecentlyViewed = () => {
    const { recentlyViewed } = this.props;
    return recentlyViewed.map(productId => {
      return (
        <RecentlySeenCard
          product={this.props.products.list[productId]}
          key={productId}
        />
      );
    });
  };

  render() {
    return (
      <div className={"row mb-5"}>
        <div className={"col-12"}>
          <h4 className={"mb-5"}>Vistos recientemente</h4>
          <div className={"row"}>{this.drawProductRecentlyViewed()}</div>
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
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentlySeen);
