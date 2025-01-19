const express = require("express")
const { GetEvents } = require("../controller/events/GetEvents.Post");
const { CreateEvent } = require("../controller/events/CreateEvent.Post");


const router = express.Router();

router.post("/events", GetEvents);
router.post("/events/create", CreateEvent);

module.exports = router; 