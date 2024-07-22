import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "./Firebase";
  
  const DOC_NAME = "Users";
  const usersCollection = collection(db, DOC_NAME);
  
  class UserService {
    addUsers = (newUser) => addDoc(usersCollection, newUser);
  
    updateUser = (id, updatedUser) => {
      const UserDoc = doc(db, DOC_NAME, id);
      return updateDoc(UserDoc, updatedUser);
    };
  
    deleteUser = (id) => {
      const UserDoc = doc(db, DOC_NAME, id);
      return deleteDoc(UserDoc);
    };
  
    getAllUsers = () => {
      return getDocs(usersCollection);
    };
  
    getUser = (id) => {
      const UserDoc = doc(db, DOC_NAME, id);
      return getDoc(UserDoc);
    };
  }
  
  export default new UserService();
  