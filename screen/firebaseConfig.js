import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASBpMD4Jt5gA8TBjVHAR4q1Z_0mdz6OtY",
  authDomain: "fir-auth-30181.firebaseapp.com",
  projectId: "fir-auth-30181",
  storageBucket: "fir-auth-30181.appspot.com",
  messagingSenderId: "5178374650",
  appId: "1:5178374650:web:7d97d27fb94841dffe0c43",
  measurementId: "G-HNGT7DH5PZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
