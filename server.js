const express = require('express');
const cors = require('cors');
const gameRoutes = require('./backend/routes/gameRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// Increase request size limit to 10MB
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use('/games', gameRoutes);

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
