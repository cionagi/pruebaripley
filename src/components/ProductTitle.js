import React, { Component } from "react";

class ProductTitle extends Component {
  
  render() {
    const {partNumber, name,} = this.props
    return (
      <div className={'row mb-5'}>
        <div className={'col-12'}>{name}</div>
        <div className={'col-12'}>{partNumber}</div>
      </div>
    )
  }
}

export default ProductTitle;
