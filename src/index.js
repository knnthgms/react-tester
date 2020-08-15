import { render } from "react-dom";
import React from "react";
import AnimalFarm from "./components/AnimalFarm";
import Api from "./Api";
import APICONSTANTS from "./Api/Constants.js";
import "./App.scss";

class App extends React.Component {
  state = {
    fetchingData: true,
    fetchingError: false,
    data: null,
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    this.setState({ fetchingData: true });
    const response = await Api.getAnimalData();
    const data = response.result;
    const status = response.status;
    this.setState({
      data,
      fetchingData: false,
      fetchingError: !data || status !== "ok",
    });
  };
  render() {
    const { data, fetchingData, fetchingError } = this.state;
    return (
      <div className="main-app">
        <header className="app-header">
          <span className="header-text">Leaf Grow coding assessment</span>
        </header>
        <main className="app-body">
          {(data || !fetchingData || fetchingError) && (
            <AnimalFarm
              data={data}
              fetchingData={fetchingData}
              fetchingError={fetchingError}
            />
          )}
        </main>
        <footer className="app-footer">{new Date().toDateString()}</footer>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
