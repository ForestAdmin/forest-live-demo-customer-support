
import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

export default async function populateAddresses(client: PoolClient, userIds: number[]): Promise<number[]> {
    const ids: number[] = [];

    await client.query('DROP TABLE IF EXISTS "addresses" CASCADE');

    await client.query(`
        CREATE TABLE addresses (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          country VARCHAR(255),
          city VARCHAR(255),
          street VARCHAR(255),
          number VARCHAR(20)
      );
    `);

    for (let i = 0; i < 100; i++) {
        const address = {
          user_id: faker.helpers.arrayElement(userIds),
          street: faker.location.streetAddress(),
          number: faker.number.int({ min: 1, max: 100 }),
          city: faker.location.city(),
          country: faker.location.country(),
        };

        const insertQuery = {
            text: 'INSERT INTO "addresses" (user_id, street, number, city, country) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            values: Object.values(address),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}