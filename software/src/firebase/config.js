import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import firebaseConfig from "./firebase.config";

const firebaseConfig = {
  apiKey: 'AIzaSyBgaegBX88fyBnddmLW0I6xwdKjbJbFugA',
  authDomain: 'smart-watering-system-709c9.firebaseapp.com',
  databaseURL: 'smart-watering-system-709c9-default-rtdb.firebaseio.com',
  projectId: 'smart-watering-system-709c9',
  storageBucket: 'smart-watering-system-709c9.appspot.com',
  messagingSenderId: '291644199468',
  appId: '1:291644199468:ios:5565f3e8ca04596279b789'
};


// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = firebase.initializeApp(firebaseConfig);

export { app };