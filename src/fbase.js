import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyB31BiQAkhgDDn74ArBnmE5565ZIEFf5tY',
    authDomain: 'catch-order.firebaseapp.com',
    projectId: 'catch-order',
    storageBucket: 'catch-order.appspot.com',
    messagingSenderId: '413173069237',
    appId: '1:413173069237:web:241378ec3d4be8132395fc',
    measurementId: 'G-XC5HZJMMTN'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
