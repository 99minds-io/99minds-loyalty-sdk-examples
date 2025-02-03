import React from "react";
import "./index.css";

const VIPs = ({ data }) => {
  return (
    <div className="page-width loyalty_vip_cards">
      <h2 className="main-page-title page-title">
        VIPs Earn Even More
      </h2>
      <div>
        <ul id="vip_cards">
          {data?.options?.map((item, index) => (
            <li className="vip-tier-container" key={index}>
              <div className="vip-tier-header is-background-blue">
                <div className="vip-tier-threshold">{item.description}</div>
                <div className="vip-tier-name">{item.title}</div>
              </div>
              <div className="vip-tier-benefits">
                <ul className="vip-tier-benefits-list">
                  {item?.benefits?.map((benefit, index) => (
                    <li className="vip-tier-benefits-list-item" key={index}>{benefit.title}</li>
                  ))}

                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VIPs;
