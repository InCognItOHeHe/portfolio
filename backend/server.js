const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/computer_parts', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(bodyParser.json());

const partsRouter = require('./routes/parts');
app.use('/api/parts', partsRouter);

app.listen(5000, () => console.log('Server Started on Port 5000'));
