import React, { Component } from "react";

class ButtonAddCart extends Component {
  render() {
    return (
      <div className={"row"}>
        <div className={"col-12"}>
          <div className="no-gutter clearfix">
            <div className="col-xs-4 col-sm-4 col-lg-3">
              <div className="stepper custom-select product-quantity-input">
                <button
                  className="stepper-control stepper-control-decrease"
                  title="Menos"
                >
                  -
                </button>
                <div className="stepper-value">1</div>
                <button
                  className="stepper-control stepper-control-increase"
                  title="Más"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-xs-8 col-sm-8 col-lg-9">
              <div>
                <button
                  id="buy-button"
                  className="btn-loading  btn-primary btn-loading js-buy-button"
                >
                  Agregar a la bolsa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonAddCart;
