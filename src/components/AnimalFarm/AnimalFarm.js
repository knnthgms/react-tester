import React from "react";
import data from "../../Api/data";
import DropMenu from "../DropMenu";
import AnimalCard from "../AnimalCard";
import Autocomplete from "../AutoComplete";
import AnimalAvgCard from "../AnimalAvgCard";
import Utils from "../../utils/Utils";
// import Api from "../../Api";
import "./AnimalFarm.scss";

class AnimalFarm extends React.Component {
  state = {
    fetchingData: true,
    userChoice: "1"
  };

  componentDidMount() {
    // Api.getAnimalData(response => {
    //   this.setState({ animalList: response.result, fetchingData:false });
    // });
    this.setState({ animalList: data.result, fetchingData: false });
  }

  getUserChoice = userChoice => {
    this.setState({ userChoice });
    if (userChoice == "3") this.getAvg();
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

  sortBy = type => {
    const { animalList } = this.state;
    let animalsSorted;
    if (type === 1) {
      animalList.animals.sort((a, b) => a.age - b.age);
      animalsSorted = true;
    } else if (type === 2) {
      animalList.animals.sort((a, b) => b.age - a.age);
      animalsSorted = true;
    } else {
      animalList.animals.sort((a, b) => a.id - b.id);
      animalsSorted = false;
    }
    this.setState({ animalList, animalsSorted });
  };

  getAvg = () => {
    const { animalList } = this.state;
    const distinctSet = [...new Set(animalList.animals.map(e => e.type))];
    let averagesArray = [];
    for (let animalType of distinctSet) {
      let animalsOfType = animalList.animals.filter(a => a.type === animalType);
      averagesArray.push({
        type: animalType,
        min: animalsOfType.reduce(
          (min, b) => Math.min(min, b.age),
          animalsOfType[0].age
        ),
        max: animalsOfType.reduce(
          (max, b) => Math.max(max, b.age),
          animalsOfType[0].age
        ),
        recursiveAvg: Utils.findMean(
          animalsOfType.map(a => a.age),
          animalsOfType.length
        ).toFixed(3),
        iterativeAvg: Utils.arrayAverage(animalsOfType.map(a => a.age)).toFixed(
          3
        ),
        reducedAvg: (
          animalsOfType.reduce((total, next) => total + next.age, 0) /
          animalsOfType.length
        ).toFixed(3)
      });
    }
    this.setState({ averagesArray });
  };

  choice1 = () => {
    const { animalList, searchedAnimals } = this.state;
    const allTypesList = animalList && [
      ...new Set(animalList.animals.map(e => e.type))
    ];
    return (
      <>
        <div className="search-tools">
          <strong>Search for animal type</strong>
          <div className="search-box">
            <Autocomplete
              suggestions={allTypesList}
              setValue={this.selectType}
            />
          </div>
          <div className="search-filters">
            <strong>Types are</strong>
            <div className="button-container">
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
          </div>
        </div>

        {searchedAnimals && (
          <>
            <div className="cards-title">
              <h4>Search Results ({searchedAnimals.length})</h4>
              {searchedAnimals && searchedAnimals.length !== 0 ? (
                <div className="clear-search">
                  <button onClick={this.clearSearch}>Clear Search</button>
                </div>
              ) : null}
            </div>
            <div className="animal-cards">
              {searchedAnimals.map((ele, index) => {
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
          </>
        )}
      </>
    );
  };
  choice2 = () => {
    const { animalsSorted, animalList } = this.state;
    return (
      <>
        <div className="cards-title">
          <h4>All animals ({animalList.animals.length})</h4>
          <div className="cards-sorting">
            <span>Sort by age:</span>
            <div className="button-container">
              <button onClick={() => this.sortBy(1)}>Ascending</button>
              <button onClick={() => this.sortBy(2)}>Descending</button>
              {animalsSorted ? (
                <button onClick={() => this.sortBy(0)}>Cancel</button>
              ) : (
                <></>
              )}
            </div>
          </div>
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
      </>
    );
  };
  choice3 = () => {
    const { averagesArray } = this.state;
    return (
      <>
        <div className="cards-title">
          <h4> Average age by animal type </h4>
        </div>
        <div className="animal-avg-cards">
          {averagesArray &&
            averagesArray.map((ele, index) => {
              return (
                <AnimalAvgCard
                  key={index}
                  type={ele.type}
                  min={ele.min}
                  max={ele.max}
                  recursiveAvg={ele.recursiveAvg}
                  iterativeAvg={ele.iterativeAvg}
                  reducedAvg={ele.reducedAvg}
                />
              );
            })}
        </div>
      </>
    );
  };
  choice4 = () => {
    const { animalList } = this.state;
    const totalAge = animalList.animals
      .filter(a => a.type === "dog")
      .map(e => e.age)
      .reduce((a, b) => a + b, 0);
    const dogAgeTotal = parseFloat(totalAge * 7).toFixed(1);
    return (
      <>
        <div className="cards-title">
          <h4> Sum of all dogs ages in dog years </h4>
        </div>
        <span>
          Sum of all dogs age is <strong>{totalAge} years</strong> or{" "}
          <strong>{dogAgeTotal} years </strong> in dog years
        </span>
        <h4>All dogs</h4>
        <div className="animal-cards">
          {animalList.animals
            .filter(e => e.type === "dog")
            .map((ele, index) => {
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
      </>
    );
  };
  render() {
    const { fetchingData, userChoice } = this.state;
    return (
      <div className="app-content">
        {fetchingData ? (
          <span>fetchingData</span>
        ) : (
          <>
            <div className="user-choice-select">
              <h3>Select a task</h3>
              <DropMenu onSelect={this.getUserChoice} />
            </div>
            {userChoice === "1" && this.choice1()}
            {userChoice === "2" && this.choice2()}
            {userChoice === "3" && this.choice3()}
            {userChoice === "4" && this.choice4()}
          </>
        )}
      </div>
    );
  }
}

export default AnimalFarm;
