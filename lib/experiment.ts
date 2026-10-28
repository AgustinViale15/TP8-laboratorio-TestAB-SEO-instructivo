export function hashVisitorId(visitorId: string): 'a' | 'b' {
  let hash = 2166136261;
  for (let i = 0; i < visitorId.length; i++) {
    hash ^= visitorId.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0) % 2 === 0 ? 'a' : 'b';
}

export function calculateRate(conversions: number, impressions: number): string {
  if (!impressions || impressions === 0) return 'N/A';
  const rate = (conversions / impressions) * 100;
  return rate.toFixed(2).replace('.', ',') + '%';
}

export function calculateRateNum(conversions: number, impressions: number): number {
  if (!impressions || impressions === 0) return 0;
  return (conversions / impressions) * 100;
}

export function calculatePpDiff(rateA: number, rateB: number): string {
  const diff = rateB - rateA;
  return diff.toFixed(2).replace('.', ',') + ' pp';
}
