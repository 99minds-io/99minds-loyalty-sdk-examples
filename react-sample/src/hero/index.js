import React from "react";
import "./index.css";

const Hero = ({ handleSignIn, isLogin, scrollToRedeem, scrollToEarn }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to the program</h1>
        <p>As a member, you will earn points for shopping</p>
        <div className="welcome-buttons">
          <button
            className="welcome-button"
            onClick={isLogin ? scrollToEarn : handleSignIn}
          >
            {" "}
            {isLogin ? "Earn points" : "Join Now"}
          </button>
          <button className="welcome-button" onClick={isLogin ? scrollToRedeem : handleSignIn}> {isLogin ? "Redeem Rewards" : "Sign In"}</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
