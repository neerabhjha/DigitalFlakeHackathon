import React from "react";
import "./Entry.scss";
import logoImg from "../../assets/logo.png";

function Entry() {
  return (
    <div className="container">
      <div className="entry-div">
        <img src={logoImg} alt="logo-img" />
        <p className="text">Welcome to Digitalflake Admin</p>
      </div>
    </div>
  );
}

export default Entry;
