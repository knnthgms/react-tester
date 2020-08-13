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

  selectType = animalType => {
    const { animalList } = this.state;
    const searchedAnimals = animalList.animals.filter(
      a => a.type === animalType
    );
    this.setState({ searchedAnimals });
  };

  clearSearch = () => {
    this.setState({ searchedAnimals: null });
  };

  render() {
    const { fetchingData, animalList, searchedAnimals } = this.state;
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
            <div className="types-list">
              {allTypesList.map((a, i) => (
                <button
                  key={i}
                  className="tag"
                  onClick={() => this.selectType(a)}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="animal-cards">
              {searchedAnimals && (
                <button onClick={this.clearSearch}>Clear Search</button>
              )}
              {searchedAnimals &&
                searchedAnimals.map((ele, index) => {
                  return (
                    <React.Fragment>
                      <AnimalCard
                        key={index}
                        name={ele.name}
                        type={ele.type}
                        age={ele.age}
                        sex={ele.sex}
                      />
                    </React.Fragment>
                  );
                })}
            </div>
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
