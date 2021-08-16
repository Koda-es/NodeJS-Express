require('module-alias/register');

const express = require('express');

const config = require('@config/dotenv');

const { sequelize } = require('@config/db');

const Associations = require('@models/associations');

const handleErrors = require('@middlewares/handleErrors.js');

const addressRoutes = require('@routes/document.routes');
const categoryRoutes = require('@routes/document.routes');
const documentRoutes = require('@routes/document.routes');
const userRoutes = require('@routes/document.routes');


const { HOST: host, PORT: port } = config;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => 
  res.send('NodeJS Works')
);

app.use('/api/addresses', addressRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

app.use(handleErrors);

sequelize.sync();

const server = app.listen(port, host, () => 
  console.log(`Server is listening on port ${port}`)
);

module.exports = { app, server };