import React, { Component } from "react";
import Main from "./components/MainComponent";
import "./App.css";

// Cài đặt React Router
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      // Edit
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
