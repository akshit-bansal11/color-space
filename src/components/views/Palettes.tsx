"use client";

import React from "react";
import { motion } from "framer-motion";
import { palettes, Palette } from "../../data/palettes";
import ColorBlock from "../cards/ColorBlock";
import { useShuffle } from "../../hooks/useShuffle";

interface ColorPaletteProps {
  colors: string[];
  name: string;
}

function ColorPalette({ colors, name }: ColorPaletteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="w-full flex flex-col rounded-xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80"
    >
      <div className="flex h-32">
        {colors.map((color, index) => (
          <ColorBlock
            className={"w-full h-full"}
            color={color}
            key={index}
            iconSize={"text-3xl"}
          />
        ))}
      </div>
      <div className="p-3 flex flex-col items-center gap-2 bg-neutral-800">
        <div className="flex gap-2 items-center mb-4 mt-4">
          {name && (
            <p className="flex gap-10 text-sm font-semibold text-neutral-200">
              {name}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center">
          {colors.map((color, index) => (
            <span key={index} className="text-xs font-mono text-neutral-400">
              {color}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CuratedPalettes() {
  // We use the useShuffle hook instead of internal logic if possible,
  // but the legacy code had a custom shuffle inside render for some reason?
  // Actually legacy code defined shuffleArray inside component.
  // Use the hook if it produces stable shuffle (memoized).
  // Legacy: shuffleArray inside render -> might reshuffle on re-render if not careful,
  // but React might not re-render unless props change.
  // However, better to use useShuffle if we want it memoized on input array change.

  // Wait, useShuffle takes an array.
  // We want to shuffle each category's array.
  // We can use a helper or just use the logic.
  // Since useShuffle is a hook, we can't call it inside a loop callback (map).
  // So we invoke it at top level? No, map is dynamic.
  // We should shuffle the groups once (memoized).
  // Let's keep the inline shuffle function but make it not a hook, just helper,
  // OR we can't ensure stable shuffle without useMemo.
  // The legacy code defined it inside render, so it re-ran on every render!
  // We can improve it. But sticking to legacy behavior is safer for "exact behavior" but maybe unintended re-shuffles?
  // Actually, legacy: const shuffleArray = ...; inside component.
  // That suggests it reshuffles on re-render.
  // I'll keep it as a helper function.

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const groupedPalettes = palettes.reduce<Record<string, Palette[]>>(
    (acc, palette) => {
      const { category } = palette;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(palette);
      return acc;
    },
    {},
  );

  const categoryOrder = [
    "6-color",
    "5-color",
    "4-color",
    "3-color",
    "2-color",
    "Popular Brands",
  ];
  const sortedCategories = categoryOrder.filter((cat) => groupedPalettes[cat]);

  return (
    <div className="w-full flex flex-col gap-12">
      {sortedCategories.map((category) => (
        <section key={category} className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-200 capitalize border-b border-neutral-700 pb-2">
            {category === "Popular Brands" ? category : `${category} Palettes`}
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We use the simple shuffle here matching legacy */}
            {shuffleArray(groupedPalettes[category]).map((palette, index) => (
              <ColorPalette
                key={index}
                colors={palette.colors}
                name={palette.name}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
