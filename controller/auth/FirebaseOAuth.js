const { admin, db } = require('../../config/firebaseConfig');

// Create a new user
const FirebaseOAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      await db.collection('users').doc(uid).set({
        email,
        uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({
        message: 'User created successfully',
        uid,
        email,
      });
    } else {
      res.status(400).json({
        message: 'User already exists',
        uid,
        email,
      });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Error verifying user',
      error: error.message,
    });
  }
};

module.exports = { FirebaseOAuth };
