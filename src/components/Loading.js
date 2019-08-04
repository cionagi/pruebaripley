import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center" >
        <div className="spinner-border loading-custom" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loading;
