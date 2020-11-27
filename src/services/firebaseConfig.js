import * as firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyBm-NkuprjVhQslSvT1bbtewrCDBkXeqFw",
    authDomain: "instahelp-51ba4.firebaseapp.com",
    databaseURL: "https://instahelp-51ba4.firebaseio.com",
    projectId: "instahelp-51ba4",
    storageBucket: "instahelp-51ba4.appspot.com",
    messagingSenderId: "596470483147",
    appId: "1:596470483147:web:688d917f747cc8812e734e"
}

firebase.initializeApp(firebaseConfig)

export default firebase