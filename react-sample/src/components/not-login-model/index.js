import React from "react";
import BasicModel from "../modal";
import './index.css'

const NotLoginModel = ({ open, onClose, handleSignIn }) => {
  return (
    <BasicModel
      open={open}
      onClose={() => onClose()}
      onConfirm={() => handleSignIn()}
      title={"Join and Earn Rewards"}
      saveBtnText={""}
    >
      <div>
        <p>Earn points and turn these into rewards!</p>
        <button
          className="modal-button"
          onClick={() => {
            handleSignIn();
            onClose();
          }}
        >
          Start Earning
        </button>
        <p>
          Already a member?{" "}
          <button
            className="link-button"
            onClick={() => {
              handleSignIn();
              onClose();
            }}
          >
            Sign in
          </button>
        </p>
      </div>
    </BasicModel>
  );
};
export default NotLoginModel;
