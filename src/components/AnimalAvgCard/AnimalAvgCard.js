import React from "react";
import "./AnimalAvgCard.scss";

const AnimalAvgCard = (props) => {
  return (
    <>
      <article className={"animal-avg-card  " + props.type + "-card"}>
        <header className="animal-avg-card__header">
          <div className="card-row">
            <span className="key">Recursive: </span>
            <span className="value">{props.recursiveAvg}Y</span>
          </div>
          <div className="card-row">
            <span className="key">Iterative: </span>
            <span className="value">{props.iterativeAvg}Y</span>
          </div>
          <div className="card-row">
            <span className="key">Reduced: </span>
            <span className="value">{props.reducedAvg}Y</span>
          </div>
        </header>

        <div className="animal-avg-card__body">
          <h2 className="animal-avg-card__title">{props.type}</h2>
          <p className="animal-avg-card__intro">Youngest: {props.min}Y</p>
          <p className="animal-avg-card__intro">Oldest: {props.max}Y</p>
        </div>
      </article>
    </>
  );
};

export default AnimalAvgCard;
