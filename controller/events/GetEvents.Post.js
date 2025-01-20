const { admin, db } = require('../../config/firebaseConfig');

// app.post("/events", async (req, res) => {
const GetEvents = async (req, res) => {
    const { date, email } = req.body;  // Get email and date from request body
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      let eventsQuery;
  
      // If no date is provided, get all events for the given email
      if (!date) {
         eventsQuery = db
      .collection('events')
      .where('email', '==', email)  // Filter events by user email
      .orderBy('createdAt');  
    
      
      } else {
        // If a date is provided, filter events by date range
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
  
        eventsQuery = db 
          .collection('events')
          .where('timestamp', '>=', startOfDay.toISOString())
          .where('timestamp', '<=', endOfDay.toISOString())
          .where('email', '==', email)  // Filter events by user email
          .orderBy('timestamp');
      }
  
      const eventsSnapshot = await eventsQuery.get();
      const events = eventsSnapshot.docs.map(doc => doc.data());
        const reversedEvents = [...events].reverse(); // Create a reversed copy of the events array
        console.log(reversedEvents);
      res.status(200).json(events); 
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({
        message: 'Error fetching events',
        error: error.message,
      });
    }
  };
  
  module.exports = {GetEvents};





//   const { admin, db } = require('../../config/firebaseConfig');

// const GetEvents = async (req, res) => {
//     const { date, email } = req.body;
//     const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

//     if (!token) {
//         return res.status(401).json({ message: 'Authentication token is missing' });
//     }

//     try {
//         // Verify the token with Firebase Admin SDK
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         const userEmail = decodedToken.email;  // Get email from decoded token

//         console.log('Token exists:', token);
//         console.log('Decoded token:', decodedToken);
//         console.log('Date provided:', date);
//         console.log('Email check passed:', email === userEmail);

//         // Check if the email from the request matches the authenticated user's email
//         if (email !== userEmail) {
//             return res.status(403).json({ message: 'Email does not match authenticated user' });
//         }

//         if (!email) {
//             return res.status(400).json({ message: 'Email is required' });
//         }

//         let eventsQuery;

//         // If no date is provided, get all events for the given email
//         if (!date) {
//             eventsQuery = db.collection('events')
//                 .where('email', '==', email)  // Filter events by user email
//                 .orderBy('createdAt');
//         } else {
//             // If a date is provided, filter events by date range
//             const startOfDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
//             const endOfDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999));

//             eventsQuery = db
//                 .collection('events')
//                 .where('timestamp', '>=', startOfDay.toISOString())
//                 .where('timestamp', '<=', endOfDay.toISOString())
//                 .where('email', '==', email)  // Filter events by user email
//                 .orderBy('timestamp');
//         }

//         console.log('Firestore query:', eventsQuery._queryOptions.filters);
//         console.log('Order by:', eventsQuery._queryOptions.fieldOrders);

//         const eventsSnapshot = await eventsQuery.get();

//         if (eventsSnapshot.empty) {
//             return res.status(404).json({ message: 'No events found' });
//         }

//         const events = eventsSnapshot.docs.map(doc => doc.data());
//         const reversedEvents = [...events].reverse();
//         console.log(reversedEvents);

//         res.status(200).json(reversedEvents);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({
//             message: 'Error fetching events',
//             error: error.message,
//             stack: error.stack
//         });
//     }
// };

// module.exports = { GetEvents };
