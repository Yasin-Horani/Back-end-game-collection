const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);
router.post("/", gameController.addGame);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);

module.exports = router;