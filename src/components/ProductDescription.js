import React, { Component } from "react";

class ProductDescription extends Component {
  render() {
    const { longDescription } = this.props;
    return (
      <div className={"mt-5 mb-5"}>
        <div className={"col-12 text-justify product-description-html"}>
          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />
        </div>
      </div>
    );
  }
}

export default ProductDescription;


