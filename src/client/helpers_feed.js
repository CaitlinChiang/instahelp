import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import logo from '../img/instahelp.png';

class Helpers_Feed extends Component {
    state = {
        helpers: [],
        provinces: [],
        location: ''
    }

    componentDidMount = _ => {
        this.provinces_fetch()
        this.helpers_fetch()
    }

    // General
    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    sortArray = (array) => {
	    return array.sort((a, b) => {
	        var x = a
	        var y = b
	        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
	    })
    }

    // Fetch
    provinces_fetch = _ => {
        firebase.database().ref('locations').once('value', snapshot => {
            snapshot.forEach((snap) => {
                this.setState({ provinces: this.state.provinces.concat(snap.key) })
            })
        })
    }

    helpers_fetch = _ => {
        firebase.database().ref('helpers').once('value', snapshot => {
            snapshot.forEach((snap) => {
                var obj = {
                    timestamp: snap.key,
                    accredited: snap.val().accredited,
                    type: snap.val().type,
                    birth_certificate: snap.val().birth_certificate,
                    dti_registration: snap.val().dti_registration,
                    name: snap.val().name,
                    contact: snap.val().contact,
                    biography: snap.val().biography,
                    service: snap.val().service,
                    location_help: snap.val().location_help
                }
                this.setState({ helpers: this.state.helpers.concat(obj) })
            })
        })
    }

    // Render
    helpers_render = props => {
        const { location } = this.state

        const helper = props => {
            return (
                <div class="post">
                    <p>{props.type}</p>
                    <p>{props.biography}</p>
                    <p>{props.accredited === true ? 'Accredited' : 'Not Accredited'}</p>
                    <p>{props.location_help}</p>
                    <p>{props.service}</p>
                    <p>{props.name}</p>
                    <p>{props.contact}</p>
                </div>
            )
        }
        
        if (location.trim() !== '') {
            if (props.location_help === location) return helper(props)
        }
        else {
            return helper(props)
        }
    }

    render() {
        const { location, provinces, helpers } = this.state

        return (
            <section id="community_section">
                <div className="home-nav">
                    <a className="active" href="/"><img src={logo} height='40px' alt="Logo"/></a>
                    <a href="/community">Community</a>
                    <a href="/partners">Partners Hub</a>
                    <a href="/register-helper">Volunteer</a>
                    <a href="/add-help">Request for Help</a>
                </div>

                <div className="sublanding">
                    <div className="sublanding-content">
                        <h1>We're in this together.</h1>
                        <p>Join our hub of volunteer helpers operating independently nationwide.</p>
                    </div>
                </div>

                <div id="community_header">
                    <select value={location} name="location" onChange={this.handleChange}>
                        <option value="">- Choose Location -</option>
                        <option value="Nationwide">Nationwide</option>
                        { this.sortArray(provinces).map(item => <option value={item}>{item}</option>) }
                    </select>
                </div>

                <div id="community_contents">
                    { helpers.map(this.helpers_render) }
                </div>
            </section>
        )
    }
}

export default Helpers_Feed