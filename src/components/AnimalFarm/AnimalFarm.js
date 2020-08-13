import React from "react";
import data from "../../Api/data";
// import Api from "../../Api";
import DropMenu from "../DropMenu";
import AnimalCard from "../AnimalCard";
import "./AnimalFarm.scss";

class AnimalFarm extends React.Component {
  state = {
    fetchingData: true
  };
  componentDidMount() {
    // Api.getAnimalData(response => {
    //   this.setState({ animalList: response.result, fetchingData:false });
    // });
    this.setState({ animalList: data.result, fetchingData: false });
    console.log(data.result);
  }
  getUserChoice = userChoice => {
    this.setState({ userChoice });
  };

  render() {
    const { fetchingData, animalList } = this.state;
    const allTypesList = animalList && [
      ...new Set(animalList.animals.map(e => e.type))
    ];
    return (
      <React.Fragment>
        {fetchingData ? (
          <span>fetchingData</span>
        ) : (
          <React.Fragment>
            <DropMenu onSelect={this.getUserChoice} />
            <span>Types are</span>
            {allTypesList.map((a, i) => (
              <span key={i} className="tag">
                {a}
              </span>
            ))}
            <div className="animal-cards">
              {animalList.animals.map((ele, index) => {
                return (
                  <AnimalCard
                    key={index}
                    name={ele.name}
                    type={ele.type}
                    age={ele.age}
                    sex={ele.sex}
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AnimalFarm;
