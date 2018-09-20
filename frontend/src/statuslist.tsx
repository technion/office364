
import * as React from "react";
import * as ReactDOM from "react-dom"; // Aliased to react-dom-lite

//declare StatusListState any;

export class StatusList extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.setvar = this.setvar.bind(this);
    this.state = { value: "unset" };
  }

	componentDidMount() {
		console.log("mounted");
		this.setvar().then((x) => { this.setState({value: x.value}) } );
	}
  public render() {
    if (this.state.value === "unset") {
      return null;
    }

    const statusnodes = this.state.value.map((event: any) => 
      <div key={ event.Id }>
        { event.Status }
        { event.Messages[0].MessageText }
      </div>
    );

    return (
      <div>
      Rendered
      { statusnodes }
      </div>
    );
  }

  private	async setvar() {
		const response = await fetch("http://localhost:8080/status.json");
		return await response.json();
	}

}
