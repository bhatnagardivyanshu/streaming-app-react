import React from "react";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  };

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
      this._setUserSignedInStatus(this.auth.isSignedIn.get());
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  };

  onAuthChange = status => {
    console.log('Auth status Changed');
    this._setUserSignedInStatus(status);
  };

  _getUserStatus = () => (this.auth ? this.auth.isSignedIn.get() : null);

  _setUserSignedInStatus = (status) => {
    console.log('setting user status to', status);
    this.setState({ isSignedIn: status });
  };

  signInUser = async () => {
    // TODO: handle error
    let user = await this.auth.signIn();
    // let authResponse = user.getAuthResponse();
    // let userProfile = this._getUserProfile(user);
    // this._setUserProfile(userProfile);
  };

  signOutUser = async () => {
    await this.auth.signOut();
    // this._setUserSignedInStatus();
    // this._setUserProfile();
  };

  renderAuthButton() {
    if (this.state.isSignedIn) {
      return <button onClick={this.signOutUser}>Sign Out</button>;
    } else if (this.state.isSignedIn === null) {
      return <button>Checking Status...</button>;
    } else {
      // User is logged out
      return <button onClick={this.signInUser}>Sign In</button>;
    }
  }

  render() {
    return (
      <div>
        <div>
          <p> {this.state.email} {this.state.givenName} </p>
        </div>
        <p>GoogleAuth Component</p>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default GoogleAuth;


/*
   My way of handling Atuh
  import React from "react";

class GoogleAuth extends React.Component {
  // userInit = {
  //   isSignedIn: null,
  //   name: null,
  //   givenName: null,
  //   familyName: null,
  //   imageUrl: null,
  //   email: null
  // };

  state = {
    // user: this.userInit
    isSignedIn: null
  };

  auth = null;

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
      this._setUserSignedInStatus();
    });
  };

  _getUserStatus = () => (this.auth ? this.auth.isSignedIn.get() : null);

  _setUserSignedInStatus = (status = this._getUserStatus()) => {
    this.setState(prevState => ({
      ...prevState,
      isSignedIn: status
    }));
  };

  _getUserProfile = user => {
    let basicProfile = user.getBasicProfile();
    let id = basicProfile.getId();
    let name = basicProfile.getName();
    let givenName = basicProfile.getGivenName();
    let familyName = basicProfile.getFamilyName();
    let imageUrl = basicProfile.getImageUrl();
    let email = basicProfile.getEmail();
    return {
      id,
      name,
      givenName,
      familyName,
      imageUrl,
      email
    };
  };

  _setUserProfile = (
    profile = {
      id: null,
      name: null,
      givenName: null,
      familyName: null,
      imageUrl: null,
      email: null
    }
  ) => {
    this.setState(prevState => ({
      ...prevState,
      ...profile
    }));
  };

  signInUser = async () => {
    // TODO: handle error
    let user = await this.auth.signIn();
    this._setUserSignedInStatus();
    // let authResponse = user.getAuthResponse();
    let userProfile = this._getUserProfile(user);
    this._setUserProfile(userProfile);
  };

  signOutUser = async () => {
    await this.auth.signOut();
    this._setUserSignedInStatus();
    this._setUserProfile();
  };

  renderAuthButton() {
    if (this.state.isSignedIn) {
      return <button onClick={this.signOutUser}>Sign Out</button>;
    } else if (this.state.isSignedIn === null) {
      return <button>Checking Status...</button>;
    } else {
      // User is logged out
      return <button onClick={this.signInUser}>Sign In</button>;
    }
  }

  render() {
    return (
      <div>
        <div>
          <p> {this.state.email} {this.state.givenName} </p>
        </div>
        <p>GoogleAuth Component</p>
        {this.renderAuthButton()}
      </div>
    );
  }
}

export default GoogleAuth;

 */