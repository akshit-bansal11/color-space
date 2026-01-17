"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaRegCopy, FaExternalLinkAlt } from "react-icons/fa";
import { PiUploadSimpleThin } from "react-icons/pi";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

interface PalettesResponse {
  colors: string[];
}

export default function ImageColorExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [palettes, setPalettes] = useState<PalettesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, copy] = useCopyToClipboard();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Uncomment to get API key from localStorage (for web version)
  // Note: LocalStorage access during render causes hydration mismatch.
  // We should access it in component logic or UseEffect, NOT in renders directly if it affects initial view significantly.
  // But here 'apiKey' is used to control view.
  // We will use a useEffect or lazy init?
  // Actually, let's just use it directly, but handle the "undefined window" case if SSR.
  // However, since this component is "use client", it runs on client, but hydration runs first.
  // For now, let's grab it.

  // Changing to state to avoid hydration issues:
  const [apiKey, setApiKey] = useState<string | null>(null);

  React.useEffect(() => {
    const key = localStorage.getItem("geminiApiKey");
    setApiKey(key);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setPalettes(null);
        setError(null);
        extractColors(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = async (base64ImageData: string) => {
    setIsLoading(true);
    setError(null);
    setPalettes(null);

    // Use local variable for key to ensure latest state (or ref), but state apiKey is fine if Effect ran.
    // But extracting might happen right after mount if hardcoded?
    // Wait, handleImageChange is user event, so useEffect has definitely run.
    const currentKey = localStorage.getItem("geminiApiKey") || apiKey;

    if (!currentKey) {
      setError(
        "No API Key found. Please reload to input it, or run locally with a .env file (VITE_GEMINI_API_KEY).",
      );
      setIsLoading(false);
      return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${currentKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: "Extract exactly 10 unique HEX colors (#RRGGBB) from the image, ordered by dominance. Return JSON only with a single key 'colors' containing an array of the hex strings.",
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageData.split(",")[1], // remove data:image/...;base64,
              },
            },
          ],
        },
      ],
      generationConfig: { responseMimeType: "application/json" },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        const errorMsg =
          errorBody?.error?.message ||
          `API request failed with status ${response.status}`;
        throw new Error(errorMsg);
      }

      const result = await response.json();

      if (!result.candidates || result.candidates.length === 0) {
        throw new Error("API did not return a valid response.");
      }

      let jsonText = result.candidates[0].content.parts[0].text;

      // clean up possible markdown fencing
      jsonText = jsonText.replace(/```json|```/g, "").trim();

      const parsedPalettes = JSON.parse(jsonText);
      setPalettes(parsedPalettes);
    } catch (err: any) {
      setError(
        `Could not extract colors: ${err.message || err} Please check your API key or try another image.`,
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (color: string) => {
    copy(color);
    setCopiedColor(color);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* File Upload Area */}
      <div
        className={`w-full max-w-2xl bg-neutral-800/50 border-2 border-dashed border-neutral-700 rounded-xl p-8 text-center transition-all ${!apiKey ? "opacity-50" : ""}`}
      >
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={!apiKey}
        />
        <label
          htmlFor={apiKey ? "imageUpload" : undefined}
          className={`flex flex-col items-center gap-4 ${apiKey ? "cursor-pointer text-neutral-300 hover:text-white transition-colors" : "cursor-not-allowed text-neutral-300"}`}
        >
          <PiUploadSimpleThin size={50} />
          {apiKey ? (
            <>
              <span className="font-semibold">Click to upload an image</span>
              <span className="text-sm">or drag and drop</span>
            </>
          ) : (
            <span className="font-semibold">
              <p>Please reload and input an API key</p>
              <a
                href="https://github.com/akshit-bansal11/color-space" // Replace with your link
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-300"
              >
                Using Locally? See Docs <FaExternalLinkAlt size={12} />
              </a>
            </span>
          )}
        </label>
      </div>

      {image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Uploaded preview"
            className="rounded-xl shadow-lg w-full"
          />
        </motion.div>
      )}

      {isLoading && (
        <div className="w-10 h-10 border-4 border-t-blue-500 border-neutral-700 rounded-full animate-spin"></div>
      )}
      {error && (
        <div className="text-red-500 max-w-2xl text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          {error}
        </div>
      )}

      {palettes?.colors && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex flex-col gap-6"
        >
          <div>
            <div className="flex flex-wrap justify-center gap-2">
              {palettes.colors.map((color, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="relative group"
                  onClick={() => handleCopy(color)}
                >
                  <div
                    className="w-20 h-20 rounded-lg cursor-pointer shadow-md border border-white/10"
                    style={{ backgroundColor: color }}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <AnimatePresence>
                        {copied && copiedColor === color ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <FaCheck size={24} className="text-green-400" />
                          </motion.div>
                        ) : (
                          <FaRegCopy size={24} className="text-neutral-200" />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono mt-1 block text-center">
                    {color}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
