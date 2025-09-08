import { useState } from "react";
import { isDuplicate } from "../utils/colorUtils";

export const useGradient = () => {
    const [gradients, setGradients] = useState([]);

    const addGradient = (g) => {
        if (!isDuplicate(gradients, g)) {
            setGradients((prev) => [...prev, g]);
        }
    };

    const removeGradient = (g) =>
        setGradients((prev) => prev.filter((x) => x !== g));

    return { gradients, addGradient, removeGradient };
};