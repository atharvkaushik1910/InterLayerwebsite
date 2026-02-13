import React, { useEffect, useRef } from 'react';

interface ImageAsciiProps {
    imageSrc: string;
    chars?: string;
    colored?: boolean;
    fontSize?: number;
    className?: string;
    parentRef?: React.RefObject<HTMLElement>;
}

export const ImageAscii = ({
    imageSrc,
    colored = true,
    chars = " @#W$9876543210?!abc;:+=-,._",
    fontSize = 12,
    className
}: ImageAsciiProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;
        img.onload = () => {
            renderAscii(img, canvas, ctx);
        };

        const handleResize = () => {
            renderAscii(img, canvas, ctx);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageSrc, colored, chars, fontSize]);

    const renderAscii = (img: HTMLImageElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // Scale all drawing operations by dpr
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;

        // Clear (using logical coords)
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000'; // Dark background
        ctx.fillRect(0, 0, w, h);

        // Calculate Cover Sizing
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        const charWidth = fontSize * 0.6;
        const cols = Math.floor(w / charWidth);
        const rows = Math.floor(h / fontSize);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = cols;
        offCanvas.height = rows;
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
        if (!offCtx) return;

        // Draw image to offscreen canvas with 'cover' simulation
        let drawW = cols;
        let drawH = rows;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (relative to aspect), so match width and crop height?
            // Actually standard cover: if container is wider, image width matches container width, height is cropped.
            // Here we map to 'cols' and 'rows'.
            drawH = cols / imgRatio;
            offsetY = (rows - drawH) / 2;
        } else {
            drawW = rows * imgRatio;
            offsetX = (cols - drawW) / 2;
        }

        offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

        const imageData = offCtx.getImageData(0, 0, cols, rows);
        const data = imageData.data;

        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const pixelIdx = (i * cols + j) * 4;

                const r = data[pixelIdx];
                const g = data[pixelIdx + 1];
                const b = data[pixelIdx + 2];

                const avg = (r + g + b) / 3;
                // Map brightness to char: darker = later in string (denser) or earlier?
                // " " is empty. @ is dense.
                // Usually high brightness = empty (white background), low brightness = dense (dark text).
                // But here we draw colored text on black.
                // So high brightness = dense char? 
                // chars string: " @..." space is first.
                // If avg is 255 (white), we want visible char?
                // Let's assume input string is ordered low-density to high-density.
                // So 255 => high density.

                const charIdx = Math.floor((avg / 255) * (chars.length - 1));
                // Let's reverse if needed. If chars[0] is space (low density), then correct.

                const char = chars[charIdx] || chars[chars.length - 1];

                if (colored) {
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                } else {
                    ctx.fillStyle = `rgb(${avg},${avg},${avg})`;
                }

                ctx.fillText(char, j * charWidth, i * fontSize);
            }
        }
    };

    return <canvas ref={canvasRef} className={className} />;
};
