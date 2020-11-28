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
          <>
              <div className="navBar">
                    <button onClick={this.Toggle}>
                    </button>
                    <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                        <li href="#">Home</li>
                        <li href="#">About us</li>
                        <li href="#">Contact</li>
                    </ul>
              </div>
          </>
        );
    }

}

export default Landing_Page