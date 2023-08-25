import type { SslMode } from '@forestadmin/datasource-sql';
import type { Schema } from './typings';

import 'dotenv/config';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

const agent = createAgent<Schema>({
  authSecret: process.env.FOREST_AUTH_SECRET!,
  envSecret: process.env.FOREST_ENV_SECRET!,

  isProduction: process.env.NODE_ENV === 'production',

  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
});

agent.addDataSource(
  createSqlDataSource({
    uri: process.env.DATABASE_URL,
    schema: process.env.DATABASE_SCHEMA,
    sslMode: process.env.DATABASE_SSL_MODE as SslMode,
  }),
);

agent.mountOnStandaloneServer(Number(process.env.APPLICATION_PORT));

agent.start().catch(error => {
  console.error('\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n');
  console.error('');
  console.error(error.stack);
  process.exit(1);
});
