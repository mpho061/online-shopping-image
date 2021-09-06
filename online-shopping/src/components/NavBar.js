import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Cart from './Cart';
import Shop from './Shop';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Button } from '@material-ui/core';
import { auth } from '../Firebase';
const NavBar = () => {
    function logout() {
        auth.signOut().then(
            alert("Signed out")
        )
    }
    return (
        <Router>
            <header className="header">
                <nav className="navBar">
                    <a className="logo-nav">Logo</a>
                    <ul className="menu-nav">
                        <Link className="link-nav" to="/">Home</Link>
                        <Link className="link-nav" to="/Cart" >Cart</Link>
                        <Link className="link-nav" to="/SignUp">SignUp</Link>
                        <Button onclick={() => logout()}>Logout</Button>

                    </ul>
                </nav>
            </header>
            <Switch>
                <Route exact path="/">
                    <Shop></Shop>
                </Route>

                <Route exact path="/Cart">
                    <Cart></Cart>
                </Route>

                <Route exact path="/SignUp">
                    <SignUp></SignUp>
                </Route>

                <Route exact path="/SignIn">
                    <SignIn></SignIn>
                </Route>
            </Switch>
        </Router>

    );
};

export default NavBar;