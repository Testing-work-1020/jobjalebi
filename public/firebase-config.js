// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBsamZ1W1dzd0XJLl-22a5pW7H30sNGPJs",
  authDomain: "jobjalebi.firebaseapp.com",
  databaseURL: "https://jobjalebi-default-rtdb.firebaseio.com",
  projectId: "jobjalebi",
  storageBucket: "jobjalebi.appspot.com",
  messagingSenderId: "854377396256",
  appId: "1:854377396256:web:080fa1cc9f0344ee40e445"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
