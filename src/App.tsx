import React, { useEffect, useState } from "react";
import "./App.css";
import { LogoSketch } from "./component/sketch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper">
          <LogoSketch />
        </div>
      </header>
    </div>
  );
}

export default App;
