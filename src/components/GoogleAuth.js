import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    this.initGoogleClient();
  }

  initGoogleClient = () => {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "1052468152181-bu3qef9lfee160ctl6s1urc7c33kpo83.apps.googleusercontent.com",
        scope: "email"
      });
      this.auth = window.gapi.auth2.getAuthInstance();
      this._setSignInStatus(this.auth.isSignedIn.get());
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  };

  _setSignInStatus = isSignedIn => {
    if (isSignedIn) {
      let profile = this.getUserProfile();
      this.props.signIn(profile);
    } else {
      this.props.signOut();
    }
  };

  onAuthChange = isSignedIn => this._setSignInStatus(isSignedIn);

  onSignInClick = async () => await this.auth.signIn();

  onSignOutClick = async () => await this.auth.signOut();

  getUserProfile = () => {
    let userProfile = this.auth.currentUser.get().getBasicProfile();
    return {
      name: userProfile.getName(),
      imageURL: userProfile.getImageUrl(),
      email: userProfile.getEmail(),
      id: userProfile.getId()
    };
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return;
    } else {
      let clickHandler = this.onSignInClick;
      let buttonText = "Sign in with Google";

      if (this.props.isSignedIn) {
        clickHandler = this.onSignOutClick;
        buttonText = "Sign Out";
      }

      return (
        <div>
          { this.props.profile.imageURL && <img width='30px' height='30px' src={this.props.profile.imageURL} alt={this.props.profile.email}/> }
          <button className="ui red google button" onClick={clickHandler}>
            <i className="google icon" />
            {buttonText}
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth }) => ({
  isSignedIn: auth.isSignedIn,
  profile: auth.profile
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
