const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getdatabase, get, ref, set, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCg3GmareRAmEvjoHI7Brbd6_tE7HIziA",
    authDomain: "mordern-tools.firebaseapp.com",
    projectId: "mordern-tools",
    storageBucket: "mordern-tools.appspot.com",
    messagingSenderId: "820472292829",
    appId: "1:820472292829:web:fa73fcb9620f9e7fab0234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getdatabase(app);

// const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');

// registerBtn.addEventListener('click', () => {
//     container.classList.add("active");
// });

// loginBtn.addEventListener('click', () => {
//     container.classList.remove("active");
// });

document.getElementById("log").addEventListener('click', function (e) {
    // container.classList.add("active");
    set(ref(db, 'user/' + document.getElementById("username").value),
        {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,

        });
    alert("Login Sucessfully !!!...");
});
