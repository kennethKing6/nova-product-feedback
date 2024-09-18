const { firebaseAuth } = require("./firebaseInit")

exports.getUser = async (idToken)=>{
   try{
    const {uid} =  await firebaseAuth.verifyIdToken(idToken)
    return uid
   }catch(err){
    console.log('Firebase Error',err)
    return null
   }
}