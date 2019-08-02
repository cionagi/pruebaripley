import React, { Component } from "react";

class ProductTitle extends Component {
  
  render() {
    const {formattedListPrice, formattedOfferPrice, formattedCardPrice, ripleyPuntos, discountPercentage} = this.props.prices
    return (
      <div className={'row mb-5'}>
        <div className={'col-12'}>Normal {formattedListPrice}</div>
        <div className={'col-12'}>Internet {formattedOfferPrice}</div>
        <div className={'col-12'}>Tarjeta Ripley {formattedCardPrice}</div>
        <div className={'col-12'}>Descuento {discountPercentage}%</div>
        <div className={'col-12'}>Acumulas2400 {ripleyPuntos} RipleyPuntos GO</div>
      </div>
    )
  }
}

export default ProductTitle;
