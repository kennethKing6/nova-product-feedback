
var admin = require("firebase-admin");
var {getAuth} = require("firebase-admin/auth")
var serviceAccount = require("./serviceAccountKey.json");

const firebaseDefaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


exports.firebaseAuth = getAuth(firebaseDefaultApp)