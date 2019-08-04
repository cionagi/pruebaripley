import React, { Component } from "react";

class ProductTitle extends Component {
  
  render() {
    const {partNumber, name, shortDescription} = this.props
    return (
      <div className={'col-12 mb-5 product-title'}>
        <div className={'col-12 name'}>{name}</div>
        <div className={'col-12'}>{shortDescription}</div>
        <div className={'col-12'}><strong>SKU</strong> {partNumber}</div>
      </div>
    )
  }
}

export default ProductTitle;
