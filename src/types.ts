export interface Request {
    url: string;
    kind: string;
}

export interface Response {
    data: Buffer;
}

export interface MapOptions {
    center: Coordinates;
    zoom: number;
    width: number;
    height: number;
    bearing: number;
    pitch: number;
}

export interface RenderOptions {
    zoom: number;
    width: number;
    height: number;
    center: [number, number];
    bearing: number;
    pitch: number;
    classes: string[];
}

export interface Coordinates {
    lat: number;
    long: number;
}