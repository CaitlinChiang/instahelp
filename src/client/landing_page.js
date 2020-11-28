import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import Button from 'react-bootstrap/Button';

class Landing_Page extends Component {

    state = {
        toggle:false
    }
    Toggle = () => {
        this.setState({toggle:!this.state.toggle})
    }
    render() {
        return (
            <div className="home-nav">
                <a className="active" href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#community">Community</a>
                <div className="logo">
                    <img src="pics\instahelp.png" class="logo">
                    </img>
                </div>
                <button className="button">Login</button>
            </div>
        )
    }
}

export default Landing_Page