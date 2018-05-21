import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyANMGcS8gWbGQelPFhu9rRAl6UsWdXlbv0',
  authDomain: 'recipes-ddb43.firebaseapp.com',
  databaseURL: 'https://recipes-ddb43.firebaseio.com',
  projectId: 'recipes-ddb43',
  storageBucket: 'recipes-ddb43.appspot.com',
  messagingSenderId: '858874012777'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
// export firestore database
export default firebaseApp.firestore()
