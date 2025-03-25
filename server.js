const express = require('express');
const gameRoutes = require('./backend/routes/gameRoutes');

const app = express();
app.use(express.json());
app.use('/games', gameRoutes);

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
