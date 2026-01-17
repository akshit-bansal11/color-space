import { useState, useCallback } from "react";

export const useCopyToClipboard = (): [boolean, (text: string) => Promise<boolean>] => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard not supported");
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            return true;
        } catch (error) {
            console.error("Failed to copy text: ", error);
            setCopied(false);
            return false;
        }
    }, []);

    return [copied, copy];
};
