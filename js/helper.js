export function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

// Random number between 2 number
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random number from 1 to a number
export function randomTo(num) {
    return randomBetween(1, num);
}
