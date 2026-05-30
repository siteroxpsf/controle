import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey:
    "AIzaSyBxlznqulQAmADsu1tyHkzwsIogXRdJjHM",

    authDomain:
    "siterox-2a65d.firebaseapp.com",

    projectId:
    "siterox-2a65d",

    storageBucket:
    "siterox-2a65d.firebasestorage.app",

    messagingSenderId:
    "144750299369",

    appId:
    "1:144750299369:web:5df7d8f86b5d42dac50878",

    measurementId: 
    "G-WW7GN5PT87"

};

const app =
    initializeApp(firebaseConfig);

export const db =
    getFirestore(app);