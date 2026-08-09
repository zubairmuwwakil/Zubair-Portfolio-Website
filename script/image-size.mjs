/**
 * Intrinsic pixel dimensions of an image, read from its header bytes.
 *
 * This exists so og:image:width/height are derived from the file rather than
 * written down. They were hardcoded once, for the 1200x630 generic card, and
 * stayed at those numbers when per-project 1024x1024 covers started overriding
 * og:image — every project page advertised dimensions belonging to a different
 * picture. Numbers a human maintains next to an asset drift the moment the
 * asset is replaced, so nothing here is maintained by hand.
 *
 * Shared by the Vite plugin that bakes the sizes into the bundle and by
 * verify-seo, so the build and the gate can never disagree about a file.
 *
 * Only the formats the covers actually use are supported. An unknown format
 * throws rather than guessing: a hard build failure is recoverable, a silently
 * wrong dimension is exactly the bug this replaces.
 */

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * SOF (Start Of Frame) markers carry the frame's dimensions. The three
 * exclusions sit in the same 0xC0-0xCF block but are table definitions, not
 * frame headers: DHT (0xC4), JPG (0xC8) and DAC (0xCC).
 */
const isStartOfFrame = (marker) =>
  marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

function pngSize(buf) {
  // PNG requires IHDR to be the first chunk, so the dimensions are at a fixed
  // offset: 8-byte signature, 4-byte chunk length, 4-byte "IHDR" type.
  if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR")
    throw new Error("PNG has no IHDR chunk where the spec requires one");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  // JPEG has no fixed offset — the frame header sits after a variable run of
  // metadata segments (EXIF, ICC profiles, quantisation tables), so walk them.
  let offset = 2; // past SOI
  while (offset + 1 < buf.length) {
    if (buf[offset] !== 0xff) throw new Error(`expected a JPEG marker at byte ${offset}`);
    // A marker may be padded with any number of 0xFF fill bytes.
    let marker = buf[offset + 1];
    while (marker === 0xff && offset + 2 < buf.length) marker = buf[++offset + 1];
    offset += 2;

    // Standalone markers carry no payload: TEM, the restart markers, SOI, EOI.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) continue;

    if (offset + 1 >= buf.length) break;
    const length = buf.readUInt16BE(offset); // includes its own two bytes
    if (isStartOfFrame(marker)) {
      // Payload: 1 byte sample precision, then height and width, each 2 bytes.
      if (offset + 7 > buf.length) break;
      return { width: buf.readUInt16BE(offset + 5), height: buf.readUInt16BE(offset + 3) };
    }
    if (length < 2) throw new Error(`JPEG segment at byte ${offset} has an invalid length`);
    offset += length;
  }
  throw new Error("JPEG has no start-of-frame marker");
}

/** Intrinsic `{ width, height }` in pixels. Throws on an unreadable file. */
export function imageSize(buf) {
  if (buf.subarray(0, 8).equals(PNG_SIGNATURE)) return pngSize(buf);
  if (buf.length > 2 && buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  throw new Error(
    "unsupported image format — only PNG and JPEG are read for share-image dimensions",
  );
}
