import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

export default async function populateTickets (client: PoolClient, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "tickets" CASCADE');

  await client.query(`
      CREATE TABLE tickets (
        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        opened_by INT REFERENCES users(id),
        date DATE,
        subject VARCHAR(255),
        priority VARCHAR(50),
        is_resolved BOOLEAN
    );
  `);

  for (let i = 0; i < 20; i++) {
      const ticket = {
        owner: faker.helpers.arrayElement(userIds),
        opened_by: faker.helpers.arrayElement(userIds),
        date: faker.date.recent(),
        subject: faker.lorem.sentence(),
        priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
        is_resolved: faker.datatype.boolean(),
      };

      const insertQuery = {
          text: 'INSERT INTO "tickets" (owner, opened_by, date, subject, priority, is_resolved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          values: Object.values(ticket),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}
