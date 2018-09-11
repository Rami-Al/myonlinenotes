import React from "react";
import ReactDOM from "react-dom";
const $ = require("jquery");
const escapeHtml = require("escape-html");

import ContentEditable from "react-contenteditable";
import NavBar from "./Navbar.js";
import TextOptions from "./TextOptions.js";
import Tabs from "./Tabs.js";

function checkLoginState() {
  $.ajax({
    url: "./php/main.php",
    success: function(response) {
      $("#root").html(response);
    },
    error: function(error) {
      console.log(error, "error");
    }
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "aa",
      activeNoteID: 0,
      enabledTabRenameID: -1,
      notes: [
        {
          id: 0,
          title: "Songs",
          note: "These are songs",
          date: new Date().toLocaleDateString(),
          edited: false
        }
      ]
    };
  }

  textChangeHandler(e) {
    let activeNoteID = this.state.activeNoteID;
    let stateCopy = Object.assign({}, this.state);
    let value = e.target.value;

    stateCopy.notes[activeNoteID].note = value;

    if (!stateCopy.notes[activeNoteID].edited) {
      stateCopy.notes[activeNoteID].edited = true;
    }

    this.setState(stateCopy);
  }

  selectNote(e) {
    let notes = this.state.notes;
    let noteID = e.target.id;

    this.setState({ activeNoteID: noteID });
  }

  selectTextInside(element, type) {
    let range = document.createRange();
    range.selectNodeContents(element);
    if (type === "first") range.collapse(true);
    if (type === "last" || type === undefined) range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  toggleRename(e, enable) {
    let stateCopy = Object.assign({}, this.state);

    if (enable === true) {
      let tabID = e.target.previousSibling.id;
      let el = e.target.previousSibling;

      stateCopy.enabledTabRenameID = tabID;
    } else if (enable === false) {
      stateCopy.enabledTabRenameID = -1;
    }

    this.setState(stateCopy, () => {
      let enabledTabRenameID = this.state.enabledTabRenameID;
      if (enabledTabRenameID !== -1) {
        var tab = document.getElementById(enabledTabRenameID);
        this.selectTextInside(tab);
        $(tab).css("cursor", "text");
        return;
      }
      $(".tab").css("cursor", "pointer");
    });
  }

  onRenameChangeHandler(e) {
    let stateCopy = Object.assign({}, this.state);
    let activeTabID = this.state.enabledTabRenameID;
    stateCopy.notes[activeTabID].title = e.target.innerHTML;
    this.setState(stateCopy);
  }

  newNote() {
    let stateCopy = Object.assign({}, this.state);
    let numOfNotes = stateCopy.notes.length;

    stateCopy.enabledTabRenameID = numOfNotes;
    stateCopy.activeNoteID = numOfNotes;

    stateCopy.notes.push({
      id: numOfNotes,
      title: "Note " + (numOfNotes + 1),
      note: ""
    });

    this.setState(stateCopy, function() {
      let noteID = this.state.enabledTabRenameID;
      let note = document.getElementById(noteID);
      this.selectTextInside(note, "all");
    });
  }

  onSave() {
    let notes = this.state.notes;
    $.ajax({
      url: "./php/save.php",
      method: "POST",
      data: { notes: notes }
    });
  }

  render() {
    let notes = this.state.notes;
    let activeNoteID = this.state.activeNoteID;
    return (
      <div id="App">
        <NavBar isLoggedIn={false} logo="./src/logo.png" />
        <TextOptions onSave={() => this.onSave()} />

        <div id="note_n_tabs">
          <ContentEditable
            id="note"
            html={notes[activeNoteID].note}
            onChange={e => this.textChangeHandler(e)}
            disabled={false}
          />

          <Tabs
            notes={this.state.notes}
            activeNoteID={this.state.activeNoteID}
            onTabClick={e => this.selectNote(e)}
            onRenameClick={(e, enable) => this.toggleRename(e, true)}
            enabledTabRenameID={this.state.enabledTabRenameID}
            onRenameChangeHandler={e => this.onRenameChangeHandler(e)}
            onRenameBlur={e => this.toggleRename(e, false)}
            onEnter={e => this.toggleRename(e, false)}
            newNote={() => this.newNote()}
          />
        </div>
      </div>
    );
  }
}
export default App;
