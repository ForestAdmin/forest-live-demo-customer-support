/* id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
card_number VARCHAR(20),
card_owner VARCHAR(255),
address VARCHAR(255)
*/

import { faker } from '@faker-js/faker';
import { Pool, QueryResult } from 'pg';

export default async function populateBillingInfos(client: Pool, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "billing_infos" CASCADE');

  await client.query(`
      CREATE TABLE billing_infos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        card_number VARCHAR(20),
        card_owner VARCHAR(255),
        address VARCHAR(255)
    );
  `);

  for (let i = 0; i < 100; i++) {
      const billingInfo = {
        user_id: faker.helpers.arrayElement(userIds),
        card_number: faker.finance.creditCardNumber('visa'),
        card_owner: faker.finance.accountName(),
        address: faker.location.streetAddress(),
      };

      const insertQuery = {
          text: 'INSERT INTO "billing_infos" (user_id, card_number, card_owner, address) VALUES ($1, $2, $3, $4) RETURNING id',
          values: Object.values(billingInfo),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}