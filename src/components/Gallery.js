import React, { Component } from "react";
import ImageGallery from "react-image-gallery";

class Gallery extends Component {
  render() {
    const images = this.props.images.map( (img) => {
        return(
          {
            original: `https:${img}`,
            thumbnail: `https:${img}`,
          }
        )
    })
    return <ImageGallery lazyLoad={true} items={images} />;
  }
}

export default Gallery;
