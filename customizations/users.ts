import { CollectionCustomizer } from "@forestadmin/agent";
import { Schema } from "../typings";

export default (users: CollectionCustomizer<Schema, 'users'>) => {
  /* Add a fullname field that is computed from firstname and lastname */
  users.addField('fullname', {
    columnType: 'String',
    dependencies: ['firstname', 'lastname'],
    getValues: (records) => {
      return records.map((record) => `${record.firstname} ${record.lastname}`);
    }
  })
  /* Allow fullname to be filtered using the contains operator */
  .replaceFieldOperator('fullname', 'Contains', (value) => ({
    aggregator: 'Or',
    conditions: [{
      field: 'firstname',
      operator: 'Contains',
      value
    }, {
      field: 'lastname',
      operator: 'Contains',
      value
    }]
  }))
  /* Allow to write in fullname */
  .replaceFieldWriting('fullname', (value) => {
    const [firstname, lastname] = value.split(' ');
    return {
      firstname,
      lastname,
    }
  })
  /* Allow to sort on fullname */
  .replaceFieldSorting('fullname', [
    { field: 'firstname', ascending: true },
    { field: 'lastname',  ascending: true },
  ])
  /* Anonymize user allow to replace user's personnal data by fake data */
  .addAction('Anonymize user', {
    scope: 'Bulk',
    execute: async (context, resultBuilder) => {
      try {
        const records = await context.getRecords(['id']);
        const userIds = records.map((record) => record.id);
        await context.collection.update({
          conditionTree: {
            field: 'id',
            operator: 'In',
            value: userIds,
          }
        }, {
          firstname: 'Anonymous',
          lastname: 'Anonymous',
          email: 'anonymous@anonymous.anonymous',
        })
        return resultBuilder.success('User(s) anonymized!');
      } catch(error) {
        return resultBuilder.error(`Failed to anonymize user(s) ${error.message}.`);
      }
    }
  });
};