//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";


//--------------------|    MAIN RENDER     |--------------------//
export default function CopyButton({ text, iconSize, isHover }) {

    const [copied, copy] = useCopyToClipboard();

    const handleCopy = () => {
        if (text) copy(text);
    };

    return (
        <button
            onClick={handleCopy}
            type="button"
            className={`absolute inset-0 bg-black/30 cursor-pointer flex items-center justify-center flex-col gap-2
                ${isHover
                    ? `opacity-0 group-hover:opacity-100 transition-opacity`
                    : `opacity-100`
                }
            `}
        >
            <AnimatePresence mode="popLayout">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <FaCheck className={`text-green-400 ${iconSize}`} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <FaRegCopy className={`${iconSize}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}