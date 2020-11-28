import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing_Page from './landing_page'
import Community_Feed from './community_feed'
import Helpers_Feed from './helpers_feed'
import Post_Add from './post_add'
import Helper_Add from './helper_add'

function Client() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing_Page} />
                <Route exact path="/community" component={Community_Feed} />
                <Route exact path="/partners" component={Helpers_Feed} />
                <Route exact path="/add-help" component={Post_Add} />
                <Route exact path="/register-helper" component={Helper_Add} />
            </Switch>
        </Router>
    )
}

export default Client

//class Client extends Component {
//    render() {
//        return (
//            <div className="home-nav">
//                <a className="active" href="#home">Home</a>
//                <a href="#about">About</a>
//                <a href="#community">Community</a>
//                <div className="logo">
//                    <img src="C:\Users\lenzd\OneDrive\Documents\GitHub\instahelp\pics\instahelp.png" class="logo">
//                    </img>
//                </div>
//                <button className="button">Login</button>
//                </div>
//        )
//        
//    }
//}

//export default Client;