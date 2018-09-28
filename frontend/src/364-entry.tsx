import * as React from "react";
import * as ReactDOM from "react-dom"; // Aliased to react-dom-lite
import CssBaseline from "@material-ui/core/es/CssBaseline";
import { StatusList } from "./statuslist.tsx";

class App extends React.Component<{}> {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <StatusList />
        <div id="g-recaptcha" />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
