import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB8wkV2KcHH-auqFEYJz58vzTyLotzkPV4",
    authDomain: "online-shop-5ee7f.firebaseapp.com",
    projectId: "online-shop-5ee7f",
    storageBucket: "online-shop-5ee7f.appspot.com",
    messagingSenderId: "499965144823",
    appId: "1:499965144823:web:6af1f8d9c84f543f26edf2"
    
  };
  
  // Initialize Firebase
  const firebase = Firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db, auth};

  