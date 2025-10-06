import * as migration_20251006_090855 from './20251006_090855';

export const migrations = [
  {
    up: migration_20251006_090855.up,
    down: migration_20251006_090855.down,
    name: '20251006_090855'
  },
];
