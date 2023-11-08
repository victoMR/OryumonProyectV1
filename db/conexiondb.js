const admin = require('firebase-admin');
const serviceAccount = require('../keys.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: '',
    appName: 'Oryumon'
});

const db = admin.firestore();

module.exports = db;

