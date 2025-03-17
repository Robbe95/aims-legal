import * as migration_20250314_125118 from './20250314_125118';

export const migrations = [
  {
    up: migration_20250314_125118.up,
    down: migration_20250314_125118.down,
    name: '20250314_125118'
  },
];
