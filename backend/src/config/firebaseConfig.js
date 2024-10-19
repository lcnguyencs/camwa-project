const admin = require('firebase-admin');

// Path to your Firebase service account JSON file
const serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vgu-attendance-management.firebaseio.com",  // Your project database URL
});

module.exports = admin;
