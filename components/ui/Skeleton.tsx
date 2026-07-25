/**
 * Loading placeholder block. Pulses to signal "content is coming" while server
 * components fetch from the DB. Shape it with width/height/rounding classes to
 * mirror the real element it stands in for.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-steel/60 ${className}`} aria-hidden="true" />;
}
