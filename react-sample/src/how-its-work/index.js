import React from "react";
import "./index.css";

const HowItWorks = ({ isLogin }) => {
  return (
    <div
      className={`how-it-works-container ${
        isLogin ? " how-it-works-container-inner" : ""
      }`}
    >
      <h2 className="how-it-works-heading">How It Works</h2>
      <div className="how-it-works-content">
        <div className="how-it-works-step">
          <h3>1</h3>
          <h4>EARN POINTS</h4>
          <p>
            Earn Outer Aisle points every time you shop. For every dollar you
            spend, you earn one point.
          </p>
        </div>
        <div className="how-it-works-step">
          <h3>2</h3>
          <h4>JOIN</h4>
          <p>Join the Outer Aisle Rewards Program to access your points.</p>
        </div>
        <div className="how-it-works-step">
          <h3>3</h3>
          <h4>REDEEM</h4>
          <p>
            Redeem every 100 points for $5 off your next order at checkout. The
            more points you have, the more you can save!
          </p>
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;
