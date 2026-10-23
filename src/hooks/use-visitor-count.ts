import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../lib/query-client';

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

async function fetchVisitorCount(): Promise<string | null> {
  const res = await fetch(HITS_SVG_URL);
  if (!res.ok) throw new Error('Failed to fetch visitor count');
  const svg = await res.text();
  return parseSvgCount(svg);
}

export function useVisitorCount(): Result {
  const { data, status } = useQuery({
    queryKey: queryKeys.visitor.count,
    queryFn: fetchVisitorCount,
    staleTime: 5 * 60 * 1000,
  });

  let mappedStatus: Status = 'loading';
  if (status === 'success') mappedStatus = 'success';
  else if (status === 'error') mappedStatus = 'error';

  return {
    count: data ?? null,
    status: mappedStatus,
  };
}
