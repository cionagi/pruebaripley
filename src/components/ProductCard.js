// Dependency
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import {Link} from 'react-router-dom'

// Actions

// Components

// Assets


class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        loading: true,
        product: this.props.product
    };
  }

  componentWillMount() {
      console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const {product} = this.state
    const priceOfferColorClass = !product.prices.formattedCardPrice ? 'price-offer-color' : null
    return (
      <div className="col-sm-6 col-lg-3">
         <Link to={`/product/${product.uniqueID}`} className="product-link">
        <div className={'product-card'}>
          
          <div className={'product-image-container'}>
            <div style={{paddingBottom: '75%'}}></div>
            <div className={'product-image-prop'}>
              <img className={'product-image'} src={product.images[0]}></img>
            </div>
          </div>

          <div className={'product-detail'}>
            <div className={'product-detail-brand'}>{product.name} BRAND</div>
            <div className={'product-detail-description'}>{product.shortDescription}</div>
            <div className={'product-prices'}>
            <div className={'product-detail-formattedListPrice'}>{product.prices.formattedListPrice}</div>
            <div className={`product-detail-formattedOfferPrice font-weight-bold ${priceOfferColorClass}`}>{product.prices.formattedOfferPrice}</div>

            { !priceOfferColorClass &&
              <div className={'product-detail-formattedCardPrice font-weight-bold price-offer-color'}>
                {product.prices.formattedCardPrice}
                <img class="product-prices-card" src="//static.ripley.cl/images/opex.png" alt="Precio Tarjeta Ripley"></img>
              </div>
            }
            </div>
           
          </div>

        </div>
        </Link>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
