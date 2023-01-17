const NANO_FACTOR = 1e9;

export const nanosecondsToSeconds = (time: bigint) =>
  Number(time) / NANO_FACTOR;
