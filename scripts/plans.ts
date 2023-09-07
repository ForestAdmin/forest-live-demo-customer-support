import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populatePlans(client: Knex): Promise<number[]> {
  const tableName = 'plans';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name');
    table.decimal('monthly_cost');
    table.decimal('allowed_discount');
    table.boolean('dedicated_support');
    table.integer('allowed_number_of_requests');
    table.boolean('has_access_to_premium');
  });

  const planNames = ['pro', 'plus', 'enterprise', 'free'];

  return populate(client, tableName, planNames.length, i => ({
    name: planNames[i],
    monthly_cost: faker.finance.amount(),
    allowed_discount: faker.finance.amount(),
    dedicated_support: faker.datatype.boolean(),
    allowed_number_of_requests: faker.number.int({ min: 1, max: 100 }),
    has_access_to_premium: faker.datatype.boolean(),
  }));
}
