import React from "react";
import AnimalFarm from "./components/AnimalFarm";
import "./App.scss";

function App() {
  return (
    <div className="main-app">
      <header className="app-header">
        <span className="header-text">Leaf Grow Coding assessment</span>
      </header>
      <main className="app-body">
        <AnimalFarm />
      </main>
      <footer className="app-footer">{new Date().toDateString()}</footer>
    </div>
  );
}

export default App;
