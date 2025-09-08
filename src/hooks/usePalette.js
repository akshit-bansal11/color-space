import { useState } from "react";
import { isDuplicate } from "../utils/colorUtils";

export const usePalette = (max = 10) => {
    const [palette, setPalette] = useState([]);

    const addColor = (c) => {
        if (palette.length < max && !isDuplicate(palette, c)) {
            setPalette((prev) => [...prev, c]);
        }
    };

    const removeColor = (c) => setPalette((prev) => prev.filter((x) => x !== c));

    return { palette, addColor, removeColor };
};