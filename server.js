require('module-alias/register');

const express = require('express');

const app = express();

const config = require('@config/dotenv');

const { HOST: host, PORT: port } = config;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => 
  res.send('NodeJS Works')
);

const { sequelize } = require('@config/db');

sequelize.sync().then(() =>
  console.log('Drop and Resync with { force: true }')
);

const documentRoutes = require('@routes/document.routes');

app.use('/api/documents', documentRoutes);

const server = app.listen(port, host, () => 
  console.log(`Server is listening on port ${port}`)
);

module.exports = { app, server };