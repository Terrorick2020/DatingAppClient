import { Area } from 'react-easy-crop';


function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    if (!url.startsWith('data:')) {
      image.crossOrigin = 'anonymous';
    }

    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    outputWidth: number,
    outputHeight: number
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Не удалось получить 2D контекст канваса');
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
        if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось создать Blob из canvas.'));
        }
    }, 'image/jpeg');
  });
}

export function getPreviewVideo(
  file: File,
  setImgUrl: (value: string) => void,
  setLoading: (value: boolean) => void,
  callback: (file: File) => void
): void {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;

  video.onloadedmetadata = () => {
    const duration = video.duration;
    const step = Math.max(0.5, duration / 10);
    let currentTime = Math.min(1, duration / 10);

    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth * window.devicePixelRatio;
    canvas.height = video.videoHeight * window.devicePixelRatio;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const checkFrame = () => {
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight).data;
      const isBlack = !imageData.some((p, i) => i % 4 !== 3 && p > 10);

      if (!isBlack || currentTime >= duration) {
        const imageUrl = canvas.toDataURL('image/png');
        setImgUrl(imageUrl);
        URL.revokeObjectURL(video.src);

        setTimeout(() => {
          setLoading(false);
          callback(file);
        }, 10);
      } else {
        currentTime += step;
        video.currentTime = currentTime;
      }
    };

    video.onseeked = checkFrame;
    video.currentTime = currentTime;
  };
}
