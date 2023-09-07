import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
import populate from './utils';

export default async function populateComments(
  client: Knex,
  userIds: number[],
  ticketIds: number[],
): Promise<number[]> {
  const tableName = 'comments';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('ticket_id').references('tickets.id');
    table.integer('comment_from').references('users.id');
    table.string('message');
    table.date('date');
  });

  return populate(client, tableName, 40, () => ({
    ticket_id: faker.helpers.arrayElement(ticketIds),
    comment_from: faker.helpers.arrayElement(userIds),
    message: faker.lorem.sentence(),
    date: faker.date.recent(),
  }));
}
