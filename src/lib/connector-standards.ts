export interface ConnectorStandardOption {
  id: string;
  name: string;
  tag: string;
  tagClass: string;
  subtitle: string;
}

export const CONNECTOR_STANDARDS: readonly ConnectorStandardOption[] = [
  {
    id: 'GB-T',
    name: 'GB-T',
    tag: '⚡ DC Fast',
    tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    subtitle: 'Chinese Standard (BYD, MG, GAC, Changan)',
  },
  {
    id: 'CCS2',
    name: 'CCS2',
    tag: '⚡ DC Fast',
    tagClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
    subtitle: 'European & Global (Porsche, Hyundai, Audi)',
  },
  {
    id: 'Type 2',
    name: 'Type 2',
    tag: '🔌 AC Slow',
    tagClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
    subtitle: 'AC Destination Charging (up to 22 kW)',
  },
];

export function formatConnectorStandards(selected: string[]): string {
  if (!selected || selected.length === 0) return 'GB-T';
  const hasGbt = selected.includes('GB-T');
  const hasCcs = selected.includes('CCS2');
  const hasType2 = selected.includes('Type 2');

  const parts: string[] = [];
  if (hasGbt && hasCcs) {
    parts.push('GB-T/CCS2');
  } else {
    if (hasGbt) parts.push('GB-T');
    if (hasCcs) parts.push('CCS2');
  }
  if (hasType2) parts.push('Type 2');

  return parts.join(' / ');
}
