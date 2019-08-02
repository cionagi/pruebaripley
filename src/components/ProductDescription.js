import React, { Component } from "react";

class ProductDescription extends Component {
  render() {
    const { longDescription } = this.props;
    return (
      <div className={"row mt-5 mb-5"}>
        <div className={"col-12 text-justify"}>
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
