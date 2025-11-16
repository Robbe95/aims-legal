import * as migration_20251116_171839 from './20251116_171839';
import * as migration_20251116_191756 from './20251116_191756';

export const migrations = [
  {
    up: migration_20251116_171839.up,
    down: migration_20251116_171839.down,
    name: '20251116_171839',
  },
  {
    up: migration_20251116_191756.up,
    down: migration_20251116_191756.down,
    name: '20251116_191756'
  },
];
