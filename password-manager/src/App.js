import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Passwords from "./components/password-list.component";
import EditPassword from "./components/edit-password.component";
import CreatePassword from "./components/create-password.component";
import CreateUser from "./components/create-user.component";
import GeneratePassword from "./components/crypt.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Passwords} />
      <Route path="/edit/:id" component={EditPassword} />
      <Route path="/create" component={CreatePassword} />
      <Route path="/user" component={CreateUser} />
      <Route path="/crypt" component={GeneratePassword}/>
      </div>
    </Router>
  );
}

export default App;
