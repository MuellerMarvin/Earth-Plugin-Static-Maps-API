import { getMapImage } from "../src/maps";

describe("getMapImage", () => {
    it("should return a buffer", async () => {
        const coordinates = {
        lat: 0,
        lon: 0,
        };
        const buffer = await getMapImage(coordinates);
        expect(buffer).toBeInstanceOf(Buffer);
    });
});