const { Router } = require("express");
const getTemperaments = require("../controllers/getTemperaments");
const router = Router();
router.get("/", async (req, res) => {
  getTemperaments()
    .then((r) => res.json(r))
    .catch((e) => res.status(401).send(e.message));
});

module.exports = router;
