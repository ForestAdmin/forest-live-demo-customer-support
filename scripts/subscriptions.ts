import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateSubscriptions(
  client: Knex,
  userIds: number[],
  planIds: number[],
): Promise<number[]> {
  const tableName = 'subscriptions';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('plan_id').references('plans.id');
    table.integer('user_id').references('users.id');
    table.date('subscription_date');
  });

  const userIdsCopy = [...userIds];

  return populate(client, tableName, 80, () => {
    const index = faker.helpers.rangeToNumber({ min: 0, max: userIdsCopy.length - 1 });

    return {
      plan_id: faker.helpers.arrayElement(planIds),
      user_id: Number(userIdsCopy.splice(index, 1)),
      subscription_date: faker.date.recent(),
    };
  });
}
