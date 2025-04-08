// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDmFRAju0BC4ZtKgGLWEJCxMi6fcIYRx7I",
  authDomain: "mapsnebula.firebaseapp.com",
  projectId: "mapsnebula",
  storageBucket: "mapsnebula.firebasestorage.app",
  messagingSenderId: "259467089145",
  appId: "1:259467089145:web:6221e45d46234f23487e28",
  measurementId: "G-1XV78PL1NK"
};

const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authDiv = document.getElementById('auth');
const loginForm = document.getElementById('login-form');
const toggleLink = document.getElementById('toggle');
let isSignup = false;

// Toggle between login/signup
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isSignup = !isSignup;
  loginForm.querySelector('button').textContent = isSignup ? 'Sign Up' : 'Login';
  document.getElementById('switch').innerHTML = isSignup
    ? 'Already have an account? <a href="#" id="toggle">Login</a>'
    : 'Don\'t have an account? <a href="#" id="toggle">Sign up</a>';
});

// Handle login/signup
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  if (isSignup) {
    auth.createUserWithEmailAndPassword(email, password).catch(console.error);
  } else {
    auth.signInWithEmailAndPassword(email, password).catch(console.error);
  }
});

// Listen for auth changes
auth.onAuthStateChanged(user => {
  if (user) {
    authDiv.classList.add('hidden');
    document.getElementById('slideshow').classList.remove('hidden');
    initSlideshow();
  } else {
    authDiv.classList.remove('hidden');
    document.getElementById('slideshow').classList.add('hidden');
  }
});

function initSlideshow() {
  const images = [
    'https://source.unsplash.com/random/1600x900?sig=1',
    'https://source.unsplash.com/random/1600x900?sig=2',
    'https://source.unsplash.com/random/1600x900?sig=3',
  ];

  let current = 0;
  const slide = document.getElementById('slide');
  const favBtn = document.getElementById('favBtn');
  const upload = document.getElementById('upload');

  const uid = auth.currentUser.uid;
  const favKey = `favorites_${uid}`;
  const favorites = JSON.parse(localStorage.getItem(favKey) || '[]');

  function showImage(index) {
    current = index % images.length;
    slide.src = images[current];
    updateFavBtn();
  }

  function updateFavBtn() {
    favBtn.textContent = favorites.includes(images[current]) ? '💖' : '❤️';
  }

  favBtn.onclick = () => {
    const url = images[current];
    const i = favorites.indexOf(url);
    if (i >= 0) favorites.splice(i, 1);
    else favorites.push(url);
    localStorage.setItem(favKey, JSON.stringify(favorites));
    updateFavBtn();
  };

  upload.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      images.push(url);
      showImage(images.length - 1);
    }
  };

  setInterval(() => {
    showImage((current + 1) % images.length);
  }, 4000);

  showImage(0);
}
