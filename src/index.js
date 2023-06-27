import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
import { firebaseConfig } from "../firebase/firebaseConfig";
import "firebase/database";

// Initialize firebase app
const fireApp = initializeApp(firebaseConfig);

export default fireApp;
