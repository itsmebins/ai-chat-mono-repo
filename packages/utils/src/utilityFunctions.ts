import { decode } from "html-entities";

export const generateRandomId = (): string => {
  const generatedId = `${Date.now().toString(36)}-${Math.random().toString(
    36,
  )}`;
  return generatedId.toUpperCase();
};

export const removeHtmlTags = (str: string = "") => {
  if (!str || typeof str !== "string") {
    return str;
  }
  let cleanStr = str.replace(/<\/?[^>]+(>|$)/g, "");
  // Then, remove common HTML entities
  cleanStr = cleanStr.replace(/&nbsp;/gi, " "); // Replace non-breaking spaces with regular spaces
  cleanStr = cleanStr.replace(/&amp;/gi, "&"); // Replace &amp; with &
  cleanStr = cleanStr.replace(/&quot;/gi, '"'); // Replace &quot; with "
  cleanStr = cleanStr.replace(/&apos;/gi, "'"); // Replace &apos; with '
  cleanStr = cleanStr.replace(/&lt;/gi, "<"); // Replace &lt; with <
  cleanStr = cleanStr.replace(/&gt;/gi, ">"); // Replace &gt; with >
  // To handle specail chars and spanish letters
  cleanStr = decode(cleanStr, { level: "html5" });

  return cleanStr;
};
