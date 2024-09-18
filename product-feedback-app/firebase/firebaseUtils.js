import { firebaseAuth } from "./firebase";

export  const getFirebaseToken = async ()=>{
    return await firebaseAuth.currentUser.getIdToken(true);
    
}