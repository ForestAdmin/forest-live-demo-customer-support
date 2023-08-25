import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

export default async function populateCoupons(client: PoolClient, userIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "coupons" CASCADE');

  await client.query(`
      CREATE TABLE coupons (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        discount_amount NUMERIC,
        discount_percent NUMERIC
    );
  `);

  for (let i = 0; i < 15; i++) {
      const coupon = {
        user_id: faker.helpers.arrayElement(userIds),
        discount_amount: faker.finance.amount(),
        discount_percent: faker.finance.amount(),
      };

      const insertQuery = {
          text: 'INSERT INTO "coupons" (user_id, discount_amount, discount_percent) VALUES ($1, $2, $3) RETURNING id',
          values: Object.values(coupon),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}