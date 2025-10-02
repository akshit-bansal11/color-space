//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { motion } from "framer-motion";


//--------------------|        DATA        |--------------------//
import { palettes } from "../data/palettes.js"


//--------------------|     COMPONENT/S    |--------------------//
import ColorBlock from "../shared/cards/ColorBlock.jsx"

function ColorPalette({ colors, name }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="w-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80"
        >
            <div className="flex h-32">
                {colors.map((color, index) => (
                    <ColorBlock className={"w-full h-full"} color={color} iconSize={"text-3xl"} />
                ))}
            </div>
            <div className="p-3 flex flex-col items-center gap-2 bg-neutral-800">
                <div className="flex gap-2 items-center mb-4 mt-4">
                    {name && <p className="flex gap-10 text-sm font-semibold text-neutral-200">{name}</p>}
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
                    {colors.map((color, index) => (
                        <span key={index} className="text-xs font-mono text-neutral-400">{color}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


//--------------------|    MAIN RENDER     |--------------------//
export default function CuratedPalettes() {

    // By SYNTX: Fisher-Yates shuffle algorithm implementation
    // Randomizes palette order within each category while preserving category sequence
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const groupedPalettes = palettes.reduce((acc, palette) => {
        const { category } = palette;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(palette);
        return acc;
    }, {});

    const categoryOrder = ["6-color", "5-color", "4-color", "3-color", "2-color", "Popular Brands"];
    const sortedCategories = categoryOrder.filter(cat => groupedPalettes[cat]);

    return (
        <div className="w-full flex flex-col gap-12">
            {sortedCategories.map(category => (
                <section key={category} className="flex flex-col gap-6">

                    <h2 className="text-2xl font-bold text-neutral-200 capitalize border-b border-neutral-700 pb-2">
                        {category === "Popular Brands" ? category : `${category} Palettes`}
                    </h2>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* By SYNTX: Shuffle palettes within current category for random display order */}
                        {shuffleArray(groupedPalettes[category]).map((palette, index) => (
                            <ColorPalette key={index} {...palette} />
                        ))}
                    </div>

                </section>
            ))}
        </div>
    );
}