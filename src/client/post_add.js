import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'
import logo from '../img/instahelp.png';

class Post_Add extends Component {
    state = {
        // To Fetch
        provinces: [],

        // To Input
        photo: '',
        priority: '',
        photo_proof: '',
        name: '',
        category: '',
        province: '',
        address: '',
        condition: '',
        type: '',
        total_amount: '',
        voluntary_type: '',
        contact: ''
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

    handleChange_Photos = event => {
        event.preventDefault()
        this.setState({ 
            photo: URL.createObjectURL(event.target.files[0]),
            photo_proof: event.target.files[0]
        })
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
            photo: '',
            priority: '',
            photo_proof: '',
            name: '',
            category: '',
            province: '',
            address: '',
            condition: '',
            type: '',
            total_amount: '',
            voluntary_type: '',
            contact: ''
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
    post_add = event => {
        event.preventDefault()

        const { priority, name, category, province, address, condition, type, total_amount, voluntary_type, contact } = this.state

        const add = _ => {
            let id = this.timestamp()

            let confirm = window.confirm("Are you sure you would like to publish this entry?")
            if (confirm) {
                firebase.database().ref('posts').child(id).update({
                    priority: priority,
                    name: name,
                    category: category,
                    province: province,
                    address: address,
                    condition: condition,
                    type: type,
                    total_amount: total_amount,
                    voluntary_type: voluntary_type,
                    contact: contact,
                    date: id,
                    approved: false
                })

                this.photo_add(id)
                this.clear()
            }
        }
        
        if (priority.trim() !== '' && name.trim() !== '' && category.trim() !== '' && province.trim() !== '' && address.trim() !== '' && condition.trim() !== '' && type.trim() !== '' && contact.trim() !== '') {
            if (type === 'Monetary' && Number.isNaN(parseInt(total_amount)) || Number.isNaN(parseInt(contact))) {
                alert("Kindly only input numbers in the price and contact number field.")
            }
            else {
                if (type === 'Monetary' && parseInt(total_amount) > 0) add()
                else if (type === 'Voluntary' && voluntary_type.trim() !== '') add()
                else alert("Kindly fill in all input fields.")
            }
        }
        else alert("Kindly fill in all input fields.")
    }

    photo_add = async id_num => {
        const data = new FormData()
    
        data.append('file', this.state.photo_proof)
        data.append('upload_preset', 'instahelp')
        data.append('tags', [id_num])
        const response = await fetch('https://api.cloudinary.com/v1_1/instahelp/image/upload', { method: 'POST', body: data })
        const photo = await response.json()
    
        firebase.database().ref('posts').child(id_num).update({
            photo: photo.secure_url
        })
    }

    // Render
    type_extended = _ => {
        const { type, total_amount, voluntary_type } = this.state

        if (type === 'Monetary') {
            return (
                <div>
                    <p>P</p>
                    <input type="text" value={total_amount.trim()} name="total_amount" onChange={this.handleChange} placeholder="10000.00" />
                </div>
            )
        }
        else if (type === 'Voluntary') {
            return (
                <div>
                    <button style={{ backgroundColor: voluntary_type === 'Rescue' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'voluntary_type', 'Rescue')}>Rescue</button>
                    <button style={{ backgroundColor: voluntary_type === 'Rebuild' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'voluntary_type', 'Rebuild')}>Rebuild</button>
                    <button style={{ backgroundColor: voluntary_type === 'Cleanup' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'voluntary_type', 'Rebuild')}>Rebuild</button>
                </div>
            )
        }
    }

    render() {
        const { photo, priority, name, category, province, provinces, address, condition, type, contact } = this.state

        return (
            <section id="post_form">
                <div className="home-nav">
                    <a className="active" href="/landing_page.js"><img src={logo} height='40px' alt="Logo"/></a>
                    <a className="active" href="#About">About</a>
                    <a href="/community">Community</a>
                    <a href="/register-helper">Volunteer</a>
                    <a href="/add-help">Request for Help</a>
                </div>
                <form id="post_add">

                    <div>
                        <p>Photo of Situation</p>
                        <input type="file" onChange={this.handleChange_Photos} class="fileInput" />
                        <img src={photo} style={{ width: '200px' }} />
                    </div>

                    <div>
                        <p>Priority</p>
                        <button style={{ backgroundColor: priority === 'High' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'priority', 'High')}>High</button>
                        <button style={{ backgroundColor: priority === 'Medium' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'priority', 'Medium')}>Medium</button>
                        <button style={{ backgroundColor: priority === 'Low' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'priority', 'Low')}>Low</button>
                    </div>

                    <div>
                        <p>Name of Contact Person</p>
                        <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="ex. Juan Dela Cruz" />
                    </div>

                    <div>
                        <p>Category of Concern</p>
                        <button style={{ backgroundColor: category === 'Individual' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'category', 'Individual')}>Individual</button>
                        <button style={{ backgroundColor: category === 'Community' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'category','Community')}>Community</button>
                    </div>

                    <div>
                        <p>Location of Help Needed</p>
                        <select value={province} name="province" onChange={this.handleChange}>
                            <option value="">- Province -</option>
                            { this.sortArray(provinces).map(item => <option value={item}>{item}</option>) }
                        </select>
                        <input type="text" value={address} name="address" onChange={this.handleChange} placeholder="Specific Address" />
                    </div>

                    <div>
                        <p>Condition (What do you need help with?)</p>
                        <input type="text" value={condition} name="condition" onChange={this.handleChange} placeholder="ex. Hospital fund for father with stage 4 cancer" />
                    </div>

                    <div>
                        <p>Type of Help Needed</p>
                        <button style={{ backgroundColor: type === 'Monetary' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'type', 'Monetary')}>Monetary</button>
                        <button style={{ backgroundColor: type === 'Voluntary' ? 'black' : 'grey' }} onClick={event => this.handleChange_Button(event, 'type', 'Voluntary')}>Voluntary</button>

                        { this.type_extended() }
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