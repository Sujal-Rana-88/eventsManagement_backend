const express = require("express")
const { FirebaseOAuth } = require("../controller/auth/FirebaseOAuth");


const router = express.Router();

router.post("/create-user", FirebaseOAuth);

module.exports = router; 