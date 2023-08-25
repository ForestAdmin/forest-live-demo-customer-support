import { faker } from '@faker-js/faker';
import { PoolClient, QueryResult } from 'pg';

export default async function populateUsers(client: PoolClient): Promise<number[]> {
    const ids: number[] = [];


    await client.query('DROP TABLE IF EXISTS "users" CASCADE');

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        signup_date DATE,
        lastname VARCHAR(255),
        firstname VARCHAR(255),
        identity_picture VARCHAR(255),
        birthdate DATE,
        password VARCHAR(255) NOT NULL,
        cellphone VARCHAR(30),
        address VARCHAR(255),
        is_blocked BOOLEAN
      );`
    );

    for (let i = 0; i < 100; i++) {
        const user = {
          email: faker.internet.email(),
          signup_date: faker.date.past(),
          lastname: faker.person.lastName(),
          firstname: faker.person.firstName(),
          identity_picture: faker.internet.avatar(), 
          birthdate: faker.date.past(), 
          password: faker.internet.password(), 
          cellphone: faker.phone.number(), 
          address: faker.location.streetAddress(), 
          is_blocked: faker.datatype.boolean(),
        };

        const insertQuery = {
            text: 'INSERT INTO "users" (email, signup_date, lastname, firstname, identity_picture, birthdate, password, cellphone, address, is_blocked) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
            values: Object.values(user),
        };

        const result: QueryResult<any> = await client.query(insertQuery);
        ids.push(result.rows[0].id.toString());
    }

    return ids;
}