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

  const couponNames = [
    "SUMMER15OFF",
    "FLASHSALE25",
    "GET50NOW",
    "SAVEBIG10",
    "FREETRIAL7",
    "SPRING20",
    "HOTDEAL30",
    "BUNDLE50",
    "FIRSTORDER20",
    "WEEKENDSAVER",
    "VIP25PERC",
    "SHOPSMART15",
    "HOLIDAY40",
    "WOW5DOLLARS",
    "BUY2GET1FREE",
    "AUGUST10OFF",
    "FALLFASHION25",
    "GIFTWITHPURCHASE",
  ];

  for (let i = 0; i < couponNames.length; i++) {
      const coupon = {
        user_id: faker.helpers.arrayElement(userIds),
        discount_amount: (i%2) ? faker.finance.amount(0, 10) : 0,
        discount_percent: !(i%2)? faker.finance.amount(0, 25) : 0,
        name: couponNames[i],
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