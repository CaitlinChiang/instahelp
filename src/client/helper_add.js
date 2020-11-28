import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'

class Post_Add extends Component {
    state = {
        accredited: false,
        type: '',
        birth_certificate: '',
        birth_certificate_photo: '',
        dti_registration: '',
        dti_registration_photo: '',
        name: '',
        contact: '',
        biography: '',
        areas_served: '',
        provinces:[],
    }


    // General
    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleChange_Button = (event, state, state_value) => {
        event.preventDefault()
        this.setState({ [state]: state_value })
    }

    // Fetch
    provinces_fetch = _ => {
        firebase.database().ref('locations').once('value', snapshot => {
            snapshot.forEach((snap) => {
                this.setState({ provinces: this.state.provinces.concat(snap.key) })
            })
        })
    }


    // Render Data

    render() {
        const {accredited, type, contact, provinces, birth_certificate,  birth_certificate_photo, dti_registration, dti_registration_photo, name, biography, areas_served} = this.state
        return (
            <section id="help_section">
                 <form id="post_add">
                    
                    <div>
                        <p>Type of Helper</p>
                        <button style={{ backgroundColor: type === 'Individual' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'type', 'Individual')}>Individual</button>
                        <button style={{ backgroundColor: type === 'Group' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'type','Group')}>Group</button>
                        <button style={{ backgroundColor: type === 'Organization' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'type','Organization')}>Organization</button>
                    </div>

                    <div>
                        <p>Are you applying for Accreditation?</p>
                        <button style={{ backgroundColor: accredited === true ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'accredited', true)}>Yes</button>
                        <button style={{ backgroundColor: accredited === false ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'accredited', false)}>No</button>
                    </div>

                    <div>
                        <p>Photo of Situation</p>
                        <input type="file" onChange={this.handleChange_Photos} class="fileInput" />
                        <img style={{ width: '200px' }} />
                        {/* Make a note: birth certificate and dti*/}
                    </div>

                    <div>
                        <p>Name of Helper/Representative</p>
                        <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="ex. Juan Dela Cruz" />
                    </div>

                    <div>
                        <p>Biography of Helper</p>
                        <input type="text" value={biography} name="biography" onChange={this.handleChange} placeholder="ex. I am a former Lifeline Rescue Team Member" />
                    </div>


                    <div>
                        <p>Location of Help Needed</p>
                        {/*add multi-select of provinces*/}

                       
                    </div>

                    <div>
                        <p>Services Offered:</p>
                        {/*add multi-select of services*/}
                     
                    </div>

                    <div>
                        <input type="text" value={contact.trim()} name="contact" onChange={this.handleChange} placeholder="ex. 09989034569" />
                    </div>

                    <button onClick={this.post_add}>PUBLISH ENTRY</button>

                </form>
            </section>
        )
        
    }

}

export default Post_Add
