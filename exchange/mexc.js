import ccxt from 'ccxt';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const mexc = new ccxt.mexc();

async function main() {
  const pairs = await mexc.fetchSwapMarkets();

  const x = pairs
    .filter((p) => p.symbol.includes('/USDT') && p.active)
    .map((p) => p.id.split('_')[0])
    .join();

  writeFileSync(join(import.meta.dirname, 'mexc-futures.txt'), x);
}

main();
