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
                        <h1>We are working towards bridging the gap between people and services.</h1>
                    </div>
                </div>
                <div className="about" id="about">
                    <div className="about-content">
                        <h1>We are a hub of volunteers.</h1>
                        <p>Our goal is to build a volunteer pipeline for people in need. Our request directory aims to help individuals, organizations, and other institutions forward their needs and services on a public space for emergency response.</p>
                    </div>
                </div>
                <div className="register-now">
                    <div className="register-content">
                        <h1>Join us now!</h1>
                        <p>Be part of our community. Be an instant responder or use our services to communicate your needs.</p>
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

