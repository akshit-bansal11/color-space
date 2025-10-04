//--------------------|    DEPENDENCIES    |--------------------//
import React from "react";
import { motion } from "framer-motion";


//--------------------|     COMPONENT/S     |--------------------//
import CopyButton from "../buttons/CopyButton";


//--------------------|    MAIN RENDER     |--------------------//
export default function ColorBlock({ color, className, iconSize, hover }) {

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