// Color validation functions
export const isValidColor = (value: string): boolean => {
    // Very permissive, accepts hex, rgb, rgba, hsl, hsla
    return /^#([0-9a-f]{3,8})$/i.test(value) ||
        /^rgba?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value) ||
        /^hsla?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value);
};

export const isHexColor = (v: string): boolean => /^#([0-9a-f]{3}){1,2}$/i.test(v);

export const isCssAngle = (v: string): boolean => /^-?\d+(\.\d+)?deg$/i.test(v);

// Gradient utilities
export const createGradient = (c1: string, c2: string): string => `linear-gradient(135deg, ${c1}, ${c2})`;

export const isDuplicate = <T,>(list: T[], item: T): boolean => list.includes(item);

// Tailwind to CSS direction mapping
export const twToCss: Record<string, string> = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
};

export const cssToTw: Record<string, string> = Object.fromEntries(Object.entries(twToCss).map(([k, v]) => [v, k]));
