"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShuffle } from "../../hooks/useShuffle";
import { colors } from "../../data/colors";
import ColorBlock from "../cards/ColorBlock";

export default function ColorBlocksBrowser() {
  // Use the custom hook to shuffle the colors array
  const shuffledColors = useShuffle(colors);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
                w-full grid lg:gap-4 md:gap-3 sm:gap-2 not-sm:gap-1
                grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12
            "
    >
      {shuffledColors.map((color, index) => (
        <ColorBlock
          hover={{ scale: 1.05, zIndex: 10 }}
          iconSize={`text-3xl`}
          className={`w-full rounded-xl`}
          key={index}
          color={color}
        />
      ))}
    </motion.div>
  );
}
