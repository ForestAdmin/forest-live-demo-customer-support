import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

import insertData from './utils';

export default async function populateUsers(client: Pool): Promise<number[]> {
  const tableName = 'users';

  await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.query(`
    CREATE TABLE "${tableName}" (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      signup_date DATE,
      lastname VARCHAR(255),
      firstname VARCHAR(255),
      identity_picture VARCHAR(255),
      birthdate DATE,
      password VARCHAR(255) NOT NULL,
      cellphone VARCHAR(30),
      is_blocked BOOLEAN
    );`
  );

  return insertData(client, tableName, 150, () => ({
    email: faker.internet.email(),
    signup_date: faker.date.past(),
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    identity_picture: faker.internet.avatar(), 
    birthdate: faker.date.past(), 
    password: faker.internet.password(), 
    cellphone: faker.phone.number(), 
    is_blocked: faker.datatype.boolean(),
  }));
}
