import React, { Component } from "react";
import { Link } from "react-router-dom";
class RecentlySeenCard extends Component {
  render() {
    const { images, name, uniqueID } = this.props.product;
    return (
      <div className={"col-4 product-seen-card"}>
        <Link to={`/product/${uniqueID}`} className="product-link">
          <div className={"product-seen-con-img"}>
            <img className={"product-seen-image"} src={images[0]} />
          </div>
          <div className={"product-seen-con-name"}>
            <span className={"product-seen-namee"}>{name}</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default RecentlySeenCard;
