import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { notify } from '../utils/index'
import { doc, setDoc, arrayUnion, arrayRemove, updateDoc  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChPfb0-bn7Wgji2NDlJKKvSeD7ZUhuWk0",
  authDomain: "test-front-beccd.firebaseapp.com",
  projectId: "test-front-beccd",
  storageBucket: "test-front-beccd.appspot.com",
  messagingSenderId: "389550173889",
  appId: "1:389550173889:web:f90b37bece219bb53d6e40"
}

const app = firebase.initializeApp(firebaseConfig)
const auth = app.auth()
const db = app.firestore()

const googleProvider = new firebase.auth.GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider)
    const user = res.user
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get()
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
    }
  } catch (err) {
    notify('error', '!Upss el usuario no se ha podido conectar, por favor verifica tus datos!', 'error_adding_favorite')
  }
}

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password)
  } catch (err) {
    console.error(err)
    notify('error', '!Upss el usuario no existe en nuestra base, por favor revisa tus datos!', 'error_auth')
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    const user = res.user
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (err) {
    notify('error', '!Upss el usuario no se ha podido crear, por favor verifica tus datos!', 'error_register')
  }
}


const addFavorites = async (id, email) => {
  try {
    const docRef = await setDoc(doc(db, "usuarios", email), {
      favorites: [id]
    });
  } catch (e) {
    notify('error', '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!', 'error_adding_favorite')
  }
}

const updateFavorites = async (id, email) => {
  const document = doc(db, "usuarios", email);
  try {
    await updateDoc(document, {
      favorites: arrayUnion(id)
    })
  } catch (e) {
    notify('error', '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!', 'error_updating_favorite')
  }
};

const removeFavorites = async (id, email) => {
  const document = doc(db, "usuarios", email);
  try {
    await updateDoc(document, {
      favorites: arrayRemove(id)
    })
  } catch (e) {
    notify('error', '!Upss ha ocurrido un error, vuelve a intentarlo más tarde!', 'error_removing_favorite')
  }
};

const logout = () => {
  auth.signOut()
}

export {
  auth,
  db,
  updateFavorites,
  removeFavorites,
  addFavorites,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
}