import React from "react";
import "./AnimalAvgCard.scss";

const AnimalAvgCard = props => {
  return (
    <div className={"animal-card " + props.type + "-card"}>
      <div className="card-row">
        <span className="key">type</span>
        <span className="value">{props.type}</span>
      </div>
      <div className="card-row">
        <span className="key">minimum</span>
        <span className="value">{props.min}</span>
      </div>
      <div className="card-row">
        <span className="key">Recursive</span>
        <span className="value">{props.recursiveAvg}</span>
      </div>
      <div className="card-row">
        <span className="key">Iterative</span>
        <span className="value">{props.iterativeAvg}</span>
      </div>
      <div className="card-row">
        <span className="key">Reduced</span>
        <span className="value">{props.reducedAvg}</span>
      </div>
      <div className="card-row">
        <span className="key">maximum</span>
        <span className="value">{props.max}</span>
      </div>
    </div>
  );
};

export default AnimalAvgCard;
