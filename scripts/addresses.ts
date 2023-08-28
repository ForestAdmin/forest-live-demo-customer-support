import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateAddresses(client: Pool, userIds: number[]): Promise<number[]> {
  const tableName = 'addresses';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      country VARCHAR(255),
      city VARCHAR(255),
      street VARCHAR(255),
      number VARCHAR(20)
    );
  `);

  return insertData(client, tableName, 100, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    street: faker.location.streetAddress(),
    number: faker.number.int({ min: 1, max: 100 }),
    city: faker.location.city(),
    country: faker.location.country(),
  }));
}
