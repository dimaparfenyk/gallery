import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalPortal = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.props.onClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.props.onClose);
  }

  onOverlayClick = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      this.props.onClose();
    }
  };
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalPortal
    );
  }
}

export default Modal;
