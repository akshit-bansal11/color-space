//--------------------| DEPENDENCIES |--------------------//
import { useMemo } from 'react';

const shuffleArray = (array) => {
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const useShuffle = (array) => {
    // useMemo ensures the array is only shuffled when the input array changes.
    const shuffledArray = useMemo(() => shuffleArray(array), [array]);
    return shuffledArray;
};