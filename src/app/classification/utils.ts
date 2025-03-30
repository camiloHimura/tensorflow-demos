export interface Prediction {
  className: string;
  probability: number;
}

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
  });
};
