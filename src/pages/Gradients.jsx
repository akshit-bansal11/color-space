//--------------------|    DEPENDENCIES    |--------------------//
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard.js";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";


//--------------------|        DATA        |--------------------//
import { gradients } from "../data/gradients.js"


//--------------------|     COMPONENTS     |--------------------//
function GradientCard({ name, feel, tailwind, css }) {
    const [copied, copy] = useCopyToClipboard();
    const [copiedKey, setCopiedKey] = useState(null); // tracks which text was copied
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleCopy = (text) => {
        copy(text);
        setCopiedKey(text);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopiedKey(null), 1500);
    };

    const entry = { opacity: 0, scale: 0.9, y: 6 };
    const center = { opacity: 1, scale: 1, y: 0 };
    const exit = { opacity: 0, scale: 0.9, y: 6 };

    const cardVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        hover: {},
    };

    const infoVariants = {
        initial: { y: "100%" },
        animate: { y: "100%" },
        hover: { y: 0 },
    };

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ type: "tween", stiffness: 260, damping: 20 }}
            className="relative w-full flex flex-col rounded-2xl overflow-hidden shadow-lg bg-neutral-800/50 border border-neutral-700/80 group"
        >
            {/* Gradient Preview */}
            <div
                className={`h-38 w-full ${tailwind ? `bg-gradient-to-r ${tailwind}` : ""}`}
                style={!tailwind ? { background: css } : {}}
            ></div>

            {/* Info Section */}
            <motion.div
                variants={infoVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-full h-full backdrop-brightness-50 backdrop-grayscale p-4 flex flex-col justify-between"
            >
                <h3 className="lg:text-xl font-extrabold font-chillax text-white">{name}</h3>

                <div className="flex gap-2">
                    <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                        {feel}
                    </span>
                </div>

                {/* Copy Buttons */}
                <div className="mt-2 flex gap-2">
                    {tailwind && (
                        <button
                            onClick={() => handleCopy(tailwind)}
                            className="flex-1 flex items-center justify-center gap-2 bg-neutral-600/30 hover:bg-neutral-600/70 border border-neutral-600/0 hover:border-neutral-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 relative overflow-hidden"
                            aria-pressed={copiedKey === tailwind}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {copiedKey === tailwind ? (
                                    <motion.span
                                        key="copied-tw"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <FaCheck size={16} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy-tw"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2"
                                    >
                                        <FaRegCopy size={16} /> Tailwind
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    )}

                    {css && (
                        <button
                            onClick={() => handleCopy(css)}
                            className="flex-1 flex items-center justify-center gap-2 bg-neutral-600/30 hover:bg-neutral-600/70 border border-neutral-600/0 hover:border-neutral-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 relative overflow-hidden"
                            aria-pressed={copiedKey === css}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {copiedKey === css ? (
                                    <motion.span
                                        key="copied-css"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2 text-green-400"
                                    >
                                        <FaCheck size={16} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy-css"
                                        initial={entry}
                                        animate={center}
                                        exit={exit}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-center gap-2"
                                    >
                                        <FaRegCopy size={16} /> CSS
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}


//--------------------|    MAIN RENDER     |--------------------//
export default function GradientsBrowser() {
    const [searchTerm, setSearchTerm] = useState("");
    const [feelFilter, setFeelFilter] = useState("All");

    const feels = ["All", ...new Set(gradients.map(g => g.feel))];

    const filteredGradients = gradients.filter(g => {
        const nameMatch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
        const feelMatch = feelFilter === 'All' || g.feel === feelFilter;
        return nameMatch && feelMatch;
    });

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400 text-sm">Feel:</span>
                    <div className="flex gap-2 flex-wrap">
                        {feels.map(feel => (
                            <button key={feel} onClick={() => setFeelFilter(feel)} className={`px-3 py-1 text-sm rounded-full transition-colors ${feelFilter === feel ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}>{feel}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredGradients.map((gradient, index) => (
                        <GradientCard key={`${gradient.name}-${index}`} {...gradient} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}