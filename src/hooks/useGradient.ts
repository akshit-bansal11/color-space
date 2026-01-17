import { useState } from "react";
import { isDuplicate } from "../utils/colorUtils";

export const useGradient = () => {
    const [gradients, setGradients] = useState<string[]>([]);

    const addGradient = (g: string) => {
        if (!isDuplicate(gradients, g)) {
            setGradients((prev) => [...prev, g]);
        }
    };

    const removeGradient = (g: string) =>
        setGradients((prev) => prev.filter((x) => x !== g));

    return { gradients, addGradient, removeGradient };
};
