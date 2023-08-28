import { Pool, QueryResult } from "pg";

export default async function insertData(client: Pool, tableName: string, numberOfElements: number, elementBuilder: (i: number) => any): Promise<number[]> {
  const elements = [];
  const insertParams = [];

  for (let i = 0; i < numberOfElements; i++) {
    const element = elementBuilder(i);

    elements.push(element);
    const keyLength = Object.keys(element).length;
    const paramsIds = Array.from({length: keyLength}, (_, j) => `$${i*keyLength + (j+1)}`).join(',');
    insertParams.push(`(${paramsIds})`);
  }

  const insertField = Object.keys(elements[0]).join(',');

  const insertQuery = {
      text: `INSERT INTO "${tableName}" (${insertField}) VALUES ${insertParams.join(',')} RETURNING id`,
      values: elements.flatMap(coupon => Object.values(coupon)),
  };

  const result: QueryResult<any> = await client.query(insertQuery);
  return result.rows.map(row => row.id.toString());
};
