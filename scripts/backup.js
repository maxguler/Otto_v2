/**
 * Backup del proyecto Otto 2.0: zip con todo el código y assets,
 * excluyendo node_modules, dist y .git.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const date = new Date().toISOString().slice(0, 10);
const OUT = path.join(ROOT, `Otto-2.0-backup-${date}.zip`);

const IGNORE = new Set([
  'node_modules',
  'dist',
  '.git',
  'dist-deploy.zip',
  '.env',
]);

if (fs.existsSync(OUT)) fs.unlinkSync(OUT);

const archive = archiver('zip', { zlib: { level: 9 } });
const output = fs.createWriteStream(OUT);

output.on('close', () => {
  console.log('Backup listo:', OUT);
  console.log('Tamaño:', (archive.pointer() / 1024 / 1024).toFixed(2), 'MB');
});

archive.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

archive.pipe(output);

function addDir(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const name = e.name;
    if (IGNORE.has(name) || (name.startsWith('Otto-2.0-backup-') && name.endsWith('.zip'))) continue;
    const full = path.join(dir, name);
    const rel = path.join(prefix, name);
    if (e.isDirectory()) {
      addDir(full, rel);
    } else {
      archive.file(full, { name: path.join('Otto-2.0', rel) });
    }
  }
}

addDir(ROOT, '');
archive.finalize();
