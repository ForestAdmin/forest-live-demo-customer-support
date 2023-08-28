import { faker } from '@faker-js/faker';
import { Pool, QueryResult } from 'pg';

export default async function populateOrders(client: Pool, userIds: number[], couponsIds: number[]): Promise<number[]> {
  const ids: number[] = [];

  await client.query('DROP TABLE IF EXISTS "orders" CASCADE');

  await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        coupon_id INT REFERENCES coupons(id),
        initial_amount NUMERIC,
        date DATE,
        paid BOOLEAN,
        pay_date DATE
    );
  `);

  for (let i = 0; i < 90; i++) {
      const order = {
        user_id: faker.helpers.arrayElement(userIds),
        coupon_id: faker.helpers.arrayElement(couponsIds),
        initial_amount: faker.finance.amount(),
        date: faker.date.recent(),
        paid: faker.datatype.boolean(),
        pay_date: faker.date.recent(),
      };

      const insertQuery = {
          text: 'INSERT INTO "orders" (user_id, coupon_id, initial_amount, date, paid, pay_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          values: Object.values(order),
      };

      const result: QueryResult<any> = await client.query(insertQuery);
      ids.push(result.rows[0].id.toString());
  }

  return ids;
}