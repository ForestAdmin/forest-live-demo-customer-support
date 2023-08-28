import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';


export default async function populateSubscriptions (client: Pool, userIds: number[], planIds: number[]): Promise<number[]> {
  const tableName = 'subscriptions'

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      plan_id INT REFERENCES plans(id),
      user_id INT REFERENCES users(id),
      subscription_date DATE
    );
  `);

  return insertData(client, tableName, 80, () => ({
    plan_id: faker.helpers.arrayElement(planIds),
    user_id: faker.helpers.arrayElement(userIds),
    subscription_date: faker.date.recent(),
  }));
}
