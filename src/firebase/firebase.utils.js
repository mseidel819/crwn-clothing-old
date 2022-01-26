import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBzUAlrcqEtMDC1zjYfl0A2iUwToz14jwM",
  authDomain: "crwn-db-28ebb.firebaseapp.com",
  projectId: "crwn-db-28ebb",
  storageBucket: "crwn-db-28ebb.appspot.com",
  messagingSenderId: "153159627475",
  appId: "1:153159627475:web:34bb4a2be9d49bd30d1a26",
  measurementId: "G-YQR2YS1R1Y",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(("error creating user", error.message));
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
