import { Coordinates } from './types';
import { getMapImage } from './maps';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up Express
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    const image = getMapImage({ lat: 52.52, lon: 13.405 });
    res.sendFile('/output/image.png', { root: '.' });
});


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});