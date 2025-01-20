const { admin, db } = require('../../config/firebaseConfig');
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate an access token for a user
const generateAccessToken = (user) => {
  return jwt.sign(
    { userName: user.userName, userId: user.userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Create a new user or handle existing users
const FirebaseOAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    // Check if the user already exists in Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // If the user doesn't exist, create a new user
      await db.collection('users').doc(uid).set({
        email,
        uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Create a custom JWT for the new user
      const newToken = await admin.auth().createCustomToken(uid);

      res.status(200).json({
        message: 'User created successfully',
        uid,
        email,
        token: newToken,  // Send the JWT in the response
      });
    } else {
      // If the user already exists, create a new custom JWT for them
      const existingToken = await admin.auth().createCustomToken(uid);

      // Generate a custom access token (JWT) for the user
      const user = { userName: email, userId: uid };  // Set user data for the access token
      const accessToken = generateAccessToken(user);

      res.status(400).json({
        message: 'User already exists',
        uid,
        email,
        token: accessToken,  // Send the custom access token in the response
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
