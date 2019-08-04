import React, { Component } from "react";

class ButtonAddCart extends Component {
  render() {
    return (
      <div className={"row"}>
        <div className={"col-12"}>
          <div className={"col-xs-4 col-sm-4 col-lg-3"} />
          <div className={"col-xs-8 col-sm-8 col-lg-9"}>
            <button type="button" className={"btn btn-primary"}>
              Agregar a la bolsa
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonAddCart;
