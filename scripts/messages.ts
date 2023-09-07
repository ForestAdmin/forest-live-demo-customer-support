import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateMessages(client: Knex, userIds: number[]): Promise<number[]> {
  const tableName = 'messages';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('sender').references('users.id');
    table.integer('receiver').references('users.id');
    table.string('message');
    table.date('date');
  });

  return populate(client, tableName, 1000, () => ({
    sender: faker.helpers.arrayElement(userIds),
    receiver: faker.helpers.arrayElement(userIds),
    message: faker.lorem.sentence(),
    date: faker.date.recent(),
  }));
}
