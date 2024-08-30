import React from "react";
import "./index.css";

const BasicModel = ({
  open,
  onClose,
  onConfirm,
  title,
  saveBtnText,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        {children}
        {saveBtnText && (
           <button className="save-button" onClick={onConfirm}>
           {saveBtnText}
         </button>
        )}
       
      </div>
    </div>
  );
};

export default BasicModel;
