import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Home from "./Home/Home";
import Login from "./Login/Login";

const App = () => {
  //to mange user login state
  const [user, setUser] = useState(false);

  useEffect(() => {
    //initiates Google Oauth setup
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "97601987605-ii58bvljlo9mf9k7n30aui51nb7fo0nj.apps.googleusercontent.com",
        scope: "profile",
      });
    });
  }, []);

  return (
    <div>{user ? <Home setUser={setUser} /> : <Login setUser={setUser} />}</div>
  );
};

export default App;
