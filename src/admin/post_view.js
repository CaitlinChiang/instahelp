import React, { Component } from 'react'
import firebase from '../services/firebaseConfig'

class Post_Add extends Component {
    state = {
        // To Fetch
        provinces: [],

        // To Input
        priority: '',
        photo: '',
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

  
    // Fetch
    post_fetch = _ => {
        firebase.database().ref('posts').once('value', snapshot => {
            snapshot.forEach((snap) => {
                var obj = {
                    provinces:snap.val().provinces,
                    priority: snap.val().priority,
                    photo: snap.val().photo,
                    photo_proof: snap.val().photo_proof,
                    name: snap.val().name,
                    category: snap.val().category,
                    province: snap.val().province,
                    address: snap.val().address,
                    condition: snap.val().condition,
                    type: snap.val().type,
                    total_amount: snap.val().total_amount,
                    voluntary_type: snap.val().voluntary_type,
                    contact: snap.val().contact,

                }
            })
        })
    }
    
 }