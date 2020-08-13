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

  render() {
    const {
      fetchingData,
      animalList,
      searchedAnimals,
      animalsSorted,
      averagesArray
    } = this.state;
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
            <span>Search for animal type</span>
            <Autocomplete
              suggestions={allTypesList}
              setValue={this.selectType}
            />
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
            <span> Avg by type </span>
            <button onClick={() => this.getAvg()}>get Averages</button>
            <div className="animal-cards">
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
            {searchedAnimals && searchedAnimals.length !== 0 && (
              <button onClick={this.clearSearch}>Clear Search</button>
            )}
            <div className="animal-cards">
              {searchedAnimals &&
                searchedAnimals.length !== 0 &&
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
            <div>
              <span>Sort by age:</span>
              <button onClick={() => this.sortBy(1)}>Ascending</button>
              <button onClick={() => this.sortBy(2)}>Descending</button>
              {animalsSorted ? (
                <button onClick={() => this.sortBy(0)}>Cancel</button>
              ) : (
                <></>
              )}
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

            {animalList.animals
              .filter(a => a.type === "dog")
              .map(e => e.age)
              .reduce((a, b) => a + b, 0) * 7}
            <div className="animal-cards">
              {animalList.animals
                .filter(e => e.type === "dog")
                .map((ele, index) => {
                  return (
                    <AnimalCard
                      key={index}
                      name={ele.name}
                      type={ele.type}
                      age={ele.age * 14}
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
