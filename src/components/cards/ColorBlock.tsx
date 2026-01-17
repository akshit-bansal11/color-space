"use client";

import React from "react";
import { motion, VariantLabels, TargetAndTransition } from "framer-motion";
import CopyButton from "../buttons/CopyButton";

interface ColorBlockProps {
  color: string;
  className?: string;
  iconSize?: string;
  hover?: VariantLabels | TargetAndTransition;
}

export default function ColorBlock({
  color,
  className = "",
  iconSize,
  hover,
}: ColorBlockProps) {
  return (
    <motion.div
      whileHover={hover}
      className={`relative aspect-square overflow-hidden cursor-pointer group 
                ${className}
            `}
      style={{ backgroundColor: color }}
    >
      <CopyButton text={color} iconSize={iconSize} isHover />
    </motion.div>
  );
}
