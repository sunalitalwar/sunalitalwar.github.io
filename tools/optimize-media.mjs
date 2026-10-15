// Optimizes everything in assets/ so the site loads fast. Run after adding new media:
//
//   node tools/optimize-media.mjs            (all of assets/)
//   node tools/optimize-media.mjs --dry-run  (list what would change)
//
// Needs ffmpeg on PATH. SVG logos are optimized when svgo is reachable via npx.
//
// - Videos (.mp4): H.264, max 720px wide, CRF 28, faststart, plus a .webp poster next to each.
// - Images (.jpg/.jpeg/.png): long edge capped at 1600px (400px for PNG logos), re-compressed when large.
// - File and folder names are cleaned up (lowercase, spaces become dashes; underscores are kept): "Drink and Dine.mp4" -> "drink-and-dine.mp4".
// - Originals are copied to source-media/ (git-ignored) before being replaced.
// - assets/.media-manifest.json remembers what is already optimized, so re-runs only touch new files.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const BACKUP = path.join(ROOT, 'source-media');
const MANIFEST = path.join(ASSETS, '.media-manifest.json');
const DRY = process.argv.includes('--dry-run');

const VIDEO_MAX_W = 720, IMAGE_MAX_EDGE = 1600, PNG_MAX_EDGE = 400, IMAGE_REENCODE_OVER = 250 * 1024, POSTER_W = 400;

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const sha = f => createHash('sha1').update(fs.readFileSync(f)).digest('hex');
const rel = f => path.relative(ASSETS, f).split(path.sep).join('/');
const kb = n => (n / 1024).toFixed(0) + ' KB';
const slug = s => s.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/-+\./g, '.').replace(/^-+|-+$/g, '');
const slugPath = f => rel(f).split('/').map(slug).join('/');

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32' && cmd === 'npx' });
  if (r.status !== 0) throw new Error(`${cmd} failed: ${(r.stderr || '').split('\n').slice(-6).join('\n')}`);
  return r.stdout;
}
const probe = (f, entries) => run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', `stream=${entries}`, '-of', 'csv=p=0', f]).trim().split(',');

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}

// Move the original aside, then put the optimized file at its slugified path.
function replace(orig, optimized, ext) {
  const target = path.join(ASSETS, slugPath(orig));
  const backup = path.join(BACKUP, rel(orig));
  fs.mkdirSync(path.dirname(backup), { recursive: true });
  if (!fs.existsSync(backup)) fs.copyFileSync(orig, backup);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.rmSync(orig);
  fs.renameSync(optimized, target);
  manifest[rel(target)] = sha(target);
  return target;
}

function poster(video) {
  const out = video.replace(/\.mp4$/i, '.webp');
  run('ffmpeg', ['-y', '-v', 'error', '-ss', '0.8', '-i', video, '-frames:v', '1', '-vf', `scale=${POSTER_W}:-2`, '-c:v', 'libwebp', '-quality', '70', out]);
  return out;
}

function optimizeVideo(f) {
  const [w, , fpsRaw] = probe(f, 'width,height,r_frame_rate');
  const [n, d] = fpsRaw.split('/').map(Number);
  const vf = [`scale='min(${VIDEO_MAX_W},iw)':-2:flags=lanczos`];
  if (n / (d || 1) > 30.5) vf.push('fps=30');
  const tmp = f + '.tmp.mp4';
  run('ffmpeg', ['-y', '-v', 'error', '-i', f, '-map', '0:v:0', '-map', '0:a:0?', '-vf', vf.join(','),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-maxrate', '1100k', '-bufsize', '2200k', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '64k', '-ac', '2', '-movflags', '+faststart', '-metadata', 'comment=site-optimized', tmp]);
  const before = fs.statSync(f).size, after = fs.statSync(tmp).size;
  // Keep the original encode if ours somehow isn't smaller (already well compressed).
  if (after >= before) { fs.rmSync(tmp); const t = replace(f, (fs.copyFileSync(f, tmp), tmp), '.mp4'); return { target: t, before, after: before }; }
  const target = replace(f, tmp, '.mp4');
  return { target, before, after };
}

function optimizeImage(f) {
  const ext = path.extname(f).toLowerCase();
  const [w, h] = probe(f, 'width,height').map(Number);
  const size = fs.statSync(f).size;
  const maxEdge = ext === '.png' ? PNG_MAX_EDGE : IMAGE_MAX_EDGE; // PNGs here are logos, shown small
  const needsResize = Math.max(w, h) > maxEdge;
  const slugged = slugPath(f) !== rel(f);
  if (!needsResize && size <= IMAGE_REENCODE_OVER && !slugged) { manifest[rel(f)] = sha(f); return null; }
  const scale = needsResize ? `scale='if(gt(iw,ih),${maxEdge},-2)':'if(gt(iw,ih),-2,${maxEdge})':flags=lanczos` : 'scale=iw:ih';
  const tmp = f + '.tmp' + ext;
  const codec = ext === '.png' ? ['-c:v', 'png', '-compression_level', '9'] : ['-c:v', 'mjpeg', '-q:v', '4', '-pix_fmt', 'yuvj420p'];
  run('ffmpeg', ['-y', '-v', 'error', '-i', f, '-vf', scale, '-frames:v', '1', ...codec, tmp]);
  const before = size, after = fs.statSync(tmp).size;
  if (after >= before && !needsResize && !slugged) { fs.rmSync(tmp); manifest[rel(f)] = sha(f); return null; }
  return { target: replace(f, tmp, ext), before, after };
}

function optimizeSvg(f) {
  const before = fs.statSync(f).size, tmp = f + '.tmp.svg';
  run('npx', ['--yes', 'svgo', '--multipass', '-i', f, '-o', tmp]);
  const after = fs.statSync(tmp).size;
  if (after >= before) { fs.rmSync(tmp); manifest[rel(f)] = sha(f); return null; }
  return { target: replace(f, tmp, '.svg'), before, after };
}

const jobs = [...walk(ASSETS)].filter(f => {
  const name = path.basename(f);
  if (name.startsWith('.') || name.includes('.tmp.')) return false;
  if (!/\.(mp4|jpe?g|png|svg)$/i.test(name)) return false;
  return manifest[rel(f)] !== sha(f);
});

let saved = 0;
for (const f of jobs) {
  const ext = path.extname(f).toLowerCase();
  if (DRY) { console.log('would optimize', rel(f)); continue; }
  try {
    const res = ext === '.mp4' ? optimizeVideo(f) : ext === '.svg' ? optimizeSvg(f) : optimizeImage(f);
    if (!res) { console.log('ok (unchanged)', rel(f)); continue; }
    if (ext === '.mp4') poster(res.target);
    saved += res.before - res.after;
    console.log(`${rel(f)} -> ${rel(res.target)}  ${kb(res.before)} -> ${kb(res.after)}`);
  } catch (e) {
    console.error('FAILED', rel(f), e.message);
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
}

// Posters for videos that are already optimized but have none yet.
if (!DRY) for (const f of walk(ASSETS)) {
  if (/\.mp4$/i.test(f) && !fs.existsSync(f.replace(/\.mp4$/i, '.webp'))) { poster(f); console.log('poster', rel(f)); }
}
if (!DRY) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(DRY ? `${jobs.length} file(s) to optimize` : `Done. Saved ${(saved / 1048576).toFixed(1)} MB.`);
