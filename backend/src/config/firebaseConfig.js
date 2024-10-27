import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Read and parse the JSON file manually
const serviceAccount = JSON.parse(fs.readFileSync(path.resolve('./src/config/serviceAccountKey.json'), 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vgu-attendance-management.firebaseio.com"  
});

export default admin;
