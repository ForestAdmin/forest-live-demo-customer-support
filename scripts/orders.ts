import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateOrders(client: Pool, userIds: number[], couponsIds: number[]): Promise<number[]> {
  const tableName = 'orders';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      coupon_id INT REFERENCES coupons(id),
      initial_amount NUMERIC,
      date DATE,
      paid BOOLEAN,
      pay_date DATE
    );
  `);

  // We don't want to use all the coupons, so we filter them
  const filteredCouponIds = couponsIds.filter((_, index) => (index%2));
  // We also want to allow null values
  filteredCouponIds.push(null);

  return insertData(client, tableName, 90, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    coupon_id: faker.helpers.arrayElement(filteredCouponIds),
    initial_amount: faker.finance.amount(),
    date: faker.date.recent(),
    paid: faker.datatype.boolean(),
    pay_date: faker.date.recent(),
  }));
}
