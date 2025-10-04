//--------------------| DEPENDENCIES |--------------------//
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tinycolor from "tinycolor2";

//--------------------| ICONS |--------------------//
import { FaArrowRightArrowLeft } from "react-icons/fa6";

//--------------------| COMPONENTS |--------------------//
import Input from "../components/form/Input.jsx";
import Label from "../components/form/Label.jsx";
import Select from "../components/form/Select.jsx";
import Option from "../components/form/Option.jsx";
import CopyButton from "../components/buttons/CopyButton.jsx";

//--------------------| HELPERS |--------------------//
import { isHexColor, isCssAngle, twToCss, cssToTw } from "../utils/colorUtils.js";

//--------------------| REUSABLES |--------------------//
const ErrorMessage = ({ error }) => (
    <AnimatePresence>
        {error && (
            <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 mt-1"
            >
                {error}
            </motion.p>
        )}
    </AnimatePresence>
);

const ResultBox = ({ label, value }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Label>{label}</Label>
        <div className="relative group">
            <textarea
                readOnly
                value={value}
                className="
                    w-full resize-none p-4 pr-12 rounded-lg
                    text-center text-neutral-200 font-mono text-sm
                    border border-neutral-700/50
                    bg-neutral-950/70
                "
                rows={1}
            />
            <CopyButton text={value} iconSize="text-2xl" isHover />
        </div>
    </motion.div>
);

