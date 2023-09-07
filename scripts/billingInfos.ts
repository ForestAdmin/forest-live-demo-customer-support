import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateBillingInfos(
  client: Knex,
  userIds: number[],
): Promise<number[]> {
  const tableName = 'billing_infos';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.string('card_number');
    table.string('card_owner');
    table.string('address');
  });

  return populate(client, tableName, 100, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    card_number: faker.finance.creditCardNumber('visa'),
    card_owner: faker.finance.accountName(),
    address: faker.location.streetAddress(),
  }));
}
