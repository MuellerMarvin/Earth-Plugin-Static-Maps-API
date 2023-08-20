import { buffer } from 'stream/consumers';
import { Request, Response, MapOptions, RenderOptions, Coordinates } from './types';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');

export function getMapImage(coordinates: Coordinates): Promise<any> {
    return new Promise((resolve, reject) => {
        resolve("Hello API world!");
    });
}