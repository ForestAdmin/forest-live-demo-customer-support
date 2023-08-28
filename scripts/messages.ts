import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateMessages (client: Pool, userIds: number[]): Promise<number[]> {
  const tableName = 'messages';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      sender INT REFERENCES users(id),
      receiver INT REFERENCES users(id),
      message TEXT,
      date DATE
    );
  `);

  return insertData(client, tableName, 1000, () => ({
    sender: faker.helpers.arrayElement(userIds),
    receiver: faker.helpers.arrayElement(userIds),
    message: faker.lorem.sentence(),
    date: faker.date.recent(),
  }));
}
