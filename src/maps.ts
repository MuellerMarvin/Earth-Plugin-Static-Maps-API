import { buffer } from 'stream/consumers';
import { Request, Response, MapOptions, RenderOptions, Coordinates } from './types';
const fs = require('fs');
const path = require('path');
const mbgl = require('@maplibre/maplibre-gl-native');
const sharp = require('sharp');
const axios = require('axios');

export function getMapImage(coordinates: Coordinates): Promise<Buffer> {
    let options = {
        request: function(req: any, callback: (error: any, response: any) => void) {
        // Log the request URL
        console.log('Request URL:', req.url);
    
        axios.get(req.url, { responseType: 'arraybuffer' })
            .then(function(response: any) {
            // Forward the response to the maplibre-gl-native
            callback(null, { data: new Uint8Array(response.data) });
            })
            .catch(function(error: any) {
            // Handle errors
            callback("Error on: "+ req.url + "\n" + error, null);
            });
        },
        ratio: 1
    };

    let map = new mbgl.Map(options);

    map.load(require('./styles/style.json'));

    const renderOptions: RenderOptions = {
        zoom: 4,
        width: 1000,
        height: 1000,
        center: [coordinates.lon, coordinates.lat],
        bearing: 0,
        pitch: 0,
        classes: []
    };    

    // Return a promise that resolves to a Buffer
    return new Promise((resolve, reject) => {
        map.render(renderOptions, function(err: any, buffer: Buffer) {
            if (err) {
                reject(err);  // if there's an error, reject the Promise
                return;
            }

            map.release();

            let image = sharp(buffer, {
                raw: {
                    width: renderOptions.width,
                    height: renderOptions.height,
                    channels: 4
                }
            });

            image.toBuffer((err: Error, buffer: Buffer, info: any) => {
                if (err) {
                    reject(err);  // if there's an error, reject the Promise
                } else {
                    resolve(buffer);  // if everything is ok, resolve the Promise with the Buffer
                }
            });
        });
    });
}