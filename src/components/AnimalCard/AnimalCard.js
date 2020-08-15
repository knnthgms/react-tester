import React from "react";
import "./AnimalCard.scss";

const AnimalCard = (props) => {
  return (
    <>
      <div className={"animal-card " + props.type + "-card"}>
        <div className="animal-card__header">
          <img
            src="http://placehold.it/350x200"
            className="animal-card__image"
            alt="Card Image"
          />
        </div>

        <div className="animal-card__body">
          <h2 className="animal-card__title">{props.name}</h2>
          <p className="animal-card__subtitle">{props.type}</p>
          <p className="animal-card__intro">
            <span className={props.sex ? "animal-m" : "animal-f"}>
              {props.sex ? "M" : "F"}{" "}
            </span>
            /{props.age}Y
          </p>
        </div>
      </div>
    </>
  );
};

export default AnimalCard;
