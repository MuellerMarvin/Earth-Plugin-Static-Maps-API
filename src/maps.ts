import { buffer } from 'stream/consumers';
import { Request, Response, MapOptions, RenderOptions, Coordinates } from './types';
import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Launch the browser outside of the function
let browserInstance: Browser | null = null;

async function getBrowserInstance(): Promise<Browser> {
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({ headless: 'new' }); // 'headless' should be a boolean
    }
    return browserInstance;
}

export async function getMapImage(mapOptions: MapOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
        // Use the existing browser instance
        const browser = await getBrowserInstance();
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

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

        const screenshotBuffer = await page.screenshot({ type: 'png' });

        await page.close();

        resolve(screenshotBuffer);
    });
}
