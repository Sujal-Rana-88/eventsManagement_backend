const { admin, db } = require('../../config/firebaseConfig');

// app.post("/events/create", async (req, res) => {
const CreateEvent = async (req, res) => {
    
    const { summary, description, timestamp, email } = req.body;
    console.log(summary);
    console.log(email);

    if (!summary || !description || !timestamp || !email) {
      return res.status(400).json({ message: 'Event data is incomplete' });
    }
  
    try {
      await db.collection('events').add({
        summary,
        description,
        timestamp,
        email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({
        message: 'Error creating event',
        error: error.message,
      });
    }
  };

  module.exports = {CreateEvent};



//   const { admin, db } = require('../../config/firebaseConfig');

// const CreateEvent = async (req, res) => {
//     const { summary, description, timestamp, email } = req.body;
//     const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

//     if (!token) {
//         return res.status(401).json({ message: 'Authentication token is missing' });
//     }

//     try {
//         // Verify the token with Firebase Admin SDK
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         const userEmail = decodedToken.email;  // Get email from decoded token

//         console.log('Authenticated user email:', userEmail);
//         console.log('Event data:', { summary, description, timestamp, email });

//         // Check if the email from the request matches the authenticated user's email
//         if (email !== userEmail) {
//             return res.status(403).json({ message: 'Email does not match authenticated user' });
//         }

//         if (!summary || !description || !timestamp || !email) {
//             return res.status(400).json({ message: 'Event data is incomplete' });
//         }

//         // Add event to Firestore
//         await db.collection('events').add({
//             summary,
//             description,
//             timestamp,
//             email,
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         });

//         res.status(201).json({ message: 'Event created successfully' });
//     } catch (error) {
//         console.error('Error creating event:', error);
//         res.status(500).json({
//             message: 'Error creating event',
//             error: error.message,
//         });
//     }
// };

// module.exports = { CreateEvent };
