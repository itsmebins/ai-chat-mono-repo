import { Readable } from "stream";

/**
 * Converts a stream to a base64-encoded string. This function is useful in scenarios
 * where stream data needs to be encoded for storage or transmission in a text-based
 * format like JSON. It's particularly handy for encoding file uploads or binary data
 * fetched from databases or other sources. The function also includes an optional
 * maximum file size check, which is useful for enforcing file size limits.
 *
 * @param {Readable} stream - The input stream to be converted.
 * @param {string} mimeType - The MIME type of the stream content.
 * @param {number} [maxFileSize] - Optional maximum file size in bytes.
 * @returns {Promise<string>} A promise that resolves to the base64-encoded string.
 */
export async function streamToBase64String(
  stream: Readable,
  mimeType: string,
  maxFileSize?: number, // in bytes
): Promise<string> {
  const chunks: Buffer[] = [];
  let totalSize = 0;

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => {
      totalSize += chunk.length;
      if (maxFileSize && totalSize > maxFileSize) {
        // If the file exceeds the maximum size, reject the promise
        console.log("errorr");
        stream.destroy(); // Stop processing the stream
        reject(new Error("File size exceeds the maximum limit"));
        return;
      }
      chunks.push(Buffer.from(chunk));
    });
    stream.on("error", (err: Error) => reject(err));
    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const base64 = buffer.toString("base64");
      resolve(`data:${mimeType};base64,${base64}`);
    });
  });
}
