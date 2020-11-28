import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'

class Helper_Add extends Component {
    state = {
        // To Fetch
        helpers: []
    }

    componentDidMount = _ => this.provinces_fetch()

    // Fetch
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
                    biography: snap.val().biography
                }
                this.setState({ helpers: this.state.helpers.concat(obj) })
            })
        })
    }

    render() {
        return (
            <section>

            </section>
        )
    }
}

export default Helper_Add