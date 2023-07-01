# Earth Plugin Static API

This is a future service in the Earth Plugin architecture.

Usual Static APIs offer GeoJSONs as overlays (Polygons, Multi-Polygons, Markers) for routing or other tasks.

However, their static APIs offer these only as part of the HTTP query, not the body. This limits the amount of data - and with that, the number of markers - possible to add to an image.

This static API receives all data through the requests body, virtually giving the user unlimited possibilities.

## Plans of deployment

In our own architecture, it will be deployed behind the main Earth-Plugin service, which handles requests from OpenAI.
This is because an exposed API has to be specifically adjusted to fit ChatGPT patterns.
