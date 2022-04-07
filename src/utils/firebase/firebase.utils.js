import {initializeApp} from 'firebase/app'; 
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAiimgexRIWeK9uhHCN7ABAhsTBXc9BKMw",
    authDomain: "crwn-clothing-db-f8feb.firebaseapp.com",
    projectId: "crwn-clothing-db-f8feb",
    storageBucket: "crwn-clothing-db-f8feb.appspot.com",
    messagingSenderId: "89615091694",
    appId: "1:89615091694:web:d72990e9ddd12bfb6fb0ff"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
        
    if(!userSnapshot.exists()) {        
        const { displayName, email } = userAuth;
        const createdAt = new Date();
       
        try {
           
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log("error: ", error.message);
        }
    }

    return userDocRef;
  };