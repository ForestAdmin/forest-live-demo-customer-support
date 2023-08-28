import { CollectionCustomizer } from "@forestadmin/agent";
import { Schema } from "../typings";

export default (coupons: CollectionCustomizer<Schema, 'coupons'>) => {
  coupons
    .addField('used_in_x_orders', {
      columnType: 'String',
      dependencies: ['id'],
      getValues: async (records, context) => { 
        const rows = await context.collection.nativeDriver.rawQuery(
          'SELECT coupon_id, COUNT(*) AS count FROM orders WHERE coupon_id IN (:ids) GROUP BY coupon_id',
          { ids: records.map(r => r.id) },
        );

        return records.map(record => (Number(rows.find(r => r.coupon_id === record.id)?.count) || 0));
      }
    })
    
};