import React from "react";
import ReactDOM from "react-dom";
let $ = require("jquery");

function closeLoginOverlay(e) {
  $("#LoginOverlay").fadeOut(100);
}

class LoginOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $("#LoginOverlay").fadeOut(0);
  }

  render() {
    return (
      <div id="LoginOverlay">
        <div className="wrapper">
          <div id="login-container">
            <h3>Login</h3>
            <div className="input-container">
              <label htmlFor="l-username">Username:</label>
              <input type="text" id="l-username" name="l-username" />
            </div>

            <div className="input-container">
              <label htmlFor="l-password">Password:</label>
              <input type="password" id="l-password" name="l-password" />
            </div>
          </div>

          <div id="signup-container">
            <h3>Sign Up</h3>

            <div className="input-container">
              <label htmlFor="s-email">E-Mail:</label>
              <input type="email" id="s-email" name="s-email" />
            </div>

            <div className="input-container">
              <label htmlFor="s-username">Username:</label>

              <input type="text" id="s-username" name="s-username" />
            </div>

            <div className="input-container">
              <label htmlFor="s-password">Password:</label>
              <input type="password" id="s-password" name="s-password" />
            </div>

            <div className="input-container">
              <label htmlFor="s-password-confirmation">
                Re-enter Password:
              </label>
              <input
                type="password"
                id="s-password-confirmation"
                name="s-password-confirmation"
              />
            </div>
          </div>

          <button className="close" onClick={e => closeLoginOverlay(e)}>
            <i className="far fa-times-circle" />
          </button>
        </div>
      </div>
    );
  }
}

export default LoginOverlay;
