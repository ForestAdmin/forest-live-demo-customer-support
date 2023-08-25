import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';


export default async function populateComments (client: PoolClient, userIds: number[], ticketIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "comments" CASCADE');

  await client.query(`
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        ticket_id INT REFERENCES tickets(id),
        comment_from INT REFERENCES users(id),
        message TEXT,
        date DATE
    );
  `);

  for (let i = 0; i < 40; i++) {
      const comment = {
        ticket_id: faker.helpers.arrayElement(ticketIds),
        comment_from: faker.helpers.arrayElement(userIds),
        message: faker.lorem.sentence(),
        date: faker.date.recent(),
      };

      const insertQuery = {
          text: 'INSERT INTO "comments" (ticket_id, comment_from, message, date) VALUES ($1, $2, $3, $4) RETURNING id',
          values: Object.values(comment),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}
