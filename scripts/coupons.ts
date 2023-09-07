import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateCoupons(client: Knex, userIds: number[]): Promise<number[]> {
  const tableName = 'coupons';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.decimal('discount_amount');
    table.decimal('discount_percent');
    table.string('name');
  });

  const couponNames = [
    'SUMMER15OFF',
    'FLASHSALE25',
    'GET50NOW',
    'SAVEBIG10',
    'FREETRIAL7',
    'SPRING20',
    'HOTDEAL30',
    'BUNDLE50',
    'FIRSTORDER20',
    'WEEKENDSAVER',
    'VIP25PERC',
    'SHOPSMART15',
    'HOLIDAY40',
    'WOW5DOLLARS',
    'BUY2GET1FREE',
    'AUGUST10OFF',
    'FALLFASHION25',
    'GIFTWITHPURCHASE',
  ];

  return populate(client, tableName, couponNames.length, i => ({
    user_id: faker.helpers.arrayElement(userIds),
    discount_amount: i % 2 ? faker.finance.amount(0, 10) : 0,
    discount_percent: !(i % 2) ? faker.finance.amount(0, 25) : 0,
    name: couponNames[i],
  }));
}
