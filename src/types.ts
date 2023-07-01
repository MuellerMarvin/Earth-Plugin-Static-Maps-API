export interface Request {
    url: string;
    kind: string;
}

export interface Response {
    data: Buffer;
}

export interface MapOptions {
    request: (req: Request, callback: (error?: any, response?: Response) => void) => void;
    ratio: number;
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
    lon: number;
}