# Earth Plugin Static Maps API

This is a future service in the Earth Plugin architecture.

The static-API hosts a Mapbox-GL website inside a Chrome instance (using Google Puppeteer) and takes a screenshot of the website, to return to the request-initiator.
This allows for rendering routes as well as using 3D buildings, greatly enhancing what is possible compared with traditional static maps APIs.

Usual Static APIs offer GeoJSONs as overlays (Polygons, Multi-Polygons, Markers) for routing or other tasks.

However, their static APIs offer these only as part of the HTTP query, not the body. This limits the amount of data - and with that, the number of markers - possible to add to an image.

## Plans of deployment

In our own architecture, it will be deployed behind the main Earth-Plugin service, which handles requests from OpenAI.
This is because an exposed API has to be specifically adjusted to fit ChatGPT patterns.
