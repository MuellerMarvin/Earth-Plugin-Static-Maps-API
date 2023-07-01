import { Request, Response, MapOptions, RenderOptions, Coordinates } from './types';
var fs = require('fs');
var path = require('path');
var mbgl = require('@maplibre/maplibre-gl-native');
var sharp = require('sharp');
var axios = require('axios');

var options = {
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

var map = new mbgl.Map(options);

map.load(require('./styles/style.json'));

let coordinates: Coordinates = {
    lat: 52.5200,
    lon: 13.4050
};

const renderOptions: RenderOptions = {
    zoom: 4,
    width: 512,
    height: 512,
    center: [coordinates.lon, coordinates.lat],
    bearing: 0,
    pitch: 0,
    classes: []
};
  

map.render(renderOptions, function(err: any, buffer: any) {
    if (err) throw err;

    map.release();

    var image = sharp(buffer, {
        raw: {
            width: renderOptions.width,
            height: renderOptions.height,
            channels: 4
        }
    });

    // create folder if it doesn't exist
    var dir = './output';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // Convert raw image buffer to PNG
    image.toFile(dir +  '/image.png', function(err: any) {
        if (err) throw err;
    });
});
