export function formatTime(seconds: number) {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h${m ? ` ${m}m` : ""}`;
  }

  if (seconds >= 60) {
    return `${Math.floor(seconds / 60)}m`;
  }

  return `${seconds}s`;
}
