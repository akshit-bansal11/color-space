//--------------------|    DEPENDENCIES    |--------------------//
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


//--------------------|       ICONS        |--------------------//
import { FaDroplet, FaLayerGroup, FaArrowsRotate } from 'react-icons/fa6'
import { IoColorPalette } from "react-icons/io5";
import { HiMiniSwatch } from "react-icons/hi2";
import { MdOutlineImageSearch } from "react-icons/md";


//--------------------|     COMPONENT/S     |--------------------//
import Creator from "./pages/Creator";
import ColorBlocksBrowser from "./pages/Blocks";
import CuratedPalettes from "./pages/Palettes";
import GradientsBrowser from "./pages/Gradients";
import ImageColorExtractor from "./pages/Extractor";
import Convertor from "./pages/Convertor";


//--------------------|     MAIN RENDER    |--------------------//
export default function Colors() {
    const [activeTab, setActiveTab] = useState("creator");

    const tabs = [
        { id: "creator", label: "Creator", icon: <FaDroplet className="text-xl" /> },
        { id: "blocks", label: "Blocks", icon: <IoColorPalette className="text-xl" /> },
        { id: "palettes", label: "Palettes", icon: <HiMiniSwatch className="text-xl" /> },
        { id: "gradients", label: "Gradients", icon: <FaLayerGroup className="text-xl" /> },
        { id: "extractor", label: "Extractor", icon: <MdOutlineImageSearch className="text-xl" /> },
        { id: "convertor", label: "Convertor", icon: <FaArrowsRotate className="text-xl" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "creator":
                return <Creator />;
            case "blocks":
                return <ColorBlocksBrowser />;
            case "palettes":
                return <CuratedPalettes />;
            case "gradients":
                return <GradientsBrowser />;
            case "extractor":
                return <ImageColorExtractor />;
            case "convertor":
                return <Convertor />;
            default:
                return null;
        }
    };

    return (
        <div className="text-white font-sans w-full min-h-screen p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-8 items-center">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-chillax font-extrabold tracking-tight">Akshit's Color Space</h1>
                    <p className="text-neutral-400 mt-2">Your universe for color exploration.</p>
                </motion.header>

                <div className="w-full flex justify-center">
                    <div className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700/80 rounded-full p-1.5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id ? "text-white" : "text-neutral-400 hover:text-white"} relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-neutral-700 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.icon}</span>
                                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <main className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
