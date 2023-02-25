import { useState } from "react";

type CopiedValue = string | null;
type CopyFunction = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): readonly [CopiedValue, CopyFunction] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const copy: CopyFunction = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not available");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (e) {
      console.warn("Copy failed", e);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy] as const;
}
