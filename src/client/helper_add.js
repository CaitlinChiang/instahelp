import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import logo from '../img/instahelp.png';

class Helper_Add extends Component {

    state = {
        // To Fetch
        provinces: [],

        // To Input
        accredited: false,
        type: '',
        birth_certificate: '',
        birth_certificate_photo: '',
        dti_registration: '',
        dti_registration_photo: '',
        name: '',
        contact: '',
        biography: '',
        place: '',
        service: ''
    }

    componentDidMount = _ => this.provinces_fetch()

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

    handleChange_Photos = (event, photo_proof) => {
        event.preventDefault()

        if (photo_proof == 'birth_certificate') {
            this.setState({ 
                birth_certificate_photo: URL.createObjectURL(event.target.files[0]),
                birth_certificate: event.target.files[0]
            })
        }
        else if (photo_proof === 'dti_registration') {
            this.setState({ 
                dti_registration_photo: URL.createObjectURL(event.target.files[0]),
                dti_registration: event.target.files[0]
            })
        }
    }

    sortArray = (array) => {
	    return array.sort((a, b) => {
	        var x = a
	        var y = b
	        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
	    })
    }

    clear = _ => {
        this.setState({
            accredited: false,
            type: '',
            birth_certificate: '',
            birth_certificate_photo: '',
            dti_registration: '',
            dti_registration_photo: '',
            name: '',
            contact: '',
            biography: '',
            place: '',
            service: ''
        })
    }

    timestamp = _ => {
        let newDate = new Date()
        
        let month = newDate.getMonth() + 1;
        let dateToday = newDate.getDate();
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let mins = newDate.getMinutes();
        let sec = newDate.getSeconds();

        return (month < 10 ? (year + '-' + '0' + month) : year + '-' + month) + "-" + (dateToday < 10 ? ('0' + dateToday) : dateToday) + " " + (hour < 10 ? ('0' + hour) : hour) + ":" + (mins < 10 ? ('0' + mins) : mins) + ":" + (sec < 10 ? ('0' + sec) : sec)
    }

    // Fetch
    provinces_fetch = _ => {
        firebase.database().ref('locations').once('value', snapshot => {
            snapshot.forEach((snap) => {
                this.setState({ provinces: this.state.provinces.concat(snap.key) })
            })
        })
    }

    // Add
    helper_add = event => {
        event.preventDefault()

        const { accredited, type, name, contact, biography, place, service } = this.state

        const add = _ => {
            let id = this.timestamp()

            let confirm = window.confirm("Are you sure you would like to publish this entry?")
            if (confirm) {
                firebase.database().ref('helpers').child(id).update({
                    accredited: accredited,
                    type: type,
                    name: name,
                    contact: contact,
                    biography: biography,
                    location_help: place,
                    service: service
                })

                this.photo_add(id)
                this.clear()
            }
        }
        
        if (type.trim() !== '' && name.trim() !== '' && contact.trim() !== '' && biography.trim() !== '' && place.trim() !== '' && service.trim() !== '') {
            if (Number.isNaN(parseInt(contact))) alert("Kindly only input numbers in the price and contact number field.")
            else add()
        }
        else alert("Kindly fill in all input fields.")
    }

    photo_add = async id_num => {
        const { birth_certificate, dti_registration } = this.state

        const data = new FormData()

        data.append('file', birth_certificate)
        data.append('upload_preset', 'instahelp')
        data.append('tags', [id_num])
        const response_birth_certificate = await fetch('https://api.cloudinary.com/v1_1/instahelp/image/upload', { method: 'POST', body: data })
        const photo_birth_certificate = await response_birth_certificate.json()
        
        firebase.database().ref('helpers').child(id_num).update({
            birth_certificate: photo_birth_certificate.secure_url
        })

        data.append('file', dti_registration)
        data.append('upload_preset', 'instahelp')
        data.append('tags', [id_num])
        const response_dti_registration = await fetch('https://api.cloudinary.com/v1_1/instahelp/image/upload', { method: 'POST', body: data })
        const photo_dti_registration = await response_dti_registration.json()
        
        firebase.database().ref('helpers').child(id_num).update({
            dti_registration: photo_dti_registration.secure_url
        })
    }

    render() {

        const { provinces, accredited, type, birth_certificate_photo, dti_registration_photo, name, contact, biography, place, service } = this.state
        
        return (
            <section id="help_section">
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
                <form id="post_add">
                    <div>
                        <p>Type of Helper</p>
                        <button style={{ backgroundColor: type === 'Individual' ? '#F8A830': 'white' }} onClick={event => this.handleChange_Button(event, 'type', 'Individual')}>Individual</button>
                        <button style={{ backgroundColor: type === 'Group' ? '#F8A830': 'white' }} onClick={event => this.handleChange_Button(event, 'type','Group')}>Group</button>
                        <button style={{ backgroundColor: type === 'Organization' ? '#F8A830': 'white' }} onClick={event => this.handleChange_Button(event, 'type','Organization')}>Organization</button>
                    </div>

                    <div>
                        <p>Are you applying for Accreditation?</p>
                        <button style={{ backgroundColor: accredited === true ? '#F8A830': 'white' }} onClick={event => this.handleChange_Button(event, 'accredited', true)}>Yes</button>
                        <button style={{ backgroundColor: accredited === false ? '#F8A830': 'white' }} onClick={event => this.handleChange_Button(event, 'accredited', false)}>No</button>
                    </div>

                    <div>
                        <p>Photo of Birth Certificate</p>
                        <input type="file" onChange={event => this.handleChange_Photos(event, 'birth_certificate')} class="fileInput" />
                        <img src={birth_certificate_photo} style={{ width: '200px' }} />
                    </div>

                    { accredited || type === 'Organization' ?
                        <div>
                            <p>Photo of DTI Certification</p>
                            <input type="file" onChange={event => this.handleChange_Photos(event, 'dti_registration')} class="fileInput" />
                            <img src={dti_registration_photo} style={{ width: '200px' }} />
                        </div>
                    : null }

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
                        <select value={place} name="place" onChange={this.handleChange}>
                            <option value="">- Locations to Help -</option>
                            <option value="Nationwide">Nationwide</option>
                            { this.sortArray(provinces).map(item => <option value={item}>{item}</option>) }
                        </select>
                    </div>

                    <div>
                        <p>Services Offered:</p>
                        <select value={service} name="service" onChange={this.handleChange}>
                            <option value="">- Services Offered -</option>
                            <option value="Rescue">Rescue</option>
                            <option value="Rebuild">Rebuild</option>
                            <option value="Cleanup">Cleanup</option>
                        </select>
                    </div>

                    <div>
                        <input type="text" value={contact.trim()} name="contact" onChange={this.handleChange} placeholder="ex. 09989034569" />
                    </div>

                    <button onClick={this.helper_add}>APPLY</button>

                </form>
            </section>
        )
    }
}

export default Helper_Add