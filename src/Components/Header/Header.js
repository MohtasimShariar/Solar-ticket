import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Header.css'
import Home from '../Home/Home';
import { Button, Nav, Navbar } from 'react-bootstrap';
import logo from '../Result/logo.png'
import Description from '../Others/Description';
import Blog from '../Others/Blog';
import PrivetRout from '../privetAuth/PrivetRout';
import Book from '../Book/Book';
import Login from '../Login/Login';
import Search from '../Search/Search';
export const UserContext = createContext();

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [signedInUser, setSignedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, signedInUser, setSignedInUser]}>
      <Router >
        <div>
          <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
            <Link to="/home"><Navbar.Brand href="#home" id='logoimg'><img src={logo} alt=""/></Navbar.Brand></Link>
            <Link to="/home"><Navbar.Brand href="#home">TikTak Tickets</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Link to='/home'><Nav.Link href="#home">Home</Nav.Link></Link>
                <Link to='/description'><Nav.Link href="#home">Description</Nav.Link></Link>
                <Link to='/blog'><Nav.Link href="#features">Blog</Nav.Link></Link>
                {
                  loggedInUser.name ? <Link to='/login'><Nav.Link href="#features"> {loggedInUser.name}</Nav.Link></Link> : <Link to="/login"><Button variant="warning">Login</Button></Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/description">
              <Description />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivetRout path="/book">
              <Book />
            </PrivetRout>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default Header;