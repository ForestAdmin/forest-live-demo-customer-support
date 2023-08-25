import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';


export default async function populateSubscriptions (client: PoolClient, userIds: number[], planIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "subscriptions" CASCADE');

  await client.query(`
      CREATE TABLE subscriptions (
        id SERIAL PRIMARY KEY,
        plan_id INT REFERENCES plans(id),
        user_id INT REFERENCES users(id),
        subscription_date DATE
    );
  `);

  for (let i = 0; i < 80; i++) {
      const subscription = {
        plan_id: faker.helpers.arrayElement(planIds),
        user_id: faker.helpers.arrayElement(userIds),
        subscription_date: faker.date.recent(),
      };

      const insertQuery = {
          text: 'INSERT INTO "subscriptions" (plan_id, user_id, subscription_date) VALUES ($1, $2, $3) RETURNING plan_id, user_id',
          values: Object.values(subscription),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].plan_id.toString());
  }

  return ids;
}