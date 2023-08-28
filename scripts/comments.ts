import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateComments (client: Pool, userIds: number[], ticketIds: number[]): Promise<number[]> {
  const tableName = 'comments';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      ticket_id INT REFERENCES tickets(id),
      comment_from INT REFERENCES users(id),
      message TEXT,
      date DATE
    );
  `);

  return insertData(client, tableName, 40, () => ({
    ticket_id: faker.helpers.arrayElement(ticketIds),
    comment_from: faker.helpers.arrayElement(userIds),
    message: faker.lorem.sentence(),
    date: faker.date.recent(),
  }));
}
