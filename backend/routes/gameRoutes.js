const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API for managing games
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
 */
router.get("/", gameController.getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Game data
 *       404:
 *         description: Game not found
 */
router.get("/:id", gameController.getGameById);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Add a new game
 *     tags: [Games]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *               title:
 *                 type: string
 *                 example: "CARRION"
 *               year:
 *                 type: integer
 *                 example: 2020
 *               price:
 *                 type: number
 *                 example: 19
 *               category:
 *                 type: string
 *                 example: "Horror"
 *     responses:
 *       201:
 *         description: Game added successfully
 */
router.post("/", gameController.upload, gameController.addGame);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Game Name"
 *               year:
 *                 type: integer
 *                 example: 2023
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       404:
 *         description: Game not found
 */
router.put("/:id", gameController.updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 */
router.delete("/:id", gameController.deleteGame);

module.exports = router;
