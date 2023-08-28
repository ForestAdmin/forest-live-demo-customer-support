import { CollectionCustomizer } from "@forestadmin/agent";
import { randomBytes } from 'crypto';

import { Schema } from "../typings";

export default (users: CollectionCustomizer<Schema, 'users'>) => {
  /* Add a fullname field that is computed from firstname and lastname */
  users.addField('fullname', {
    columnType: 'String',
    dependencies: ['firstname', 'lastname'],
    getValues: (records) => {
      return records.map((record) => `${record.firstname} ${record.lastname}`);
    },
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
    }],
  }))
  /* Allow to write in fullname */
  .replaceFieldWriting('fullname', (value) => {
    const [firstname, lastname] = value.split(' ');
    return {
      firstname,
      lastname,
    };
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
        });
        return resultBuilder.success('User(s) anonymized!');
      } catch(error) {
        return resultBuilder.error(`Failed to anonymize user(s) ${error.message}.`);
      }
    },
  })
  .addAction('Change a plan', {
    scope: 'Single',
    form: [{
      label: 'plan',
      collectionName: 'plans',
      type: 'Collection',
    }],
    execute: async (context, resultBuilder) => {
      const [newPlanId] = context.formValues.plan;
      const userId = await context.getRecordId();

      try {
        await context.dataSource.getCollection('subscriptions').update({
          conditionTree: {
            field: 'user_id',
            operator: 'Equal',
            value: userId,
          },
        }, { plan_id: newPlanId });

        return resultBuilder.success('Plan successfully updated.');
      }  catch(error) {
        return resultBuilder.error(`Failed to change plan ${error.message}.`);
      }
    },
  })
  .addAction('Reset password', {
    scope:'Single',
    execute: async (context, resultBuilder) => {
      const userId = await context.getRecordId();

      try {
        await context.dataSource.getCollection('users').update({
          conditionTree: {
            field: 'id',
            operator: 'Equal',
            value: userId,
          },
        }, { password: randomBytes(16).toString('hex') });

        return resultBuilder.success('Password successfully updated, a mail has sended to the user with his new password.');
      }  catch(error) {
        return resultBuilder.error(`Failed to reset password ${error.message}.`);
      }
    },
  })
  .addAction('Moderate', {
    scope:'Single',
    form: [{
      label: 'reason',
      type: 'Enum',
      enumValues: ['resignation', 'dismissal', 'long-term illness', 'other'],
    }, {
      label: 'explanation',
      type: 'String',
      if: (context) => context.formValues.reason === 'other',
    }],
    execute: async (context, resultBuilder) => {
      const userId = await context.getRecordId();

      try {
        await context.dataSource.getCollection('users').update({
          conditionTree: {
            field: 'id',
            operator: 'Equal',
            value: userId,
          },
        }, { is_blocked: true });

        return resultBuilder.success('User successfully blocked.');
      }  catch(error) {
        return resultBuilder.error(`Failed block user ${error.message}.`);
      }
    },
  });
};
