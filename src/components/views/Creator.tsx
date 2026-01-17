"use client";

import React, { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaPlus, FaRegCopy, FaRegTrashCan } from "react-icons/fa6";

import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import ColorBlock from "../cards/ColorBlock";
import Input from "../form/Input";
import Label from "../form/Label";

import { createGradient } from "../../utils/colorUtils";
import { usePalette } from "../../hooks/usePalette";
import { useGradient } from "../../hooks/useGradient";

const useClipboard = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [copied, copy] = useCopyToClipboard();

  const handleCopy = (value: string) => {
    copy(value);
    setCopiedValue(value);
  };

  return { copied, copiedValue, handleCopy };
};

const isValidColor = (value: string) => {
  // Very permissive, accepts hex, rgb, rgba, hsl, hsla
  return (
    /^#([0-9a-f]{3,8})$/i.test(value) ||
    /^rgba?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value) ||
    /^hsla?\((\s*\d+\s*,){2,3}\s*(\d+(\.\d+)?%?)\)$/i.test(value)
  );
};

interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorPicker = ({ label, color, setColor }: ColorPickerProps) => {
  const [inputValue, setInputValue] = useState(color);
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInputValue(val);

    if (isValidColor(val)) {
      setColor(val);
      setError(false);
    } else {
      setError(true);
    }
  };

  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Label
        htmlFor={inputId}
        className="font-semibold text-neutral-300 !text-lg"
      >
        {label}
      </Label>
      <HexAlphaColorPicker
        color={color}
        onChange={(val) => {
          setColor(val);
          setInputValue(val);
        }}
        style={{ width: "100%", height: "220px" }}
      />
      <div className="flex items-center gap-3 w-full justify-between">
        <ColorBlock
          iconSize={`text-lg`}
          className={"w-10 rounded-sm"}
          color={color}
        />
        <Input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter HEX/RGBA/HSL"
          className={`w-full px-3 py-2 rounded-md text-sm text-white bg-neutral-800 border 
                    ${error ? "border-red-500" : "border-neutral-600"} 
                    focus:outline-none focus:ring-1 focus:ring-neutral-500`}
        />
      </div>
    </div>
  );
};

interface PaletteItemProps {
  c: string;
  copied: boolean;
  copiedValue: string | null;
  onCopy: (val: string) => void;
  onRemove: (val: string) => void;
}

const PaletteItem = ({
  c,
  copied,
  copiedValue,
  onCopy,
  onRemove,
}: PaletteItemProps) => (
  <motion.div
    key={c}
    layout
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    className="relative group"
  >
    <div
      className="w-12 h-12 rounded-lg cursor-pointer shadow-md"
      style={{ backgroundColor: c }}
      onClick={() => onCopy(c)}
    >
      <div className="w-full h-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
        <AnimatePresence>
          {copied && copiedValue === c ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCheck className="text-green-400" />
            </motion.div>
          ) : (
            <FaRegCopy className="text-white" />
          )}
        </AnimatePresence>
      </div>
    </div>
    <button
      onClick={() => onRemove(c)}
      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <FaRegTrashCan size={12} />
    </button>
  </motion.div>
);

interface GradientItemProps {
  g: string; // css gradient string
  copied: boolean;
  copiedValue: string | null;
  onCopy: (val: string) => void;
  onRemove: (val: string) => void;
}

const GradientItem = ({
  g,
  copied,
  copiedValue,
  onCopy,
  onRemove,
}: GradientItemProps) => (
  <motion.div
    key={g}
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="relative group w-40 h-16 rounded-lg shadow-md cursor-pointer flex items-center justify-center"
    style={{ background: g }}
    onClick={() => onCopy(g)}
  >
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
      {copied && copiedValue === g ? (
        <FaCheck className="text-green-400" />
      ) : (
        <FaRegCopy className="text-white" />
      )}
    </div>
    <button
      onClick={() => onRemove(g)}
      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <FaRegTrashCan size={12} />
    </button>
  </motion.div>
);

export default function Creator() {
  const [color, setColor] = useState("#3498dbff");
  const [secondColor, setSecondColor] = useState("#e74c3cff");

  const { palette, addColor, removeColor } = usePalette();
  const { gradients, addGradient, removeGradient } = useGradient();
  const { copied, copiedValue, handleCopy } = useClipboard();

  // Helper to check if string is in array (TS strictness handles duplicate checks naturally usually, but here we explicitly use includes)
  const isColorInPalette = (c: string) => palette.includes(c);
  const isGradientInList = (g: string) => gradients.includes(g);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full bg-neutral-800/60 border border-neutral-700/80 rounded-2xl lg:p-8 md:p-6 p-4 flex flex-col items-center gap-8 shadow-xl"
    >
      {/* Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <ColorPicker label="Primary Color" color={color} setColor={setColor} />
        <ColorPicker
          label="Secondary Color"
          color={secondColor}
          setColor={setSecondColor}
        />
      </div>

      {/* Actions */}
      <div className="w-full flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => addColor(color)}
          disabled={palette.length >= 10 || isColorInPalette(color)}
          className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          <FaPlus size={18} /> Add Primary
        </button>
        <button
          onClick={() => addColor(secondColor)}
          disabled={palette.length >= 10 || isColorInPalette(secondColor)}
          className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          <FaPlus size={18} /> Add Secondary
        </button>
        <button
          onClick={() => addGradient(createGradient(color, secondColor))}
          disabled={isGradientInList(createGradient(color, secondColor))}
          className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          <FaPlus size={18} /> Create Gradient
        </button>
      </div>

      {/* Palette Section */}
      {palette.length > 0 && (
        <div className="w-full flex flex-col gap-2 items-center">
          <h3 className="text-neutral-300 font-semibold">Current Palette</h3>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <AnimatePresence>
              {palette.map((c: string) => (
                <PaletteItem
                  key={c}
                  c={c}
                  copied={copied}
                  copiedValue={copiedValue}
                  onCopy={handleCopy}
                  onRemove={removeColor}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Gradient Section */}
      {gradients.length > 0 && (
        <div className="w-full flex flex-col gap-2 items-center">
          <h3 className="text-neutral-300 font-semibold">
            Generated Gradients
          </h3>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <AnimatePresence>
              {gradients.map((g: string) => (
                <GradientItem
                  key={g}
                  g={g}
                  copied={copied}
                  copiedValue={copiedValue}
                  onCopy={handleCopy}
                  onRemove={removeGradient}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
