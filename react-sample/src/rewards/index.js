import React from "react";
import "./index.css";

const Rewards = ({ pointsTransactions, rewards, pointBalance, handleCopy }) => {
  return (
    <div className="loyalty_rewards">
      <div className="page-width">
        {pointBalance?.active && (
          <React.Fragment>
            <h4 id="customer_rewards" className="main-page-title page-title">
              Hi {pointBalance?.customer?.name}, you have{" "}
              {pointBalance?.point_balance} Points
            </h4>
            <p>
              Here's an overview of your current points balance and recent
              activity
            </p>
          </React.Fragment>
        )}
        {pointsTransactions?.length && (
          <div>
            <table id="points-logs-activity">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Points</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody id="activity_table">
                {pointsTransactions?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.transaction_type === "REDEMPTION"
                        ? "Redeemed a Reward"
                        : "Credit"}
                    </td>
                    <td>
                      {item.transaction_type === "REDEMPTION"
                        ? "-" + item.amount + " Points"
                        : "+" + item.amount + " Points"}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(item.transaction_date))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {rewards?.length && (
          <React.Fragment>
            <h2 className="main-page-title page-title">Rewards</h2>
            <div>
              <ul
                id="my_rewards"
                className="multicolumn-list contains-content-container grid"
              >
                {rewards?.map((item, index) => (
                  <li className="item-box" key={index}>
                    <div className="content icon">
                      {" "}
                      <img src="../images/svg/star.svg" alt="star" />
                    </div>
                    <div className="content">
                      <div className="card-title">
                        {item?.currency_symbol} {item?.value} OFF Coupon
                      </div>
                      <div className="card-description">
                        {item.formatted_expiration_date}
                      </div>
                      <div>Use this discount code on your next order!</div>
                      <div className="copy_coupon">
                        {item.code}
                        <div onClick={() => handleCopy(item.code)}>
                          <img src="../images/svg/copy.svg" alt="copy" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default Rewards;
