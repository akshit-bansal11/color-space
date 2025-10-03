import React, { useState } from 'react';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialDialogue() {
    localStorage.removeItem('geminiApiKey');

    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState(''); // State to hold the validation error message

    const handleClose = () => setIsVisible(false);

    // Handles form submission with validation
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiKey = e.target.elements['api-key'].value;

        // 1. Validate the input
        if (!apiKey.trim()) {
            setError('API Key cannot be empty. Please paste your key.');
            return; // Stop the submission if validation fails
        }

        // 2. If validation passes, save the key and close the modal
        localStorage.setItem('geminiApiKey', apiKey);
        handleClose();
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={handleClose}
                >
                    <motion.div
                        className="relative m-4 flex w-full max-w-md flex-col gap-4 rounded-xl border border-white/20 bg-neutral-900/80 p-6 shadow-xl"
                        variants={modalVariants}
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-white"
                            aria-label="Close dialogue"
                        >
                            <FaTimes size={18} />
                        </button>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-100">Gemini API Key Required</h3>
                            <p className="mt-1 text-sm text-gray-400">
                                To use all features, please provide your API key. For now it will be stored in your browser's local storage as Color Space is still in the improvement phase but will be changed to a more secure method in the future.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    id="api-key"
                                    name="api-key"
                                    className={`w-full rounded-md border bg-neutral-800 px-3 py-2 text-gray-100 focus:outline-none ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-neutral-500'
                                        }`}
                                    placeholder="Paste your API Key here"
                                    autoComplete="off"
                                    // 3. Clear error when user starts typing
                                    onChange={() => {
                                        if (error) setError('');
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 rounded-md bg-neutral-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-400"
                                >
                                    Save & Close
                                </button>
                            </div>
                            {/* 4. Conditionally render the error message */}
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                        </form>

                        <a
                            href="https://github.com/akshit-bansal11/color-space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-400"
                        >
                            Using Locally? See Docs <FaExternalLinkAlt size={12} />
                        </a>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}