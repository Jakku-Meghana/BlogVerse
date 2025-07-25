import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: getEnv('VITE_FIREBASE_API'),
//   authDomain: "blogverse-a7095.firebaseapp.com",
//   projectId: "blogverse-a7095",
//   storageBucket: "blogverse-a7095.firebasestorage.app",
//   messagingSenderId: "582569447091",
//   appId: "1:582569447091:web:043996d507a4c34c9e6ac6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blogverse-a7095.firebaseapp.com",
  projectId: "blogverse-a7095",
  storageBucket: "blogverse-a7095.firebasestorage.app",
  messagingSenderId: "582569447091",
  appId: "1:582569447091:web:043996d507a4c34c9e6ac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// apiKey: "AIzaSyCIi3j_rGn10GUZVNNz5VBlez11EJuzLFE",
export { auth, provider }