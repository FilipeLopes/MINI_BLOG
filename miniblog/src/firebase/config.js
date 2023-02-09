import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAik6_is6H5bE8ZVPypyEXRh562jB5HV6M",
    authDomain: "blog-771c4.firebaseapp.com",
    projectId: "blog-771c4",
    storageBucket: "blog-771c4.appspot.com",
    messagingSenderId: "229222429113",
    appId: "1:229222429113:web:ddc67fa3562f0ee809c668"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };