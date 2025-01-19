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