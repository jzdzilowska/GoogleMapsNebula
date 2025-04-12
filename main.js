import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseconfig } from "./private.js";

const firebaseConfig = firebaseconfig;
console.log(firebaseConfig);
console.log("hi");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// DOM elements
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userInfo = document.getElementById("userInfo");


// Sign in 
signInBtn.onclick = () => {
  console.log("Sign in button clicked");
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log("User signed in:", user);
    })
    .catch(error => {
      console.error("Error signing in:", error);
    });
};

// Sign out 
signOutBtn.onclick = () => {
  signOut(auth).then(() => {
    console.log("User signed out.");
  });
};

// Handle auth state
onAuthStateChanged(auth, user => {
  if (user) {
    signInBtn.style.display = "none";
    signOutBtn.style.display = "inline";
    userInfo.innerHTML = `
      <p>👋 Welcome, ${user.displayName}</p>
    `;
  } else {
    signInBtn.style.display = "inline";
    signOutBtn.style.display = "none";
    userInfo.innerHTML = "";
  }
});