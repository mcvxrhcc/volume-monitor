import 'dotenv/config';
import db from './database/db.js';
import { toRow } from './utils/index.js';

const URL = 'https://agile-cliffs-23967.herokuapp.com/ok';

var push = -1;

async function main() {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return;
  }

  const body = await response.json();
  if (body.resu === null || body.resu.length === 0) {
    return;
  }

  if (body.resu.slice(-1)[0] === push) {
    return;
  }

  push = body.resu.slice(-1)[0];

  console.log(body.resu);

  for (let i = 0; i < body.resu.length - 1; i++) {
    const row = toRow(body.resu[i]);
    const insert = db.prepare(`
    insert into volumes (coin, pings, net_vol_btc, net_vol_percent, recent_total_vol_btc, recent_vol_percent, recent_net_vol, created_at)
    values (@coin, @pings, @netVolBTC, @netVolPercent, @recentTotalVolBTC, @recentVolPercent, @recentNetVol, @t)
  `);
    insert.run(row);
  }
}

setInterval(main, 60 * 1000);
