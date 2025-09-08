// Color validation functions
export const isValidColor = (value) => {
    // Very permissive, accepts hex, rgb, rgba, hsl, hsla
    return /^#([0-9a-f]{3,8})$/i.test(value) ||
        /^rgba?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value) ||
        /^hsla?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value);
};

export const isHexColor = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);

export const isCssAngle = (v) => /^-?\d+(\.\d+)?deg$/i.test(v);

// Gradient utilities
export const createGradient = (c1, c2) => `linear-gradient(135deg, ${c1}, ${c2})`;

export const isDuplicate = (list, item) => list.includes(item);

// Tailwind to CSS direction mapping
export const twToCss = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
};

export const cssToTw = Object.fromEntries(Object.entries(twToCss).map(([k, v]) => [v, k]));