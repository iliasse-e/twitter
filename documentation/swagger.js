const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Twitter API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Chemins vers tes fichiers de routes/controllers
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };