import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populatePlans(client: Pool): Promise<number[]> {
  const tableName = 'plans';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
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

  return insertData(client, tableName, planNames.length, (i) => ({
    name: planNames[i],
    monthly_cost: faker.finance.amount(),
    allowed_discount: faker.finance.amount(),
    dedicated_support: faker.datatype.boolean(),
    allowed_number_of_requests: faker.number.int( { min: 1, max: 100}),
    has_access_to_premium: faker.datatype.boolean(),
  }));
}
