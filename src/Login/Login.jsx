import React from "react";
import GoogleLogin from "react-google-login";
import "./Login.css";

const Login = ({ setUser }) => {
  const responseGoogle = async (response) => {
    //once it sets the userdata the user will be logged in
    setUser(response.profileObj);
  };
  return (
    <div className="login">
      <div className="login__left">
        <div className="login__leftContainer">
          <h1 className="login__emoji1">😉</h1>
          <h1 className="login__emoji2">🤔</h1>
          <h1 className="login__emoji3">👨‍💻</h1>
        </div>
        <h1>Search City Details</h1>
        <p>A complete application to get complete city details.</p>
      </div>
      <div className="login__right">
        <div className="login__rightContainer">
          <h1>Get Started</h1>
          <GoogleLogin
            clientId="97601987605-ii58bvljlo9mf9k7n30aui51nb7fo0nj.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            scope="profile"
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
