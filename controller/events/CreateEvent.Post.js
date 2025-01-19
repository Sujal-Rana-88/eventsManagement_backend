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