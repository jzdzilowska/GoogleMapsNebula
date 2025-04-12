import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseconfig } from "./private.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = firebaseconfig
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);