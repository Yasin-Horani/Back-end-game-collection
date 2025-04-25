<pre>
                                        _ _           _   _             
  __ _  __ _ _ __ ___   ___    ___ ___ | | | ___  ___| |_(_) ___  _ __  
 / _` |/ _` | '_ ` _ \ / _ \  / __/ _ \| | |/ _ \/ __| __| |/ _ \| '_ \ 
| (_| | (_| | | | | | |  __/ | (_| (_) | | |  __/ (__| |_| | (_) | | | |
 \__, |\__,_|_| |_| |_|\___|  \___\___/|_|_|\___|\___|\__|_|\___/|_| |_|
 |___/                                                                  


</pre>

🎮 Game Library

Welcome to Game Library – a modern, interactive web application where you can browse, search, sort, and add games to your collection. With a sleek UI and smooth animations, this project delivers an engaging user experience for game enthusiasts! 🚀

✨ Features

✅ Display Games – Browse a collection of popular games with images, titles, release years, and prices.
✅ Search Functionality – Quickly find games by title using the search bar.
✅ Sorting Options – Sort games by title, price, or release year.
✅ Add New Games – Upload images, enter game details, and expand your library.
✅ Responsive Design – Works seamlessly on desktops, tablets, and mobile devices.
✅ Modern UI – Clean and stylish design with a user-friendly interface.

🛠️ Installation & Setup

Clone the repository:

git clone https://github.com/Yasin-Horani/Back-end-game-collection.git

Open your vs code and Open with live server.

Enjoy browsing and managing your game collection! 🎮

📌 Usage

Search for a game by typing its title in the search bar.

Sort games using the dropdown menu (by title, price, or year).

🔥 Future Enhancements
Add a new game by filling out the form and uploading an image.

web application structure.
- │── backend/
- │   ├── controllers/
- │   │   ├── gameController.js
- │   ├── routes/
- │   │   ├── gameRoutes.js
- │── public/
- │   ├── css/
- │   │   ├── style.css
- │   ├── img/
- │   │   ├── street fighter GIF.gif
- │   ├── js/
- │   │   ├── script.js
- │   │   ├── api.js
- │   ├── json/
- │   │   ├── games.js
- │   ├── add.html
- │   ├── collections.html
- │   ├── dashboard.html
- │   ├── footer.html
- │   ├── head.html
- │   ├── index.html
- │   ├── nav.html
- │── server.js
- │── swagger.js

if you have trouble on post or put follow this steps in post man:
Make sure your request is correctly configured:
Method: POST
URL: http://localhost:5500/games/

Headers:

Content-Type: application/json

Body (raw, JSON format):

Click Body → Select raw

Choose JSON (not Text or another format)


- Swagger 
http://localhost:5500/api-docs
