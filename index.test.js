const {
    calculateRoverPosition
} = require("./index");

describe("calculateRoverPosition testing suite", () => {
    test("task sheet rover 1", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [1, 2];
        const roverOrientationStart = "N";
        const roverMovement = "LMLMLMLMM";
        const roverCoordinatesEnd = [1, 3];
        const roverOrientationEnd = "N";
        expect(calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toStrictEqual([roverCoordinatesEnd,
                roverOrientationEnd]);
    })
    test("task sheet rover 2", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [3, 3];
        const roverOrientationStart = "E";
        const roverMovement = "MMRMMRMRRM";
        const roverCoordinatesEnd = [5, 1];
        const roverOrientationEnd = "E";
        expect(calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toStrictEqual([roverCoordinatesEnd,
                roverOrientationEnd]);
    })
    test("task sheet rover 1 and 2 - no collision", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [3, 3];
        const roverOrientationStart = "E";
        const roverMovement = "MMRMMRMRRM";
        const roverCoordinatesEnd = [5, 1];
        const roverOrientationEnd = "E";
        // assume that rover 1 finishes before rover 2 starts
        const previousRoverPositions = [[[1, 3], "N"]]
        expect(calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement,
            previousRoverPositions)).toStrictEqual([roverCoordinatesEnd,
                roverOrientationEnd]);
    })
    test("collision when placing rover 2", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [3, 3];
        const roverOrientationStart = "E";
        const roverMovement = "MMRMMRMRRM";
        const roverCoordinatesEnd = [5, 1];
        const roverOrientationEnd = "E";
        const previousRoverPositions = [
            [[3, 3], "N"]
        ];
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement,
            previousRoverPositions))
            .toThrow("Another rover is already at this position");
    })
    test("collision when placing rover 5", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [2, 2];
        const roverOrientationStart = "E";
        const roverMovement = "MMRMMRMRRM";
        const roverCoordinatesEnd = [5, 1];
        const roverOrientationEnd = "E";
        const previousRoverPositions = [
            [[1, 1], "N"],
            [[0, 0], "W"],
            [[2, 2], "N"],
            [[3, 3], "N"],
        ];
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement,
            previousRoverPositions))
            .toThrow("Another rover is already at this position");
    })
    test("initial placement out of bounds on X", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [6, 3];
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart))
            .toThrow("Initial placement on X axis not allowed");
    })
    test("initial placement out of bounds on Y", () => {
        const plateauUpperRightCoordinates = [5, 5];
        const roverCoordinatesStart = [3, -1];
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart))
            .toThrow("Initial placement on Y axis not allowed");
    })
    test("out of bounds (negative) on X", () => {
        const plateauUpperRightCoordinates = [1, 1];
        const roverCoordinatesStart = [0, 0];
        const roverOrientationStart = "W";
        const roverMovement = "MMMMMMM";
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toThrow("Movement on X axis at index 0 not allowed");
    })
    test("out of bounds on Y", () => {
        const plateauUpperRightCoordinates = [1, 1];
        const roverCoordinatesStart = [0, 0];
        const roverOrientationStart = "N";
        const roverMovement = "LLLLMMMMMMM";
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toThrow("Movement on Y axis at index 5 not allowed");
    })
    test("out of bounds (negative) on Y", () => {
        const plateauUpperRightCoordinates = [1, 1];
        const roverCoordinatesStart = [0, 0];
        const roverOrientationStart = "S";
        const roverMovement = "M";
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toThrow("Movement on Y axis at index 0 not allowed");
    })
    test("unrecognised movement command", () => {
        const plateauUpperRightCoordinates = [1, 1];
        const roverCoordinatesStart = [0, 0];
        const roverOrientationStart = "S";
        const roverMovement = "RLRLRLP";
        expect(() => calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement))
            .toThrow("Unrecognised movement command at index 6");
    })
    test("no movement", () => {
        const plateauUpperRightCoordinates = [1, 1];
        const roverCoordinatesStart = [1, 0];
        const roverOrientationStart = "S";
        const roverMovement = "";
        const roverCoordinatesEnd = [1, 0];
        const roverOrientationEnd = "S";
        expect(calculateRoverPosition(
            plateauUpperRightCoordinates,
            roverCoordinatesStart,
            roverOrientationStart,
            roverMovement)).toStrictEqual([roverCoordinatesEnd,
                roverOrientationEnd]);
    })
})
