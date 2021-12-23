import { boot } from 'quasar/wrappers'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyCAIJbIgjriUXRGxMEhA_ylKePpVvQJKHA",
    authDomain: "taskmanager-81262.firebaseapp.com",
    projectId: "taskmanager-81262",
    storageBucket: "taskmanager-81262.appspot.com",
    messagingSenderId: "132263833785",
    appId: "1:132263833785:web:f2289a7ce742fed5346b68",
    measurementId: "G-PSWKVCTP0E"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async( /* { app, router, ... } */ ) => {

});