import Image from "next/image";
import Signup from "./Signup/page";
import Login from "./Login/page";

export default function Home() {
  return (
    <>
      {/* <Signup /> */}
      <Login />
      {/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRTJoEADHKuwBhboz5Ta1yyZvRCMnSZoU",
  authDomain: "movierecom-9c0b4.firebaseapp.com",
  projectId: "movierecom-9c0b4",
  storageBucket: "movierecom-9c0b4.firebasestorage.app",
  messagingSenderId: "424250778344",
  appId: "1:424250778344:web:e73ed6c292484a8b575f5d",
  measurementId: "G-01JBHDKGWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */}
    </>
  );
}
