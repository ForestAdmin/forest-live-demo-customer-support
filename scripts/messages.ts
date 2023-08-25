import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

export default async function populateMessages (client: PoolClient, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "messages" CASCADE');

  await client.query(`
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        sender INT REFERENCES users(id),
        receiver INT REFERENCES users(id),
        message TEXT,
        date DATE
    );
  `);

  for (let i = 0; i < 100; i++) {
      const message = {
        sender: faker.helpers.arrayElement(userIds),
        receiver: faker.helpers.arrayElement(userIds),
        message: faker.lorem.sentence(),
        date: faker.date.recent(),
      };

      const insertQuery = {
          text: 'INSERT INTO "messages" (sender, receiver, message, date) VALUES ($1, $2, $3, $4) RETURNING id',
          values: Object.values(message),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}