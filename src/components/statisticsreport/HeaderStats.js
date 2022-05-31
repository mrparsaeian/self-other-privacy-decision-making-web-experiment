import React from "react";
import CurrentPlayersNumber from "./CurrentPlayersNumber";
import "./HeaderStats.css";
// import { Link } from "react-router-dom";

const HeaderStats = () => {
  return (
    <div className="title">
      <CurrentPlayersNumber />
    </div>
  );
};

export default HeaderStats;
