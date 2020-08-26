import { render } from "react-dom";
import React, { useEffect, useState } from "react";
import AnimalFarm from "./components/AnimalFarm";
import Api from "./Api";
import "./index.scss";

function App() {
  const [fetchingData, setLoading] = useState(true);
  const [fetchingError, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await Api.getAnimalData();
      setData(response.result);
      setError(!response.data || response.status !== "ok");
      setLoading(false);
    };
    loadData();
  }, []);

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

render(<App />, document.getElementById("root"));
