import React from "react";
import Timer from "./timer/Timer";
import "./Header.css";
// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="title">
      <Timer />
    </div>
  );
};

export default Header;
