import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateOrders(
  client: Knex,
  userIds: number[],
  couponsIds: number[],
): Promise<number[]> {
  const tableName = 'orders';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.integer('coupon_id').references('coupons.id');
    table.decimal('initial_amount');
    table.date('date');
    table.boolean('paid');
    table.date('pay_date');
  });

  // We don't want to use all the coupons, so we filter them
  const filteredCouponIds = couponsIds.filter((_, index) => index % 2);
  // We also want to allow null values
  filteredCouponIds.push(null);

  return populate(client, tableName, 90, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    coupon_id: faker.helpers.arrayElement(filteredCouponIds),
    initial_amount: faker.finance.amount(),
    date: faker.date.recent(),
    paid: faker.datatype.boolean(),
    pay_date: faker.date.recent(),
  }));
}
