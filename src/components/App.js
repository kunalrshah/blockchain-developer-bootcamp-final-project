import React from 'react'
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Pearlzz from './dashboard/Pearlzz';
import Issuer from './dashboard/Issuer/Issuer';

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
	  <>
     <Switch>
      {!isLoggedIn && (
        <Route path="/">
          <Login />
        </Route>
      )}
      <Route path="/" exact>
        <Pearlzz />
      </Route>
	  
      <Route path="/issuer" exact>
        <Issuer />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
     </Switch>
	</>
  );
}

export default App;


