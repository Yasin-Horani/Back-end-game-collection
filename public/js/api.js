const addPostForm = document.querySelector("#addPostForm");
const gameImageInput = document.querySelector("#gameImage");
const preview = document.querySelector("#preview");

// Show image preview
gameImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            preview.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

async function addPost(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const title = document.querySelector("#gameTitle").value;
    const year = document.querySelector("#gameYear").value;
    const price = document.querySelector("#gamePrice").value;
    const category = document.querySelector("#gameCategory").value;
    const imgFile = gameImageInput.files[0];

    if (!title || !year || !price || !category || !imgFile) {
        alert("❌ Please fill in all fields!");
        return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = async function () {
        const imgData = reader.result; // Base64 image string

        // Create game object
        const newGame = {
            img: imgData,  // Store image as Base64 string
            title,
            year: parseInt(year),
            price: parseFloat(price),
            category
        };

        try {
            // Send POST request to backend
            const response = await fetch("http://localhost:5500/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGame),
            });

            if (!response.ok) {
                throw new Error("Failed to add game.");
            }

            const result = await response.json();
            alert("✅ Game added successfully!");

            // Redirect to home or game list page
            window.location.href = "index.html"; // Change as needed

        } catch (error) {
            console.error("❌ Error:", error);
            alert("❌ Failed to add game.");
        }
    };
}

// Attach event listener
addPostForm.addEventListener("submit", addPost);
