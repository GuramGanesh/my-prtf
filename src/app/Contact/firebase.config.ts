import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALv7JoJ2T6XNlgyt44bdnpereVo4koQ0I",
  authDomain: "ganeshguram-ff83f.firebaseapp.com",
  projectId: "ganeshguram-ff83f",
  storageBucket: "ganeshguram-ff83f.firebasestorage.app",
  messagingSenderId: "452533455972",
  appId: "1:452533455972:web:841ae8183222344fbf6371",
  measurementId: "G-JS15M4DMQC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };