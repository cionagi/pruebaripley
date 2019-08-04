import React, { Component } from "react";

class Prices extends Component {
  
  render() {
    const {formattedListPrice, formattedOfferPrice, formattedCardPrice, ripleyPuntos, discountPercentage} = this.props.prices
    return (
      <div className={'col-12 mb-5 product-detail-prices'}>
        <div className={'col-12 formattedListPrice mb-1'}><strong>Normal</strong> {formattedListPrice}</div>
        <div className={'col-12 formattedOfferPrice mb-1'}><strong>Internet</strong> {formattedOfferPrice}</div>
        {
          formattedCardPrice &&
          <div>
          <div className={'col-12 formattedCardPrice mb-1'}><strong>Tarjeta Ripley</strong>  {formattedCardPrice}</div>
          <div className={'col-12 discountPercentage mb-1'}><strong>Descuento</strong>  {discountPercentage}%</div>
          </div>
        }
         <div className={'col-12 ripleyPuntos mb-1'}><strong>Acumulas2400</strong> {ripleyPuntos} RipleyPuntos GO</div>
      </div>
    )
  }
}

export default Prices;
