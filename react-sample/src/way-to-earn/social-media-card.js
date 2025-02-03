import React, { useState } from "react";
import NotLoginModel from "../components/not-login-model";

const SocialMedia = ({ socialMediaRewards, handleSocialMedia, isLogin,handleSignIn }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <React.Fragment>
      {Object.entries(socialMediaRewards)
        .filter(
          ([key, value]) => typeof value === "object" && key !== "visible"
        )
        .map(([key, value]) => {
          return (
            <li
              className="item-box"
              key={key}
              onClick={() =>
                isLogin
                  ? handleSocialMedia(
                      value?.title?.toLowerCase()?.replace(/ /g, "_"),
                      value
                    )
                  : setIsOpenModal(true)
              }
            >
              <div className="content icon">
                <img src="../images/svg/star.svg" alt="star" />
              </div>
              <div className="content">
                <div className="card-title">{value.title}</div>
                <div className="card-description">{value.description}</div>
              </div>
            </li>
          );
        })}
          <NotLoginModel
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          handleSignIn={handleSignIn}
        />
    </React.Fragment>
  );
};
export default SocialMedia;
