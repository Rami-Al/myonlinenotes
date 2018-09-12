import React from "react";
import ReactDOM from "react-dom";
const $ = require("jquery");
const escapeHtml = require("escape-html");

import ContentEditable from "react-contenteditable";
import NavBar from "./Navbar.js";
import TextOptions from "./TextOptions.js";
import Tabs from "./Tabs.js";
import LoginOverlay from "./LoginOverlay.js";

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
      user: {
        username: "",
        password: "",
        email: ""
      },

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

  isLoggedIn() {}

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

  componentDidMount() {
    $("#login-btn").click(() => {
      $("#LoginOverlay").fadeIn(100);
    });

    $("#save").click(() => {
      $("#LoginOverlay").fadeIn(100);
    });
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

  selectNote(e) {
    let notes = this.state.notes;
    let noteID = e.target.id;

    this.setState({ activeNoteID: noteID });
  }

  toggleRename(e, enable) {
    let stateCopy = Object.assign({}, this.state);
    let enabledTabRenameID = this.state.enabledTabRenameID;

    if (enable === true) {
      let tabID = e.target.previousSibling.id;
      stateCopy.enabledTabRenameID = tabID;
    } else if (enable === false) {
      let tab = document.getElementById(enabledTabRenameID);
      if (tab.innerHTML === "") {
        tab.innerHTML = "Note x";
        stateCopy.notes[enabledTabRenameID].title = tab.innerHTML;
      }
      stateCopy.enabledTabRenameID = -1;
    }

    this.setState(stateCopy, () => {
      let enabledTabRenameID = this.state.enabledTabRenameID;
      if (enabledTabRenameID === -1) {
        $(".tab").css("cursor", "pointer");
        return;
      }
      var tab = document.getElementById(enabledTabRenameID);
      this.selectTextInside(tab);
      $(tab).css("cursor", "text");
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
    //// TODO:
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
        <LoginOverlay />
        <NavBar isLoggedIn={false} logo="./src/logo.png" />
        <TextOptions onSave={() => this.onSave()} />

        <div id="note_n_tabs">
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
          <ContentEditable
            id="note"
            html={notes[activeNoteID].note}
            onChange={e => this.textChangeHandler(e)}
            disabled={false}
          />
        </div>

        {/* <LoginOverlay /> */}
      </div>
    );
  }
}
export default App;
