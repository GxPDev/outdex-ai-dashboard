export function formatPool(pool: number): string {
  if (pool >= 1_000_000) {
    return `$${(pool / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (pool >= 10_000) {
    return `$${(pool / 1_000).toFixed(0)}K`;
  }
  if (pool >= 1_000) {
    return `$${(pool / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `$${pool.toLocaleString()}`;
}
