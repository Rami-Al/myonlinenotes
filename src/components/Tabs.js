import React from "react";
import ReactDOM from "react-dom";
const $ = require("jquery");

import ContentEditable from "react-contenteditable";

let elements = ["div", "btn", "i"];
let i = 0;

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbNotes: this.props.notes,
      unsavedNotes: [
        {
          id: "",
          title: "",
          note: "",
          date: new Date().toLocaleDateString()
        }
      ]
    };
  }

  render() {
    let notes = this.props.notes;
    let mappedNotes = notes.map(note => {
      i++;
      return (
        <div className="tab-wrapper" key={elements[0] + note.id}>
          <ContentEditable
            className={
              this.props.activeNoteID == note.id ? "tab active" : "tab"
            }
            id={note.id}
            key={elements[1] + note.id}
            onClick={e => this.props.onTabClick(e)}
            disabled={this.props.enabledTabRenameID == note.id ? false : true}
            html={note.title}
            onKeyUp={e => this.props.onRenameChangeHandler(e)}
            onBlur={e => this.props.onRenameBlur(e, false)}
            onKeyPress={e => {
              if (e.key === "Enter") this.props.onRenameBlur(e, false);
            }}
          />

          <i
            className="fa fa-edit"
            key={elements[2] + note.id}
            onClick={(e, enable) => this.props.onRenameClick(e, true)}
          />
        </div>
      );
    });

    return (
      <div id="Tabs-container">
        {mappedNotes}
        <button id="new-note" onClick={() => this.props.newNote()}>
          <i className="fa fa-plus-circle" />
        </button>
      </div>
    );
  }
}

export default Tabs;
