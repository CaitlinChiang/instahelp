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
                        <h1>Be part of a community in service of others.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                    </div>
                </div>
                <div className="about" id="about">
                    <div className="about-content">
                        <h1>We are a hub of volunteers.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p>
                    </div>
                </div>
                <div className="register-now">
                    <div className="register-content">
                        <h1>Register Now</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                        <div className="apply">
                            <button type="button">Register</button>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="level1">
                        <p>Copy</p>
                    </div>
                    <hr></hr>
                    <div className="level2">
                        <a className="active" href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="community">Community</a>
                    </div>
                </div>
            </section>
        )
    }
}

export default Landing_Page

