import React from "react";
import AnimalFarm from "./components/AnimalFarm";
import "./App.scss";

function App() {
  return (
    <div className="main-app">
      <header className="app-header">Leaf Grow Coding assessment</header>
      <main className="app-body">
        <AnimalFarm />
      </main>
      <footer>{new Date().toDateString()}</footer>
    </div>
  );
}

export default App;