const renderInputField = ({ label, name, value, error, placeholder, onChange }) => (
    <div key={name} className="flex-1">
        <Label htmlFor={name}>{label}</Label>
        <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                w-full px-3 py-2 rounded-lg 
                bg-neutral-800 
                text-neutral-100 
                border 
                focus:outline-none focus:ring-2
                ${error
                    ? "border-red-500/50 focus:ring-red-500"
                    : "border-neutral-700 focus:ring-neutral-400"
                }
            `}
        />
        <ErrorMessage error={error} />
    </div>
);

//--------------------| COMPONENTS |--------------------//
function GradientClassConverter() {
    const [mode, setMode] = useState("tw-to-css");
    const [inputs, setInputs] = useState({
        from: "#10b981",
        via: "",
        to: "#3b82f6",
        twDir: "to-r",
        cssType: "to right",
        cssAngle: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const e = {};
        if (!isHexColor(inputs.from)) e.from = "Invalid hex.";
        if (inputs.via && !isHexColor(inputs.via)) e.via = "Invalid hex.";
        if (!isHexColor(inputs.to)) e.to = "Invalid hex.";
        if (mode === "css-to-tw" && inputs.cssType === "angle") {
            if (!inputs.cssAngle) e.cssAngle = "Required.";
            else if (!isCssAngle(inputs.cssAngle)) e.cssAngle = "Invalid (e.g., 45deg).";
        }
        setErrors(e);
    }, [inputs, mode]);

    const handle = (e) => setInputs((p) => ({ ...p, [e.target.name]: e.target.value }));

    const result = useMemo(() => {
        if (Object.keys(errors).length) return "";
        const { from, via, to, twDir, cssType, cssAngle } = inputs;
        const stops = [from, via, to].filter(Boolean).join(", ");

        if (mode === "tw-to-css")
            return twDir === "radial"
                ? `radial-gradient(circle, ${stops});`
                : `linear-gradient(${twToCss[twDir]}, ${stops});`;

        const fromCls = `from-[${from}]`;
        const viaCls = via ? `via-[${via}]` : "";
        const toCls = `to-[${to}]`;

        if (cssType === "angle") {
            return `bg-gradient-[${cssAngle}] ${fromCls} ${viaCls} ${toCls}`;
        }
        if (cssType === "radial") {
            return `bg-radial ${fromCls} ${viaCls} ${toCls}`;
        }
        return `bg-gradient-${cssToTw[cssType]} ${fromCls} ${viaCls} ${toCls}`;
    }, [inputs, mode, errors]);

    const previewGradient = useMemo(() => {
        // Don't show a preview if there are errors (like invalid hex, missing angle)
        if (Object.keys(errors).length) return null;

        const { from, via, to, twDir, cssType, cssAngle } = inputs;
        const stops = [from, via, to].filter(Boolean).join(", ");

        // Need at least one valid color
        if (!stops) return null;

        // Generate the preview based on the current mode's inputs
        if (mode === "tw-to-css") {
            return twDir === "radial"
                ? `radial-gradient(circle, ${stops})`
                : `linear-gradient(${twToCss[twDir]}, ${stops})`;
        }

        // else (mode === "css-to-tw")
        if (cssType === "radial") {
            return `radial-gradient(circle, ${stops})`;
        }
        if (cssType === "angle") {
            // This relies on your error check. If isCssAngle is false, 'errors' will exist, so this will be null.
            return `linear-gradient(${cssAngle}, ${stops})`;
        }

        // Standard CSS direction (e.g., "to right")
        return `linear-gradient(${cssType}, ${stops})`;

    }, [inputs, mode, errors]);

    const inputFields = [
        { label: "From*", name: "from", value: inputs.from, error: errors.from, placeholder: "#RRGGBB" },
        { label: "Via", name: "via", value: inputs.via, error: errors.via, placeholder: "Optional" },
        { label: "To*", name: "to", value: inputs.to, error: errors.to, placeholder: "#RRGGBB" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                w-full max-w-2xl rounded-2xl p-6 md:p-8 space-y-8
                bg-neutral-800/50
                border border-neutral-700/50
            "
        >
            <h1 className="
                    text-2xl md:text-3xl text-center
                    font-chillax font-extrabold
                    text-neutral-300
                "
            >
                Gradient Class Converter
            </h1>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-2">
                <div
                    className={`
                        flex-1 p-2 rounded-lg 
                        text-center font-medium 
                        ${mode === "tw-to-css"
                            ? "bg-neutral-700 text-neutral-100"
                            : "bg-neutral-800/50 text-neutral-400"
                        }
                    `}
                >
                    Tailwind → CSS
                </div>
                <motion.button
                    onClick={() => setMode(mode === "tw-to-css" ? "css-to-tw" : "tw-to-css")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="
                        p-3 rounded-full
                        bg-neutral-700/50
                        hover:bg-neutral-700
                    "
                >
                    <FaArrowRightArrowLeft className="text-neutral-300" />
                </motion.button>
                <div
                    className={`
                        flex-1 p-2 rounded-lg 
                        text-center font-medium 
                        ${mode === "css-to-tw"
                            ? "bg-neutral-700 text-neutral-100"
                            : "bg-neutral-800/50 text-neutral-400"
                        }
                    `}
                >
                    CSS → Tailwind
                </div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {inputFields.map((field) => renderInputField({ ...field, onChange: handle }))}
            </div>

            {mode === "tw-to-css" ? (
                <Select name="twDir" value={inputs.twDir} onChange={handle}>
                    {Object.keys(twToCss).map((d) => (
                        <Option key={d} value={d}>
                            {d}
                        </Option>
                    ))}
                    <Option value="radial">radial</Option>
                </Select>
            ) : (
                <div className="flex flex-col md:flex-row gap-4">
                    <Select name="cssType" value={inputs.cssType} onChange={handle} className="flex-1">
                        {Object.keys(cssToTw).map((d) => (
                            <Option key={d} value={d}>
                                {d}
                            </Option>
                        ))}
                        <Option value="radial">Radial</Option>
                        <Option value="angle">Angle</Option>
                    </Select>
                    {inputs.cssType === "angle" && (
                        <div className="flex-1">
                            <Label htmlFor="cssAngle">Angle*</Label>
                            <Input
                                id="cssAngle"
                                name="cssAngle"
                                value={inputs.cssAngle}
                                onChange={handle}
                                placeholder="e.g., 45deg"
                                className={`
                                    w-full px-3 py-2 rounded-lg 
                                    bg-neutral-800 
                                    text-neutral-100 
                                    border 
                                    focus:outline-none focus:ring-2 
                                    ${errors.cssAngle
                                        ? "border-red-500/50 focus:ring-red-500"
                                        : "border-neutral-700 focus:ring-neutral-400"
                                    }
                                `}
                            />
                            <ErrorMessage error={errors.cssAngle} />
                        </div>
                    )}
                </div>
            )}

            {/* Result */}
            <AnimatePresence>
                {previewGradient && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "8rem" }} // 8rem = h-32
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-32 rounded-lg border border-neutral-700/50"
                        style={{ backgroundImage: previewGradient }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {result &&
                    <ResultBox label="Result" value={result} className={previewGradient ? "mt-4" : ""} />
                }
            </AnimatePresence>
        </motion.div>
    );
}

function ColorCodeConverter() {
    const [input, setInput] = useState("#9f9f9f");
    const [type, setType] = useState("rgb");

    const col = useMemo(() => tinycolor(input), [input]);
    const valid = col.isValid();

    const result = useMemo(() => {
        if (!valid) return "";
        return type === "hex" ? col.toHexString() : type === "rgb" ? col.toRgbString() : col.toHslString();
    }, [col, type, valid]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
                flex flex-col gap-8 rounded-2xl
                w-full max-w-md 
                p-6 md:p-8
                bg-neutral-800/50 
                border border-neutral-700/50 
            "
        >
            <h1 className="
                    text-2xl md:text-3xl text-center 
                    text-neutral-300
                    font-chillax font-extrabold 
                "
            >
                Color Code Converter
            </h1>

            {/* Input */}
            <div>
                <Label>Enter Color</Label>
                <div className="flex items-center">
                    <motion.div
                        animate={{ backgroundColor: valid ? col.toHexString() : "#3f3f46" }}
                        className="w-10 h-10 rounded-l-lg border-y border-l"
                    />
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={`
                            w-full h-10 px-3 rounded-r-lg 
                            bg-neutral-800 
                            text-neutral-100 
                            border border-l-0 
                            ${valid
                                ? "border-neutral-700 focus:ring-green-500"
                                : "border-red-500/50 focus:ring-red-500"
                            }
                        `}
                    />
                </div>
            </div>

            {/* Select */}
            <div>
                <Label>Convert To</Label>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <Option value="hex">Hex</Option>
                    <Option value="rgb">RGB</Option>
                    <Option value="hsl">HSL</Option>
                </Select>
            </div>

            {/* Result */}
            <AnimatePresence>
                {result &&
                    <ResultBox label="Result" value={result} />
                }
            </AnimatePresence>
        </motion.div>
    );
}

//--------------------| MAIN RENDER |--------------------//
export default function Converter() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex-1 min-w-0">
                <ColorCodeConverter />
            </div>
            <div className="flex-1 min-w-0">
                <GradientClassConverter />
            </div>
        </div>
    );
}
