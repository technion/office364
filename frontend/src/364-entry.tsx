import * as React from "react";
import * as ReactDOM from "react-dom"; // Aliased to react-dom-lite

async function setvar() {
  const response = await fetch("http://localhost:8080/status.json");
  return await response.json();
}

// Dirty hack to make this JSON global so we can play with it
declare var window: any;
class App extends React.Component<{}, any> {
  componentDidMount() {
    console.log("mounted");
    setvar().then((x) => { window.glsx = x } );
  }

  public render() {
    return (
      <React.Fragment>
        Hello world
        <div id="g-recaptcha" />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
