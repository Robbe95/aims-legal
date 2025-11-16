import * as migration_20251116_144031 from './20251116_144031';

export const migrations = [
  {
    up: migration_20251116_144031.up,
    down: migration_20251116_144031.down,
    name: '20251116_144031'
  },
];
