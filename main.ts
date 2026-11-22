// news-image-20261122 entry (Node 22, standard library only).
// The image is the entry.png beside this file: a one-page front page
// summing up 22 November 2026 — the burning tanker in the Strait of
// Hormuz leads, with Lviv, the Shenzhen summit, the EU-Indonesia deal
// and the Peru quake below. The program validates it against the gate
// and copies it to /output/entry.png.
//
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024
// pixels; the judge sees exactly the bytes copied, so this entry keeps
// the bytes fixed and does no work at runtime beyond the checks and copy.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY_NAME = 'entry.png';
const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

// PNG signature, then the IHDR chunk: length (4) + "IHDR" (4) + width (4) + height (4).
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Resolve the image beside this file and the output directory. */
function resolvePaths(): { src: URL; outDir: string } {
  const src = new URL(`./${ENTRY_NAME}`, import.meta.url);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  return { src, outDir };
}

/** Read the PNG dimensions out of its IHDR chunk. */
function pngDimensions(buf: Buffer): { width: number; height: number } {
  if (buf.length < 24 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error('entry.png is not a PNG');
  }
  if (buf.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error('entry.png has no IHDR chunk');
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** Check the image against the gate before anything is written. */
function validateEntry(src: URL): Buffer {
  const buf = readFileSync(src);
  if (buf.length > MAX_BYTES) {
    throw new Error(`entry.png is ${buf.length} bytes, over the 1 MiB gate`);
  }
  const { width, height } = pngDimensions(buf);
  if (width > MAX_SIDE || height > MAX_SIDE) {
    throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate`);
  }
  return buf;
}

/** Copy the fixed image to the output directory, creating it if needed. */
function copyEntry(src: URL, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, ENTRY_NAME);
  copyFileSync(src, dest);
  return dest;
}

function main(): void {
  const { src, outDir } = resolvePaths();
  const buf = validateEntry(src);
  const { width, height } = pngDimensions(buf);
  const dest = copyEntry(src, outDir);
  console.log(`wrote ${dest} (${width}x${height}, ${buf.length} bytes)`);
}

main();
