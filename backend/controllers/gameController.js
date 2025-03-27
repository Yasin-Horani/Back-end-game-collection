const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Stel opslaglocatie in voor afbeeldingen
const upload = multer({
    dest: path.resolve(__dirname, "../../public/img/"), // Opslagmap
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
});

const DATA_FILE = path.resolve(__dirname, "../../public/json/games.json");

const readGames = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return { games: [] };
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch (error) {
        console.error("❌ Error reading file:", error);
        return { games: [] };
    }
};

const writeGames = (games) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ games }, null, 4));
    } catch (error) {
        console.error("❌ Error writing file:", error);
    }
};

// get all games
exports.getAllGames = (req, res) => {
  res.json(readGames());
};

// get single game
exports.getGameById = (req, res) => {
  const gamesData = readGames();
  const game = gamesData.games.find((g) => g.id == req.params.id);
  if (!game) return res.status(404).json({ message: "❌ Game not found" });

  res.json(game);
};

// add new game
exports.addGame = (req, res) => {
  const gamesData = readGames();
  const newId = gamesData.games.length > 0 ? Math.max(...gamesData.games.map(g => g.id)) + 1 : 1;
  
  const { title, year, price, category } = req.body;
  if (!title || !year || !price || !category || !req.file) {
      return res.status(400).json({ message: "❌ Missing required fields" });
  }

  const imgPath = `img/${req.file.filename}`;

  const newGame = { id: newId, img: imgPath, title, year, price, category };
  gamesData.games.push(newGame);
  writeGames(gamesData.games);

  res.status(201).json(newGame);
};

exports.upload = upload.single("image");

// update game
exports.updateGame = (req, res) => {
  const gameId = parseInt(req.params.id);
  const gamesData = readGames(); // ✅ Lees games uit JSON-bestand
  const gameIndex = gamesData.games.findIndex((game) => game.id === gameId);

  if (gameIndex === -1) {
    return res.status(404).json({ message: "❌ Game not found" });
  }

  // Update only the fields specified in req.body
  const updatedGame = { ...gamesData.games[gameIndex], ...req.body };
  gamesData.games[gameIndex] = updatedGame;

  writeGames(gamesData.games); // write updated games back to JSON file

  res.json(updatedGame); // Return updated game
};

// delete game
exports.deleteGame = (req, res) => {
  const gamesData = readGames();
  const filteredGames = gamesData.games.filter((g) => g.id != req.params.id);

  if (gamesData.games.length === filteredGames.length) {
    return res.status(404).json({ message: "❌ Game not found" });
  }

  writeGames(filteredGames);
  res.json({ message: "✅ Game deleted" });
};
