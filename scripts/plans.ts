import { faker } from '@faker-js/faker';
import { Pool, QueryResult } from 'pg';

export default async function populatePlans(client: Pool): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "plans" CASCADE');

  await client.query(`
      CREATE TABLE plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        monthly_cost NUMERIC,
        allowed_discount NUMERIC,
        dedicated_support BOOLEAN,
        allowed_number_of_requests INT,
        has_access_to_premium BOOLEAN
    );
  `);

  const planNames = ['pro', 'plus', 'enterprise', 'free'];

  for (let i = 0; i < planNames.length; i++) {
      const plan = {
        name: planNames[i],
        monthly_cost: faker.finance.amount(),
        allowed_discount: faker.finance.amount(),
        dedicated_support: faker.datatype.boolean(),
        allowed_number_of_requests: faker.number.int( { min: 1, max: 100}),
        has_access_to_premium: faker.datatype.boolean(),
      };

      const insertQuery = {
          text: 'INSERT INTO "plans" (name, monthly_cost, allowed_discount, dedicated_support, allowed_number_of_requests, has_access_to_premium) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          values: Object.values(plan),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}