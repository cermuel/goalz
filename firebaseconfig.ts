import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxaL3sLyozfbvGfLd1-C1RWvezAb8CfJI",
  authDomain: "goalz-db6e6.firebaseapp.com",
  projectId: "goalz-db6e6",
  storageBucket: "goalz-db6e6.appspot.com",
  messagingSenderId: "404612729206",
  appId: "1:404612729206:web:18b88f7d7f45c0d4031257",
  measurementId: "G-SEK6VF23V7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
