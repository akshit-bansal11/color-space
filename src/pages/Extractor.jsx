//--------------------|    DEPENDENCIES    |--------------------//
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


//--------------------|        HOOKS       |--------------------//
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";


//--------------------|        ICONS        |--------------------//
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { PiUploadSimpleThin } from "react-icons/pi";


//--------------------|    MAIN RENDER     |--------------------//
export default function ImageColorExtractor() {
    const [image, setImage] = useState(null);
    const [palettes, setPalettes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, copy] = useCopyToClipboard();
    const [copiedColor, setCopiedColor] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                extractColors(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const extractColors = async (base64ImageData) => {
        setIsLoading(true);
        setError(null);
        setPalettes(null);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            setError("API key is missing.");
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [
                    { text: "Extract exactly 10 unique HEX colors (#RRGGBB) from the image, ordered by dominance. Return JSON only." },
                    { inlineData: { mimeType: "image/jpeg", data: base64ImageData.split(',')[1] } }
                ]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "10-color": { "type": "ARRAY", "items": { "type": "STRING" } },
                    }
                }
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const jsonText = result.candidates[0].content.parts[0].text;
            setPalettes(JSON.parse(jsonText));

        } catch (err) {
            setError("Could not extract colors. Please try another image.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (color) => {
        copy(color);
        setCopiedColor(color);
    };

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center">
                <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <PiUploadSimpleThin size={50} />
                    <span className="font-semibold">Click to upload an image</span>
                    <span className="text-sm">or drag and drop</span>
                </label>
            </div>

            {image && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
                    <img src={image} alt="Uploaded preview" className="rounded-xl shadow-lg" />
                </motion.div>
            )}

            {isLoading &&
                <div
                    className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                ></div>
            }
            {error && <div className="text-red-500">{error}</div>}

            {palettes && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col gap-6">
                    {Object.entries(palettes).map(([name, colors]) => (
                        <div key={name}>
                            <div className="flex flex-wrap justify-center gap-2">
                                {colors.map((color, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        className="relative group"
                                        onClick={() => handleCopy(color)}
                                    >
                                        <div
                                            className="w-20 h-20 rounded-lg cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <AnimatePresence>
                                                    {copied && copiedColor === color ? (
                                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                            <FaCheck size={24} className="text-green-400" />
                                                        </motion.div>
                                                    ) : (
                                                        <FaRegCopy size={24} />
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <span className="text-xs text-neutral-400 font-mono mt-1 block text-center">{color}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}