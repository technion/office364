import * as React from "react";
import * as ReactDOM from "react-dom"; // Aliased to react-dom-lite
import CssBaseline from "@material-ui/core/CssBaseline";
import { StatusList } from "./statuslist.tsx"; 

declare var window: any;
class App extends React.Component<{}, any> {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <StatusList />
        Hello world
        <div id="g-recaptcha" />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
