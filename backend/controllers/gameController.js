const fs = require("fs");
const path = require("path");

// path to games.json file
const DATA_FILE = path.resolve(__dirname, "../../public/json/games.json");

// helper function to read games
const readGames = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) return { games: [] };
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading file:", error);
    return { games: [] };
  }
};

// helper function to write games
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
  console.log("📥 Received data:", req.body); // Debug log

  const gamesData = readGames();
  const newId =
    gamesData.games.length > 0
      ? Math.max(...gamesData.games.map((g) => g.id)) + 1
      : 1;

  const { img, title, year, price, category } = req.body;

  if (!img || !title || !year || !price || !category) {
    console.error("❌ Missing fields in request:", req.body);
    return res.status(400).json({ message: "❌ Missing required fields" });
  }

  const newGame = { id: newId, img, title, year, price, category };
  gamesData.games.push(newGame);
  writeGames(gamesData.games);

  console.log("✅ New game added:", newGame);
  res.status(201).json(newGame);
};

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
