const SIZE_UNITS = ['ko', 'mo', 'go', 'to'];

const ONE_MPX = 1000 * 1000;

export function formatSize(bytes, thresh = 1024) {
    if (Math.abs(bytes) < thresh) {
        return bytes + ' octets';
    }

    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < SIZE_UNITS.length - 1);

    return bytes.toFixed(1) + ' ' + SIZE_UNITS[u];
}

export function formatMPx(width, height) {
    const mpx = width * height / ONE_MPX;

    return mpx.toFixed(1);
}
