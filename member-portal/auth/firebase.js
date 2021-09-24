import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseCredentials = {
    apiKey: "AIzaSyAv66S7rk995fQtQ2deml-im2lV4xzH67I",
    authDomain: "pikapp-member-portal.firebaseapp.com",
    projectId: "pikapp-member-portal",
    storageBucket: "pikapp-member-portal.appspot.com",
    messagingSenderId: "647433051966",
    appId: "1:647433051966:web:97bb8681ef8f909482d66f",
    measurementId: "G-40V1PZTSPL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseCredentials)
}

export default firebase;