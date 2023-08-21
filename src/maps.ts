import { buffer } from 'stream/consumers';
import { Request, Response, MapOptions, RenderOptions, Coordinates } from './types';
import puppeteer from 'puppeteer';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');
const browser = puppeteer.launch({ headless: 'new' });

export async function getMapImage(mapOptions: MapOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
        // Set up browser window and page
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 720});

         // Load the HTML content from the external file
         let htmlFileContent = fs.readFileSync(path.join(__dirname, 'puppeteer-templates', 'map.html'), 'utf8');
         const htmlContent = htmlFileContent
            .replace('longitude', mapOptions.center.long.toString())
            .replace('latitude', mapOptions.center.lat.toString())
            .replace('your_zoom', mapOptions.zoom.toString())
            .replace('your_bearing', mapOptions.bearing.toString())
            .replace('your_pitch', mapOptions.pitch.toString())
            .replace('your_width', mapOptions.width.toString())
            .replace('your_height', mapOptions.height.toString())
            .replace('YOUR_MAPBOX_ACCESS_TOKEN', process.env.MAPBOX_PUBLIC_ACCESS_TOKEN || '');

        // Open mapbox page
        await page.setContent(htmlContent);

        // Wait for the map to load
        await page.waitForTimeout(5000);

        const screenshotBuffer = await page.screenshot({ type: 'png'});

        //await browser.close();

        resolve(screenshotBuffer);
    });
}
