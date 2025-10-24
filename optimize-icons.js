import path from 'path';
import sharp from 'sharp';
import fg from 'fast-glob';


const ICONS_DIR = path.resolve('./dist/icons');

async function optimizeImages() {
  // ищем все картинки
  const files = await fg(['**/*.{png,jpg,jpeg,webp,avif}'], { cwd: ICONS_DIR, absolute: true });

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    let pipeline = sharp(file).rotate(); // авто-ориентация

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 70, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 70, progressive: true });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 65 });
    } else if (ext === '.avif') {
      pipeline = pipeline.avif({ quality: 50 });
    }

    await pipeline.toFile(file);
    console.log(`Оптимизировано: ${file}`);
  }
}

optimizeImages().catch(console.error);
