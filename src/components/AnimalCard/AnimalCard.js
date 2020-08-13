import React from "react";
import "./AnimalCard.scss";

const AnimalCard = props => {
  return (
    <div className={"animal-card " + props.type + "-card"}>
      <div className="card-row">
        <span className="key">name</span>
        <span className="value">{props.name}</span>
      </div>
      <div className="card-row">
        <span className="key">type</span>
        <span className="value">{props.type}</span>
      </div>
      <div className="card-row">
        <span className="key">age</span>
        <span className="value">{props.age}</span>
      </div>
      <div className="card-row">
        <span className="key">sex</span>
        <span className="value">{props.sex ? "M" : "F"}</span>
      </div>
    </div>
  );
};

export default AnimalCard;
