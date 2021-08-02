const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hitting the route");
})


module.exports = router;