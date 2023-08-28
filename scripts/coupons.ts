import { faker } from '@faker-js/faker';
import { Pool, QueryResult } from 'pg';

export default async function populateCoupons(client: Pool, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "coupons" CASCADE');

  await client.query(`
      CREATE TABLE coupons (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        discount_amount NUMERIC,
        discount_percent NUMERIC,
        name VARCHAR(255)
    );
  `);

  for (let i = 0; i < 15; i++) {
      const coupon = {
        user_id: faker.helpers.arrayElement(userIds),
        discount_amount: (i%2) ? faker.finance.amount(0, 10) : 0,
        discount_percent: !(i%2)? faker.finance.amount(0, 25) : 0,
        name: faker.string.alphanumeric({ length: { min: 5, max: 10}})
      };

      const insertQuery = {
          text: 'INSERT INTO "coupons" (user_id, discount_amount, discount_percent, name) VALUES ($1, $2, $3, $4) RETURNING id',
          values: Object.values(coupon),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}