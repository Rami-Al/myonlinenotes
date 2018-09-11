import React from "react";
import ReactDOM from "react-dom";
const $ = require("jquery");

class TextOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="TextOptions">
        <button onClick={() => document.execCommand("bold")}>
          <b>B</b>
        </button>

        <button onClick={() => document.execCommand("italic")}>
          <i>I</i>
        </button>

        <button
          id="underline"
          onClick={() => document.execCommand("underline")}
        >
          <span>U</span>
        </button>

        <button id="save" onClick={() => this.props.onSave()}>
          <i className="far fa-save" />
        </button>

        <button id="delete">
          <i className="far fa-trash-alt" />
        </button>
      </div>
    );
  }
}

export default TextOptions;
