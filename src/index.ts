import { Coordinates, MapOptions } from './types';
import { getMapImage } from './maps';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up Express
const port = process.env.PORT || 3000;
export const app = express();

app.get('/', (req, res) => {
    getMapImage({
        center: { lat: 52.517284915231926, long: 13.376082860012847 },
        zoom: 16,
        width: 1280,
        height: 720,
        bearing: 50,
        pitch: 40
    }).then((imageBuffer: any) => {
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    });
});


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});