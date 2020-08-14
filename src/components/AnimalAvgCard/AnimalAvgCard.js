import React from "react";
import "./AnimalAvgCard.scss";

const AnimalAvgCard = props => {
  return (
    <div className={"animal-avg-card " + props.type + "-card"}>
      <div className="card-title">{props.type}</div>
      <div className="card-row">
        <span className="key">Recursive: </span>
        <span className="value">{props.recursiveAvg}</span>
      </div>
      <div className="card-row">
        <span className="key">Iterative: </span>
        <span className="value">{props.iterativeAvg}</span>
      </div>
      <div className="card-row">
        <span className="key">Reduced: </span>
        <span className="value">{props.reducedAvg}</span>
      </div>
      <div className="bottom-row">
        <div className="bottom-line">
          <span className="key">Minimum age:</span>
          <span className="value">{props.min}</span>
        </div>
        <div className="bottom-line">
          <span className="key">Maximum age:</span>
          <span className="value">{props.max}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimalAvgCard;
