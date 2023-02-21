import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyDIcZCd0Il1idA3TMun2rzm6VwiQlF-z0c",
  authDomain: "internship-react-auth.firebaseapp.com",
  projectId: "internship-react-auth",
  storageBucket: "internship-react-auth.appspot.com",
  messagingSenderId: "6719314737",
  appId: "1:6719314737:web:be12abe9ca6ad7ab8cae10",
  measurementId: "G-2PXPSE1JVK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app)

export const db = getFirestore(app)