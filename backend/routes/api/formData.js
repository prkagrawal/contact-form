const express = require("express");
const router = express.Router();

router.get('/', (req,res) => res.send("form data route"));

module.exports = router;