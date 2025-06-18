import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const appSettings = {
  apiKey: "AIzaSyBZHbxy6D0m5otdz6Ds7ZjqVCa-j8cdWVg",
  authDomain: "verbify-65b54.firebaseapp.com",
  databaseURL: "https://verbify-65b54-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "verbify-65b54",
  storageBucket: "verbify-65b54.appspot.com",
  messagingSenderId: "853548143581",
  appId: "1:853548143581:web:0b724b539d98f4e4bb9c34"
};

const app = initializeApp(appSettings);

export { app };