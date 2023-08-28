import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateBillingInfos(client: Pool, userIds: number[]): Promise<number[]> {
  const tableName = 'billing_infos';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
      CREATE TABLE "${tableName}" (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        card_number VARCHAR(20),
        card_owner VARCHAR(255),
        address VARCHAR(255)
    );
  `);

  return insertData(client, tableName, 100, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    card_number: faker.finance.creditCardNumber('visa'),
    card_owner: faker.finance.accountName(),
    address: faker.location.streetAddress(),
  }));
}
