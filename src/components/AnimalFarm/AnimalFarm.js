import React from "react";
import data from "../../Api/data";
// import Api from "../../Api";
import DropMenu from "../DropMenu";
import AnimalCard from "../AnimalCard";
import Autocomplete from "../AutoComplete";
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

  render() {
    const {
      fetchingData,
      animalList,
      searchedAnimals,
      animalsSorted
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
            <div className="animal-cards">
              {searchedAnimals && searchedAnimals.length !== 0 && (
                <button onClick={this.clearSearch}>Clear Search</button>
              )}
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AnimalFarm;
