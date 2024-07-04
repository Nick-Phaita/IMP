const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes'); // Import the index.js file

const sequelize = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Use the routes defined in the index.js file
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
