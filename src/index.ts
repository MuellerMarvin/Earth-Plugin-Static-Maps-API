import { Coordinates, MapOptions } from './types';
import { getMapImage } from './maps';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set up Express
const isTestEnvironment = process.env.NODE_ENV === 'test';
const port = isTestEnvironment ? 0 : (process.env.PORT || 3000);
export const app = express();

app.get('/', (req, res) => {
    let mapOptions: MapOptions = {
        center: req.body.center? || { lat: 52.517284915231926, long: 13.376082860012847 },
        zoom: req.body.zoom || 16,
        width: req.body.width || 1280,
        height: req.body.height || 720,
        bearing: req.body.bearing || 50,
        pitch: req.body.pitch || 40
    };

    getMapImage(mapOptions).then((imageBuffer: any) => {
        res.setHeader('Content-Type', 'image/png');
        res.send(imageBuffer);
    });
});


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
