import React from 'react';

export function sum(a, b) {
  return a + b;
}

// Custom button component
const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

const defaultState = { input1: '', input2: '', output: null };

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  handleInput1Change = e => {
    this.setState({ input1: parseFloat(e.target.value) || '' });
  };

  handleInput2Change = e => {
    this.setState({ input2: parseFloat(e.target.value) || '' });
  };

  handleAddBtnClick = () => {
    this.setState({
      output: sum(parseFloat(this.state.input1), parseFloat(this.state.input2)),
    });
  };

  handleResetBtnClick = () => {
    this.setState(defaultState);
  };

  renderOutput() {
    const { output } = this.state;

    if (output === null) {
      return null;
    }

    if (isNaN(output)) {
      return 'Please verify your input!';
    }

    return <div>Result: {output}</div>;
  }

  render() {
    return (
      <div className="calculator">
        <h1>Calculator</h1>
        <div>
          <label htmlFor="input-1">Input 1:</label>
          <input
            id="input-1"
            placeholder="Input 1"
            ref="input1"
            value={this.state.input1}
            onChange={this.handleInput1Change}
          />
        </div>
        <div>
          <label htmlFor="input-2">Input 2:</label>
          <input
            id="input-2"
            placeholder="Input 2"
            ref="input2"
            value={this.state.input2}
            onChange={this.handleInput2Change}
          />
        </div>
        <div id="output">{this.renderOutput()}</div>
        <button onClick={this.handleAddBtnClick}>Add</button>
        <Button onClick={this.handleResetBtnClick}>Reset</Button>
      </div>
    );
  }
}
