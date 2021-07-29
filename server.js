const express = require('express');

const app = express();

const documentRoutes = require('./src/routes/document.routes');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => 
  res.send('NodeJS Works')
);

app.use('/api/documents', documentRoutes);

app.listen(port, () => 
  console.log(`Server is listening on port ${port}`)
);