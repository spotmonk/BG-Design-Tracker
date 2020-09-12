import React, { useState } from 'react';
// import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

const MyNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const loadLogOut = () => {
    const { authed } = props;
    if (authed) {
      return <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={logOutEvent}>Log Out <i className="fas fa-sign-out-alt"></i></button>;
    }
    return <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={logInEvent}><i className="fab fa-google"> Log in</i></button>;
  };

  const logInEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  };

  const logOutEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const buildNavbar = () => {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
        <NavLink ><h2>New Game</h2></NavLink>
        </NavItem>
        <NavItem>
          <NavLink >{loadLogOut()}</NavLink>
        </NavItem>
      </Nav>
    );
  };

  return (
      <div>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">BG Design Tracker</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {buildNavbar()}
      </Collapse>
    </Navbar>
  </div>
  );
};

export default MyNavBar;
