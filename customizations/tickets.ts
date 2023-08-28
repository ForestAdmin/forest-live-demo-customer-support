import { CollectionCustomizer } from "@forestadmin/agent";
import { Schema } from "../typings";

export default (tickets: CollectionCustomizer<Schema, 'tickets'>) => {
  tickets
    .addAction('Mark ticket(s) as resolved', {
      scope: 'Bulk',
      execute: async (context, resultBuilder) => {
        try {
          const records = await context.getRecords(['id', 'subject', 'is_resolved']);

          const unresolvedRecordIds = records.filter((record) => !record.is_resolved).map((record) => record.id);
          const resolvedRecordsSubject = records.filter((record) => record.is_resolved).map((record) => record.subject);

          await context.collection.update({ conditionTree: { field: 'id', operator: 'In', value: unresolvedRecordIds } }, { is_resolved: true });
          return resultBuilder.success('Ticket(s) marked as resolved!', {
            html: resolvedRecordsSubject.map((record) => `<p>Ticket "${record}" is already resolved.</p>`).join(''),
          });
        } catch (error) {
          return resultBuilder.error(`Failed to mark ticket(s) as resolved ${error.message}.`);
        }
      }
    })
    .addAction('Re-open ticket(s)', {
      scope: 'Bulk',
      execute: async (context, resultBuilder) => {
        try {
          const records = await context.getRecords(['id', 'subject', 'is_resolved']);

          const resolvedRecordIds = records.filter((record) => record.is_resolved).map((record) => record.id);
          const notResolvedRecordsSubject = records.filter((record) => !record.is_resolved).map((record) => record.subject);

          await context.collection.update({ conditionTree: { field: 'id', operator: 'In', value: resolvedRecordIds } }, { is_resolved: false });
          return resultBuilder.success('Ticket(s) reopened!', {
            html: notResolvedRecordsSubject.map((record) => `<p>Ticket "${record}" is already not resolved.</p>`).join(''),
          });
        } catch (error) {
          return resultBuilder.error(`Failed to mark ticket(s) as resolved ${error.message}.`);
        }
      }
    });;
};