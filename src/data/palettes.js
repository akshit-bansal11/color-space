//--------------------| ICON/S |--------------------//
import { FaSpotify, FaAmazon, FaMeta, FaGoogle } from 'react-icons/fa6'
import { SiIkea, SiMcdonalds, SiNetflix, SiStarbucks, SiNvidia, } from "react-icons/si";
import { TbOlympics } from "react-icons/tb";

//--------------------| MAIN EXPORT |--------------------//
export const palettes = [
    // 3-Color
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#50207A", "#FF48B9", "#12CE6A"], category: "3-color" },
    { colors: ["#414A37", "#99744A", "#DBC2A6"], category: "3-color" },
    { colors: ["#50207A", "#D6B9FC", "#838CE5"], category: "3-color" },
    { colors: ["#e74c3c", "#f39c12", "#f1c40f"], category: "3-color" },
    { colors: ["#10367D", "#EBEBEB", "#74B4D9"], category: "3-color" },
    { colors: ["#05614B", "#020E0E", "#01DE82"], category: "3-color" },
    { colors: ["#FD0D02", "#FEA603", "#4D6802"], category: "3-color" },
    { colors: ["#0C0E0B", "#D6E7F3", "#D6303A"], category: "3-color" },

    // 4-Color
    { colors: ["#2c3e50", "#3498db", "#ecf0f1", "#95a5a6"], category: "4-color" },
    { colors: ["#16a085", "#27ae60", "#2ecc71", "#34495e"], category: "4-color" },
    { colors: ["#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"], category: "4-color" },

    // 5-Color
    { colors: ["#272727", "#484848", "#ffb900", "#009eff", "#d7d7d7"], category: "5-color" },
    { colors: ["#f0932b", "#eb4d4b", "#6ab04c", "#4834d4", "#30336b"], category: "5-color" },
    { colors: ["#a29bfe", "#ffeaa7", "#fab1a0", "#74b9ff", "#55efc4"], category: "5-color" },

    // Popular Brands
    { name: "Spotify", Icon: FaSpotify, colors: ["#1EDD60", "#1B1716"], category: "Popular Brands" },
    { name: "IKEA", Icon: SiIkea, colors: ["#0058A3", "#FFDB00"], category: "Popular Brands" },
    { name: "Amazon", Icon: FaAmazon, colors: ["#FF6201", "#171D27"], category: "Popular Brands" },
    { name: "McDonalds", Icon: SiMcdonalds, colors: ["#DB0007", "#FFBC0D"], category: "Popular Brands" },
    { name: "Netflix", Icon: SiNetflix, colors: ["#B1060F", "#E50914", "#000000"], category: "Popular Brands" },
    { name: "Starbucks", Icon: SiStarbucks, colors: ["#006341", "#000000", "#FFFFFF"], category: "Popular Brands" },
    { name: "nVidia", Icon: SiNvidia, colors: ["#517C00", "#75B600", "#000000"], category: "Popular Brands" },
    { name: "Meta", Icon: FaMeta, colors: ["#0265E0", "#0080F9", "#1C2B33"], category: "Popular Brands" },
    { name: "Google", Icon: FaGoogle, colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"], category: "Popular Brands" },
    { name: "Olympics", Icon: TbOlympics, colors: ["#0081C8", "#000000", "#DF3D59", "#F0BA6A", "#00A651"], category: "Popular Brands" }
];