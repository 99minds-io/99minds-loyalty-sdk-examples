import React, { useState } from "react";
import "./index.css";

import SocialMedia from "./social-media-card";
import BirthDayCard from "./birthday-card";
import NotLoginModel from "../components/not-login-model";

const WaysToEarnPoints = ({
  wayToEarn,
  birthdayReward,
  socialMediaRewards,
  handleUpdateBirthday,
  handleSocialMedia,
  isLogin,
  handleSignIn,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isNotLoginModal, setIsNotLoginModal] = useState(false);
  return (
    <div className="ways_to_earn">
      <div className="page-width" id="loyalty_ways_to_earn">
        <h2 className="main-page-title page-title">Ways to Earn Points</h2>
        <div>
          <ul id="ways_to_earn">
            {wayToEarn?.options?.map((item, index) => (
              <li
                className={`item-box ${
                  isLogin && item.title === "Sign Up" ? "disabled" : ""
                }`}
                key={index}
                disabled={isLogin}
                onClick={() => {
                  if (!isLogin) {
                    setIsNotLoginModal(true);
                  }
                  else{
                    setIsOpenModal(true);
                  }
                }}
              >
                <div className="content icon">
                  {" "}
                  <img src="../images/svg/star.svg" alt="star" />
                </div>
                <div className="content">
                  <div className="card-title">{item.title}</div>
                  <div className="card-description">{item.description}</div>
                </div>
              </li>
            ))}
            {birthdayReward && (
              <BirthDayCard
                birthdayReward={birthdayReward}
                handleUpdateBirthday={handleUpdateBirthday}
                isLogin={isLogin}
                handleSignIn={handleSignIn}
              />
            )}
            {socialMediaRewards && (
              <SocialMedia
                socialMediaRewards={socialMediaRewards}
                handleSocialMedia={handleSocialMedia}
                isLogin={isLogin}
                handleSignIn={handleSignIn}
              />
            )}
          </ul>
        </div>
      </div>
      {!isLogin && isNotLoginModal && (
        <NotLoginModel
          handleSignIn={handleSignIn}
          open={isOpenModal}
          onClose={() => setIsNotLoginModal(false)}
        />
      )}
    </div>
  );
};

export default WaysToEarnPoints;
