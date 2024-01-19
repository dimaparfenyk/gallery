import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalPortal = document.querySelector("#modal-root");

const Modal = ({ src, alt, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    isOpen && (
      <div className="Overlay" onClick={onOverlayClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    ),
    modalPortal
  );
};

export default Modal;
