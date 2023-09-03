module.exports = {
    roundDecimal: (value, places = 2) => {
        const places10 = Math.pow(10, places);
        // Used to correctly round edge cases like '1.005'
        const offset = 0.1 / places10;

        return Math.round(value * places10 + offset) / places10;

    }
}