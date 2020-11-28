import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Community_Feed from './community_feed'
import Post_Add from './post_add'
import Helper_Add from './helper_add'

function Client() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Community_Feed} />
                <Route exact path="/add-help" component={Post_Add} />
                <Route exact path="/helper-add" component={Helper_Add} />
            </Switch>
        </Router>
    )
}

export default Client

<link rel="stylesheet" href="style.css"/>

<div class="home-nav">
    <a class="active" href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#community">Community</a>
    <div class="logo">
        <img src="C:\Users\lenzd\OneDrive\Documents\GitHub\instahelp\pics\instahelp.png" class="logo">
    </img></div>
    <button class="button">Login</button>
</div>