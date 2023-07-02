import { Coordinates } from './types';
import { getMapImage } from './maps';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up Express
const port = process.env.PORT || 3000;
export const app = express();

app.get('/', (req, res) => {
    getMapImage({ lat: 52.52, lon: 13.405 }).then((imageBuffer: Buffer) => {
        res.send(imageBuffer);
    });
});


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});