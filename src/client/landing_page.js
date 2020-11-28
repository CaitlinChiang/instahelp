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
            <section>
                <div className="home-nav">
                    <a className="active" href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="community">Community</a>
                    <div className="apply">
                        <span class="home-button">Login</span>
                        <span class="home-button">Register</span>
                    </div>
                </div>
                <div className="landing">
                    <div className="landing-content">
                        <h1>Be part of a community that serves others.</h1>
                        <p>We are working towards building a community for people to contribute their time and resources towards a noble goal. </p>
                    </div>
                </div>
                <div className="about">
                    <div className="about-content">
                        <h1>We are a hub of volunteers.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Landing_Page

