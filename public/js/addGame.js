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
    e.preventDefault();

    const title = document.querySelector("#gameTitle").value;
    const year = document.querySelector("#gameYear").value;
    const price = document.querySelector("#gamePrice").value;
    const category = document.querySelector("#gameCategory").value;
    const imgFile = document.querySelector("#gameImage").files[0];

    if (!title || !year || !price || !category || !imgFile) {
        alert("❌ Please fill in all fields!");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", parseInt(year));
    formData.append("price", parseFloat(price));
    formData.append("category", category);
    formData.append("image", imgFile);

    try {
        const response = await fetch("http://localhost:5500/games", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to add game.");
        }

        alert("✅ Game added successfully!");
        window.location.href = "index.html";

    } catch (error) {
        console.error("❌ Error:", error);
        alert("❌ Failed to add game.");
    }
}


// Attach event listener
addPostForm.addEventListener("submit", addPost);

