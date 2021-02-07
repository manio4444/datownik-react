/**
 *
 * @param {number} start
 * @param {number} end
 * @returns {{hours: number, seconds: number, minutes: number, days: number}}
 */
export function getDiffTimestamps(start, end) {
    const diff = end - start;
    return (diff < 0) ? {
        'days': Math.ceil(diff / (1000 * 60 * 60 * 24)),
        'hours': Math.ceil((diff / (1000 * 60 * 60)) % 24),
        'minutes': Math.ceil((diff / 1000 / 60) % 60),
        'seconds': Math.ceil((diff / 1000) % 60),
    } : {
        'days': Math.floor(diff / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((diff / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((diff / 1000 / 60) % 60),
        'seconds': Math.floor((diff / 1000) % 60),
    };
};