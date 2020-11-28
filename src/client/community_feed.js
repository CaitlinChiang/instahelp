import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import Button from 'react-bootstrap/Button';
import logo from '../img/instahelp.png';

class Community_Feed extends Component {
    state = {
        location: '',
        provinces: [],
        posts: []
    }

    componentDidMount = _ => {
        this.provinces_fetch()
        this.posts_fetch()
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

    posts_fetch = _ => {
        firebase.database().ref('posts').once('value', snapshot => {
            snapshot.forEach((snap) => {
                var post = {
                    address: snap.val().address,
                    category: snap.val().category,
                    condition: snap.val().condition,
                    contact: snap.val().contact,
                    date: snap.val().date,
                    name: snap.val().name,
                    photo: snap.val().photo,
                    priority: snap.val().priority,
                    province: snap.val().province,
                    total_amount: snap.val().total_amount,
                    type: snap.val().type,
                    voluntary_type: snap.val().voluntary_type
                }
                this.setState({ posts: this.state.posts.concat(post) })
            })
        })
    }

    // Render
    posts_render = props => {
        const { location, posts } = this.state

        const post = props => {
            return (

                <div class="post">
                    <img src={props.photo} />
                    <h1>{props.condition}</h1>
                    <p>
                        <span class="tag">{props.priority}</span>
                        <span class="tag">{props.type}</span>
                        <span class="tag">{props.category}</span>
                        <span class="tag">{props.province}</span>
                    </p>
                    <p>{props.type} {props.voluntary_type !== '' ? props.voluntary_type : `P${props.total_amount}`}</p>
                    <p>{props.condition}</p>
                    <p>{props.address}</p>
                    <p>{props.name}</p>
                    <p>{props.date}</p>
                    <p>{props.contact}</p>
                    <p>{props.category}</p>
                    <Button variant="primary">Donate</Button>
                </div>
            )
        }
        
        if (location.trim() !== '') {
            if (props.province === location) return post(props)
        }
        else {
            return post(props)
        }
    }

    render() {
        const { location, provinces, posts } = this.state

        return (
            <section id="community_section">
                <div className="home-nav">
                    <a className="active" href="/landing_page.js"><img src={logo} height='40px' alt="Logo"/></a>
                    <a className="active" href="#About">About</a>
                    <a href="/community">Community</a>
                    <a href="/register-helper">Volunteer</a>
                    <a href="/add-help">Request for Help</a>
                    <div className="nav-apply">
                        <button type="button">Login</button>
                        <button type="button">Register</button>
                    </div>
                </div>
                <div id="community_header">
                    <select value={location} name="location" onChange={this.handleChange}>
                        <option value="">- Choose Location -</option>
                        { this.sortArray(provinces).map(item => <option value={item}>{item}</option>) }
                    </select>
                </div>

                <div id="community_contents">
                    { posts.map(this.posts_render) }
                </div>
            </section>
        )
    }
}

export default Community_Feed