import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import Secret from "./components/Secret";
import NotFound from "./components/NotFound";
import Callback from "./components/Callback";

class App extends React.Component {
  render() {
    let mainComponent = "";
    console.log(this.props.location)
    switch (this.props.location) {
      case "":
        mainComponent = <Main {...this.props} />;
        break;
      case "callback":
        mainComponent = <Callback />;
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Secret /> : <NotFound />;
        break;
      default:
        mainComponent = <NotFound />;
    }
    return (
      <div className="App">
        {/* <header className="App-header">
          <p>
            {props.name}Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {/* <Main /> */}
        {mainComponent}
      </div>
    );
  }
}

export default App;
