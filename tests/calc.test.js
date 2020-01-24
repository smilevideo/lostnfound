import calc from "../components/calc";

let targetBPM = 400;
let songBPM = 150;

//Nearest mode:
test('finds nearest multiplied bpm correctly', () => {
    expect(calc(targetBPM, songBPM)).toEqual(2.75);
});

//Upper Limit mode:
test('finds greatest multiplied bpm less than limit correctly', () => {
    expect(calc(targetBPM, songBPM)).toEqual(2.5);
});

//Lower Limit mode:
test('finds smallest multiplied bpm greater than limit correctly', () => {
    expect(calc(targetBPM, songBPM)).toEqual(2.75);
});