import React from "react";
import DropMenu from "./components/DropMenu";
import AnimalCard from "./components/AnimalCard";
import "./App.scss";

function App() {
  return (
    <div className="main-app">
      <header className="app-header">Leaf growCoding assessment</header>
      <main className="app-body">
        <DropMenu />
        <div style={{ display: "flex", flexFlow: "wrap" }}>
          <AnimalCard />
          <AnimalCard />
          <AnimalCard />
          <AnimalCard />
          <AnimalCard />
          <AnimalCard />
        </div>
      </main>
      <footer>{new Date().toDateString()}</footer>
    </div>
  );
}

export default App;
