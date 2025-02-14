import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh7EZcPTII2nTC9MLMaEI842xWOoLZ4PM",
  authDomain: "watchstrapecommerse.firebaseapp.com",
  projectId: "watchstrapecommerse",
  storageBucket: "watchstrapecommerse.appspot.com",
  messagingSenderId: "1027463177228",
  appId: "1:1027463177228:android:c900ff80eca680b6d03a29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
