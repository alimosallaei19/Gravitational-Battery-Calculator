import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBfTEd6PHkuShHvDEXTJkBNajvMQj5mZ-Q",
    authDomain: "ttrack-334904.firebaseapp.com",
    projectId: "ttrack-334904",
    storageBucket: "ttrack-334904.appspot.com",
    messagingSenderId: "133248124356",
    appId: "1:133248124356:web:196a910e604861d06dd091"
}

firebase.initializeApp(firebaseConfig)

export const auth = getAuth()
export const provider = new GoogleAuthProvider() 