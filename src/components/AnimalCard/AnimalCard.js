import React from "react";
import "./AnimalCard.scss";

const AnimalCard = () => {
  return (
    <div className="animal-card">
      <div className="card-row">
        <span className="key">name</span>
        <span className="value">ans</span>
      </div>
      <div className="card-row">
        <span className="key">age</span>
        <span className="value">ans</span>
      </div>
      <div className="card-row">
        <span className="key">sex</span>
        <span className="value">ans</span>
      </div>
    </div>
  );
};

export default AnimalCard;
