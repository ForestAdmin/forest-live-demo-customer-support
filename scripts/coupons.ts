import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateCoupons(client: Pool, userIds: number[]): Promise<number[]> {
  const tableName = 'coupons';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
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

  return insertData(client, tableName, couponNames.length, (i) => ({
    user_id: faker.helpers.arrayElement(userIds),
    discount_amount: (i%2) ? faker.finance.amount(0, 10) : 0,
    discount_percent: !(i%2)? faker.finance.amount(0, 25) : 0,
    name: couponNames[i],
  }));
}
