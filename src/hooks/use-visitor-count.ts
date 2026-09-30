import { useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Result = {
  count: string | null;
  status: Status;
};

const HITS_SVG_URL =
  'https://hits.sh/evkh-station.vercel.app/ev-station.svg?view=total&label=visitors';

function parseSvgCount(svgText: string): string | null {
  const matches = svgText.match(/>(\d[\d,]*)</g);
  if (!matches) return null;
  const nums = matches
    .map((m) => m.replace(/>|</g, '').replace(/,/g, ''))
    .filter((m) => /^\d+$/.test(m))
    .map(Number)
    .filter((n) => n > 0);
  if (nums.length === 0) return null;
  return Math.max(...nums).toLocaleString();
}

export function useVisitorCount(): Result {
  const [count, setCount] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    fetch(HITS_SVG_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then((svg) => {
        if (cancelled) return;
        const parsed = parseSvgCount(svg);
        setCount(parsed);
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { count, status };
}
