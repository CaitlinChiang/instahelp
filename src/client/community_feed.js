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

    // Fetch Data
    provinces_fetch = _ => {
        firebase.database().ref('locations').once('value', snapshot => {
            snapshot.forEach((snap) => {
                this.setState({ provinces: this.state.provinces.concat(snap.key) })
            })
        })
    }

    posts_fetch = _ => {

    }

    // Render Data
    posts_render = props => {

    }

    render() {
        return (
            <section>
                <div id="community_header">

                </div>

                <div id="community_contents">

                </div>
            </section>
        )
    }
}

export default Community_Feed