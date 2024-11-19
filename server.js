import Fastify from 'fastify';
import db from './database/db.js';
import { readFile } from 'node:fs';
import { join } from 'node:path';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', (_, reply) => {
  const filePath = join('static', 'index.html');
  console.log(filePath);
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.log('error');
      reply.code(500).send('Error loading file');
      return;
    }
    reply.code(200).type('text/html').send(content);
    return;
  });
});

fastify.get('/data', async (_, reply) => {
  const data = db
    .prepare(
      `
      SELECT 
        coin, 
        datetime (created_at, 'unixepoch', 'localtime') as timestamp,
        ROW_NUMBER() OVER (PARTITION BY coin) as count
      FROM volumes
      WHERE
        pings >= 3
        AND net_vol_percent > 2
        AND created_at > strftime ('%s', 'now', '-1 days');
    `,
    )
    .all();

  reply.type('application/json').code(200);
  return data;
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
});
