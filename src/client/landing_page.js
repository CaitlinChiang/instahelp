import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import Button from 'react-bootstrap/Button';
import logo from '../img/instahelp.png';

class Landing_Page extends Component {

    state = {
        toggle:false
    }
    Toggle = () => {
        this.setState({toggle:!this.state.toggle})
    }
    render() {
        return (
            <section>
                <div className="home-nav">
                    <a className="active" href="/"><img src={logo} height='40px' alt="Logo"/></a>
                    <a href="/community">Community</a>
                    <a href="/partners">Partners Hub</a>
                    <a href="/register-helper">Volunteer</a>
                    <a href="/add-help">Request for Help</a>
                </div>
                <div className="landing">
                    <div className="landing-content">
                        <h1>Rapid response platform for donations and aid.</h1>
                        <p>The fastest, safest, and most direct avenue to ask and get help in a crisis. </p>
                    </div>
                </div>
                <div className="about" id="about">
                    <div className="about-content">
                        <h1>Emergencies can't wait.</h1>
                        <br></br>
                        <p>Traditional systems of emergency relief are slow, old, and broken. Anyone should be able to directly lend a hand during a crisis, especially to victims in our own communities. </p>
                        <p>We're building a pipeline for anyone to directly see who they can help in a crisis, and for people in need to request for aid quickly, safely, and straight from verifiable sources who care.</p>
                    </div>
                </div>
                <div className="register-now">
                    <div className="register-content">
                        <h1>Join us now!</h1>
                        <p>Ask help, get help. Be part of our community. Be an instant responder or use our services to communicate your needs.</p>
                    </div>
                </div>
                <div className="footer">
                    <hr></hr>
                    <div className="level">
                        <center>Made by Instahelp.</center>
                    </div>
                </div>
            </section>
        )
    }
}

export default Landing_Page

