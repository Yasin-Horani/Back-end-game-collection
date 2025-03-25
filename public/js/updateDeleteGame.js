const gameSelect = document.querySelector("#Selectgame");
const updateForm = document.querySelector("#updateGameForm");

// ✅ Load all games into the select dropdown
async function loadGames() {
    try {
        const response = await fetch("http://localhost:5500/games");
        if (!response.ok) throw new Error("Failed to fetch games");

        const data = await response.json();
        console.log("Fetched games:", data); // Debugging

        gameSelect.innerHTML = '<option value="">Select a game</option>'; // Reset dropdown

        // Adjust based on API response format (Array vs Object)
        const games = Array.isArray(data) ? data : data.games; 

        games.forEach(game => {
            const option = document.createElement("option");
            option.value = game.id;
            option.textContent = game.title;
            gameSelect.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Error fetching games:", error);
    }
}

// ✅ Populate form when a game is selected
gameSelect.addEventListener("change", async (e) => {
    const gameId = e.target.value;
    if (!gameId) return;

    try {
        const response = await fetch(`http://localhost:5500/games/${gameId}`);
        if (!response.ok) throw new Error("Failed to fetch game");

        const game = await response.json();
        console.log("Selected game:", game); // Debugging

        document.querySelector("#gameId").value = game.id;
        document.querySelector("#gameTitle").value = game.title;
        document.querySelector("#gameYear").value = game.year;
        document.querySelector("#gamePrice").value = game.price;
        document.querySelector("#gameCategory").value = game.category;
    } catch (error) {
        console.error("❌ Error loading game:", error);
    }
});

// ✅ Update Game
async function updateGame(e) {
    e.preventDefault();

    const gameId = document.querySelector("#gameId").value;
    if (!gameId) return alert("❌ Please select a game first!");

    const updatedGame = {
        title: document.querySelector("#gameTitle").value,
        year: parseInt(document.querySelector("#gameYear").value),
        price: parseFloat(document.querySelector("#gamePrice").value),
        category: document.querySelector("#gameCategory").value,
    };

    try {
        const response = await fetch(`http://localhost:5500/games/${gameId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGame),
        });

        if (!response.ok) throw new Error("Failed to update game");

        alert("✅ Game updated successfully!");
        loadGames(); // Refresh game list
    } catch (error) {
        console.error("❌ Error updating game:", error);
        alert("❌ Failed to update game.");
    }
}

// ✅ Delete Game
async function deleteGame(e) {
    e.preventDefault();

    const gameId = document.querySelector("#gameId").value;
    if (!gameId) return alert("❌ Please select a game first!");

    if (!confirm("Are you sure you want to delete this game?")) return;

    try {
        const response = await fetch(`http://localhost:5500/games/${gameId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete game");

        alert("✅ Game deleted successfully!");
        updateForm.reset(); // Clear form
        loadGames(); // Refresh game list
    } catch (error) {
        console.error("❌ Error deleting game:", error);
        alert("❌ Failed to delete game.");
    }
}

// ✅ Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadGames();
    document.querySelector("#updateGame").addEventListener("click", updateGame);
    document.querySelector("#DeleteGame").addEventListener("click", deleteGame);
});
