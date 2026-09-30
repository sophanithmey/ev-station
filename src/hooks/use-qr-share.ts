import { useState, useCallback } from 'react';

type ShareFeedback = 'idle' | 'shared' | 'downloaded' | 'copied';

export function useQrShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [feedback, setFeedback] = useState<ShareFeedback>('idle');

  const triggerFeedback = useCallback((status: ShareFeedback) => {
    setFeedback(status);
    setTimeout(() => setFeedback('idle'), 2500);
  }, []);

  const downloadQr = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/khqr.png';
    link.download = 'bakong-khqr-ev-station.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerFeedback('downloaded');
  }, [triggerFeedback]);

  const shareQr = useCallback(async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      // Attempt to share the QR code image file directly
      const response = await fetch('/khqr.png');
      const blob = await response.blob();
      const file = new File([blob], 'bakong-khqr.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Bakong KHQR - Cambodia EV Directory',
          text: 'Scan this Bakong KHQR code to support Cambodia EV Charging Stations Directory.',
          files: [file],
        });
        triggerFeedback('shared');
        return;
      }

      // Fallback: share text & URL if file sharing is not supported
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: 'Support Cambodia EV Map via Bakong KHQR',
          text: 'Scan with any Cambodian banking app (ABA, Bakong, Wing, ACLEDA) to support Cambodia EV Directory.',
          url: window.location.href,
        });
        triggerFeedback('shared');
        return;
      }

      // Final fallback: download the QR image
      downloadQr();
    } catch (err: unknown) {
      // User aborted share sheet or permission error
      if (err instanceof Error && err.name !== 'AbortError') {
        downloadQr();
      }
    } finally {
      setIsSharing(false);
    }
  }, [isSharing, downloadQr, triggerFeedback]);

  return {
    isSharing,
    feedback,
    handleShareQr: shareQr,
    handleDownloadQr: downloadQr,
  };
}
