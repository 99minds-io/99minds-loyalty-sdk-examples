import React from "react";
import "./index.css";

const RedeemPoints = ({ data, pointBalance, handleClickRedeem, isLogin }) => {
  return (
    <div className="ways_to_redeem">
      <div className="page-width">
        <h2 className="main-page-title page-title">
          Ways to Redeem your Points
        </h2>
        <div>
          <ul>
            {data?.options?.map((reward, index) => (
              <li className="item-box" key={index}>
                <div className="content icon">
                  <img src="../images/svg/star.svg" alt="star" />
                </div>
                <div className="content">
                  <div className="card-title">{reward.title}</div>
                  <div className="card-description">{reward.description}</div>
                </div>
                {pointBalance >= reward.points_to_redeem && isLogin ? (
                  <button
                    className="button redeem_button"
                    onClick={() => handleClickRedeem(reward.points_to_redeem)}
                  >
                    Redeem
                  </button>
                ) : (
                  <button className="button redeem_button" disabled={true}>
                    Earn{" "}
                    {!isLogin
                      ? reward?.points_to_redeem
                      : reward?.points_to_redeem - pointBalance}{" "}
                    Points
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RedeemPoints;
