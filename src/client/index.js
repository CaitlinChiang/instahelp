import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Community_Feed from './community_feed'
import Post_Add from './post_add'

function Client() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Community_Feed} />
                <Route exact path="/add-help" component={Post_Add} />
            </Switch>
        </Router>
    )
}

export default Client