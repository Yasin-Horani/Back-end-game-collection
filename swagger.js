const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game API",
      version: "1.0.0",
      description: "API documentation for managing games",
    },
    servers: [
      {
        url: "http://localhost:5500",
        description: "Local server",
      },
    ],
  },
  apis: ["./backend/routes/gameRoutes.js"], // Path to API routes
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
