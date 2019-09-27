import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBdOSiOWGlTNN1A5KUu2SuVNhTALlvsTw8",
    authDomain: "seersol.firebaseapp.com",
    databaseURL: "https://seersol.firebaseio.com",
    projectId: "seersol",
    storageBucket: "seersol.appspot.com",
    messagingSenderId: "930098757727"
  }

 const fire =  firebase.initializeApp(config);
 export default fire;