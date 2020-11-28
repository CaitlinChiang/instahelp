import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'

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
                    <p>{props.priority}</p>
                    <p>{props.type} {props.voluntary_type !== '' ? props.voluntary_type : `P${props.total_amount}`}</p>
                    <img src={props.photo} />
                    <p>{props.condition}</p>
                    <p>{props.province} {props.address}</p>
                    <p>{props.name}</p>
                    <p>{props.date}</p>
                    <p>{props.contact}</p>
                    <p>{props.category}</p>
                    <button>HELP</button>
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