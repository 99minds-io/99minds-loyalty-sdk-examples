import React from "react";
import "./index.css";

const Header = ({ handleLogout,isLogin }) => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="/images/placeholder-logo-1.png"
          alt="OA Gourmet Logo"
          className="logo"
        />
      </div>
      {isLogin && (
        <div className="logout-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
