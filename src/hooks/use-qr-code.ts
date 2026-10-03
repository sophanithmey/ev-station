import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface QrResult {
  svgString: string;
  dataUrl: string;
  isLoading: boolean;
}

export function useQrCode(text: string, options?: { width?: number; margin?: number }): QrResult {
  const [result, setResult] = useState<QrResult>({
    svgString: '',
    dataUrl: '',
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const generate = async () => {
      try {
        const svg = await QRCode.toString(text, {
          type: 'svg',
          width: options?.width ?? 128,
          margin: options?.margin ?? 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff00',
          },
        });

        const url = await QRCode.toDataURL(text, {
          width: options?.width ?? 256,
          margin: options?.margin ?? 2,
        });

        if (isMounted) {
          setResult({
            svgString: svg,
            dataUrl: url,
            isLoading: false,
          });
        }
      } catch {
        if (isMounted) {
          setResult((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  }, [text, options?.width, options?.margin]);

  return result;
}
