import React from "react";
// import { useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchActiveUsersInMySession } from "../../actions";
import Header from "../Header";
import Modal from "../Modal";
import PlayersTable from "./PlayersTable";
// import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import history from "../../history";
import "./GameBoard.css";
import "./Blobs.css";
import testmapImage from "../../images/testmap.png";
const styles = {
  paperContainer: {
    height: "100%",
    backgroundImage: `url(${testmapImage})`,
  },
};
const mGroupsOfnAgents = [
  ["user1", "user2", "user3"],
  ["user4", "user5", "user6"],
  ["user7", "user8", "user9"],
];
const xOffsetForGroup = 150;
const yOffsetForGroup = 150;
const xOffsetForAgent = 30;
const yOffsetForAgent = 30;

const origCentersXYForAgents = [];
const renderOrigXYOfAgents = (Groups) => {
  Groups.map((group, i) => {
    const centersOfXYForThisRoundBlob = [
      Math.floor(
        Math.random() *
          (xOffsetForGroup * (i + 1.7) - xOffsetForGroup * (i + 1.3)) +
          xOffsetForGroup * (i + 1.3)
      ),
      Math.floor(
        Math.random() *
          (yOffsetForGroup * (i + 1.7) - yOffsetForGroup * (i + 1.3)) +
          yOffsetForGroup * (i + 1.3)
      ),
    ];
    group.map((_, j) => {
      const centersOfXForAgent =
        Math.floor(Math.random() * xOffsetForAgent) * j +
        centersOfXYForThisRoundBlob[0];
      const centersOfYForAgent =
        Math.floor(Math.random() * yOffsetForAgent) * j +
        centersOfXYForThisRoundBlob[1];
      origCentersXYForAgents.push([centersOfXForAgent, centersOfYForAgent]);
    });
  });
  console.log("finished generating", origCentersXYForAgents);
};

const renderBlobsSVGCode = (origCentersXYForAgentsInternal) => {
  return origCentersXYForAgentsInternal.map((oTHAgent, j) => {
    console.log(oTHAgent[0]);
    console.log(oTHAgent[1]);

    return (
      <circle
        key={j}
        className="blob"
        cx={oTHAgent[0]}
        cy={oTHAgent[1]}
        r="50"
        fill="blue"
        transform="rotate(0) translate(0, 0) rotate(0)"
        fillOpacity="100%"
      />
    );
  });
};
const renderAgentsSVGCode = (origCentersXYForAgentsInternal) => {
  return origCentersXYForAgentsInternal.map((oTHAgent, j) => {
    return (
      <circle
        key={j}
        cx={oTHAgent[0]}
        cy={oTHAgent[1]}
        r="2"
        stroke="black"
        strokeWidth="0"
        fill="black"
      />
    );
  });
};
const renderStartMapGame = () => {
  return (
    // <div style={{ textAlign: "right" }}>
    <button
      onClick={() => history.push("/shapesgameboardmap")}
      className="ui button primary"
    >
      Start Map Game
    </button>
    // </div>
  );
};

renderOrigXYOfAgents(mGroupsOfnAgents);
export default function BlobsGameBoard() {
  return (
    <div>
      {renderStartMapGame()}

      <div className="blobscontainer boxofgame">
        <Header />

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" id="loader">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -7"
                result="goo"
              />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
          <mask id="maska">
            <g className="blobs">
              {renderBlobsSVGCode(origCentersXYForAgents)}
            </g>
          </mask>

          <rect
            x="100"
            y="100"
            mask="url(#maska)"
            fill="black"
            width="900"
            height="900"
            fillOpacity="30%"
          />
          {renderAgentsSVGCode(origCentersXYForAgents)}
          {/* <image width="980" height="653" mask="url(#maska)" href={testmapImage} /> */}
          {/* <rect
            x="100"
            y="100"
            fill="black"
            width="200"
            height="400"
            fillOpacity="100%"
            fill="red"
          > */}

          <PlayersTable />
          {/* </rect> */}
        </svg>
        <div className="myessioncontainer">
          <PlayersTable />
        </div>
      </div>
    </div>
  );
}
