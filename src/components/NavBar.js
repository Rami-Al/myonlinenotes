import React from "react";
import ReactDOM from "react-dom";
let $ = require("jquery");
import logo from "./../logo.png";

function User(props) {
  if (props.isLoggedIn === false) {
    return <button id="user-loggedOut">Login</button>;
  }
}

function Logo(props) {
  return <img id="logo" src={logo} />;
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <Logo logo={this.props.logo} />
        <User isLoggedIn={this.props.isLoggedIn} />
      </nav>
    );
  }
}

export default NavBar;
