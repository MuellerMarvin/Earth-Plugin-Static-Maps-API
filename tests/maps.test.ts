import { getMapImage } from "../src/maps";
import { Coordinates } from "../src/types";

describe("getMapImage", () => {
    it("should return a buffer", async () => {
        const coordinates: Coordinates = {
        lat: 13.405,
        lon: 52.52,
        };
        const buffer: Buffer = await getMapImage(coordinates);
        expect(buffer).toBeInstanceOf(Buffer);
    });
    it("should return a buffer with a length greater than 0", async () => {
        const coordinates: Coordinates = {
        lat: 0,
        lon: 0,
        };
        const buffer: Buffer = await getMapImage(coordinates);
        expect(buffer.length).toBeGreaterThan(0);
    });
});