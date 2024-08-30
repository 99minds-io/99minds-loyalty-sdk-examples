import React, { useState } from "react";
import BasicModel from "../components/modal";
import NotLoginModel from "../components/not-login-model";
const BirthDayCard = ({
  birthdayReward,
  handleUpdateBirthday,
  isLogin,
  handleSignIn,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isNotLoginModal, setIsNotLoginModal] = useState(false);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  return (
    <React.Fragment>
      <li
        className="item-box"
        onClick={() => {
          if (!isLogin) {
            setIsNotLoginModal(true);
          } else {
            setIsOpenModal(true);
          }
        }}
      >
        <div className="content icon">
          {" "}
          <img src="../images/svg/cake.svg" alt="cake" />
        </div>
        <div className="content">
          <div className="card-title">{birthdayReward.title}</div>
          <div className="card-description">{birthdayReward.description}</div>
        </div>
      </li>
      {isOpenModal && isLogin ? (
        <BasicModel
          open={isOpenModal}
          onClose={() => {
            setDay(1);
            setMonth(1);
            setIsOpenModal(false);
          }}
          onConfirm={() => {
            handleUpdateBirthday(`${month}/${day}`);
            setDay(1);
            setMonth(1);
            setIsOpenModal(false);
          }}
          title={"Celebrate your birthday"}
          saveBtnText={"Save"}
        >
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="day">Day</label>
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {[...Array(31).keys()].map((d) => (
                  <option key={d + 1} value={d + 1}>
                    {d + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {[...Array(12).keys()].map((m) => (
                  <option key={m + 1} value={m + 1}>
                    {m + 1}
                  </option>
                ))}
              </select>
            </div>
          </React.Fragment>
        </BasicModel>
      ) : (
        <NotLoginModel
          open={isNotLoginModal}
          onClose={() => setIsNotLoginModal(false)}
          handleSignIn={handleSignIn}
        />
      )}
    </React.Fragment>
  );
};
export default BirthDayCard;
