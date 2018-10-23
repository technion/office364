import * as React from "react";
import * as ReactDOM from "react-dom"; // Aliased to react-dom-lite

import { withStyles } from "@material-ui/core/es/styles";
import Card from "@material-ui/core/es/Card";
import CardContent from "@material-ui/core/es/CardContent";
import CardMedia from "@material-ui/core/es/CardMedia";
import Button from "@material-ui/core/es/Button";
import Typography from "@material-ui/core/es/Typography";

const styles = require("./statuslist.css"); // Let's not make Typescript typings for a css file

interface StatusMessage {
  MessageText: string;
  PublishedTime: string;
}

const Degradation: React.SFC<{status: string}> = (props) => {
  if (props.status === "Service degradation") {
    return (
      <CardMedia
        className="degraded"
        image="/assets/screamingcat.jpg"
        title="Screaming cat"
      />
    );
  } else if (props.status === "Service restored") {
    return (
      <CardMedia
        className="degraded"
        image="/assets/happycat.jpg"
        title="Happy Cat"
      />
    );
  }
  return null;
};

export class StatusNode extends React.Component<{status: string, messages: StatusMessage[]}> {
  public render() {
    const { status, messages } = this.props;

    const error = (<Degradation status={status} />);

    return (
      <Card className="gaps">
      <CardContent className="display-linebreak">
        <Typography color="textSecondary">
          Incident Report {error}
        </Typography>
        <Typography variant="headline" component="h2">
          {status}
        </Typography>
        {messages[messages.length - 1].MessageText}
      </CardContent>
      </Card>
    );
  }
}

interface StatusListState {
  readonly value: any;
}
export class StatusList extends React.Component<{}, StatusListState> {
  constructor(props: {}) {
    super(props);
    this.state = { value: undefined };
  }

  public componentDidMount() {
    this.setvar()
      .then((x) => { this.setState({value: x.value}); } )
      .catch((e) => {
        throw new Error(e.message);
      });
  }
  public render() {
    if (this.state.value === undefined) {
      return null;
    }

    const statusnodes = this.state.value.map((event: any) => (
      <StatusNode
        key={event.Id}
        status={event.Status}
        messages={event.Messages}
      />
    )).reverse();

    return (
      <div> // TODO: Container
        {statusnodes}
      </div>
    );
  }

  private	setvar = async () => {
    const response = await fetch("http://localhost:8080/status.json");
    if (!response.ok) {
      throw new Error("Invalid response from server fetch");
    }
    return await response.json();
  }
}
