const express = require('express');
const cors = require('cors');
const gameRoutes = require('./backend/routes/gameRoutes');

const app = express();

// Increase request size limit to 10MB
app.use(express.json({ limit: "10mb" }));  
app.use(express.urlencoded({ extended: true, limit: "10mb" }));  

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use('/games', gameRoutes);

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
